import { spawn } from 'node:child_process'
import fs from 'node:fs'
import net from 'node:net'
import { fileURLToPath } from 'node:url'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const children = []
let isShuttingDown = false
const DEFAULT_FRONTEND_PORT = 5173
const DEFAULT_BACKEND_PORT = 4000
const FRONTEND_HOST = process.env.FRONTEND_HOST || '0.0.0.0'
const BACKEND_HOST = process.env.HOST || process.env.BACKEND_HOST || '0.0.0.0'
const BACKEND_READY_CHECK_URL = '/api/health'
const BACKEND_READY_LOG_INTERVAL_MS = 5000
const backendPackagePath = fileURLToPath(new URL('../backend/package.json', import.meta.url))
const hasLocalBackend = fs.existsSync(backendPackagePath)

function parsePort(value, fallback) {
  const port = Number.parseInt(String(value || ''), 10)
  return Number.isInteger(port) && port > 0 ? port : fallback
}

function checkPortAvailability(port, host) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.once('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        resolve(false)
        return
      }

      reject(error)
    })

    server.once('listening', () => {
      server.close(() => resolve(true))
    })

    server.listen(port, host)
  })
}

async function findAvailablePort(startPort, host) {
  let port = startPort

  while (port <= 65535 && !(await checkPortAvailability(port, host))) {
    port += 1
  }

  if (port > 65535) {
    throw new Error(`Could not find an open port starting from ${startPort}.`)
  }

  return port
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function waitForBackendReady(port) {
  const backendUrl = `http://127.0.0.1:${port}${BACKEND_READY_CHECK_URL}`
  let lastLogAt = 0

  while (!isShuttingDown) {
    try {
      const response = await fetch(backendUrl, {
        headers: {
          accept: 'application/json',
        },
      })

      if (response.ok) {
        console.log(`[dev] Backend ready at http://127.0.0.1:${port}. Starting frontend.`)
        return
      }
    } catch {
      // The backend is still booting, so we keep polling quietly.
    }

    const now = Date.now()

    if (!lastLogAt || now - lastLogAt >= BACKEND_READY_LOG_INTERVAL_MS) {
      console.log(`[dev] Waiting for backend on http://127.0.0.1:${port}${BACKEND_READY_CHECK_URL}...`)
      lastLogAt = now
    }

    await delay(250)
  }
}

function stopChildren(exitingChild = null) {
  for (const child of children) {
    if (!child.pid || child === exitingChild || child.killed) {
      continue
    }

    child.kill('SIGTERM')
  }
}

function runProcess(label, args, envOverrides = {}) {
  const child = spawn(npmCommand, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      ...envOverrides,
    },
  })

  children.push(child)

  child.on('error', (error) => {
    if (isShuttingDown) {
      return
    }

    isShuttingDown = true
    console.error(`[${label}] ${error.message}`)
    stopChildren(child)
    process.exit(1)
  })

  child.on('exit', (code, signal) => {
    if (isShuttingDown) {
      return
    }

    isShuttingDown = true
    stopChildren(child)

    if (signal) {
      process.exit(1)
      return
    }

    process.exit(code ?? 0)
  })

  return child
}

function shutdown() {
  if (isShuttingDown) {
    return
  }

  isShuttingDown = true
  stopChildren()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

const preferredFrontendPort = parsePort(process.env.FRONTEND_PORT, DEFAULT_FRONTEND_PORT)
const preferredBackendPort = parsePort(process.env.BACKEND_PORT || process.env.PORT, DEFAULT_BACKEND_PORT)

const frontendPort = await findAvailablePort(preferredFrontendPort, FRONTEND_HOST)
const backendPort = hasLocalBackend
  ? await findAvailablePort(preferredBackendPort, BACKEND_HOST)
  : preferredBackendPort

if (frontendPort !== preferredFrontendPort) {
  console.log(`[dev] Frontend port ${preferredFrontendPort} is busy, using ${frontendPort}.`)
}

if (hasLocalBackend && backendPort !== preferredBackendPort) {
  console.log(`[dev] Backend port ${preferredBackendPort} is busy, using ${backendPort}.`)
}

const frontendOrigin = `http://localhost:${frontendPort}`

if (hasLocalBackend) {
  runProcess('backend', ['run', 'dev:server'], {
    PORT: String(backendPort),
    CLIENT_ORIGIN: frontendOrigin,
  })

  await waitForBackendReady(backendPort)
} else {
  console.log('[dev] No local backend repo found at ./backend. Starting the frontend only.')

  if (!process.env.VITE_API_BASE_URL) {
    console.log(
      '[dev] Set VITE_API_BASE_URL to a running backend or clone the backend repo into ./backend to enable API features.',
    )
  }
}

runProcess(
  'frontend',
  ['run', 'dev:client', '--', '--port', String(frontendPort)],
  hasLocalBackend
    ? {
        VITE_BACKEND_PORT: String(backendPort),
      }
    : {},
)

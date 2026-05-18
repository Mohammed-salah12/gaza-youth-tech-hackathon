import fs from 'node:fs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const allowedCommands = new Set(['dev', 'start'])
const command = process.argv[2]
const backendPackagePath = fileURLToPath(new URL('../backend/package.json', import.meta.url))

if (!allowedCommands.has(command)) {
  console.error('[backend] Expected one of: dev, start.')
  process.exit(1)
}

if (!fs.existsSync(backendPackagePath)) {
  console.error('[backend] No local backend repo found at ./backend.')
  console.error(
    '[backend] Clone the backend repo into ./backend or run the frontend with VITE_API_BASE_URL set.',
  )
  process.exit(1)
}

const child = spawn(npmCommand, ['--prefix', 'backend', 'run', command], {
  stdio: 'inherit',
  env: process.env,
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})

child.on('error', (error) => {
  console.error(`[backend] ${error.message}`)
  process.exit(1)
})

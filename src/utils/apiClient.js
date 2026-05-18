const viteEnv = import.meta.env || {}
const backendPort = String(viteEnv.VITE_BACKEND_PORT || '4000').trim() || '4000'

function resolveDirectDevApiBaseUrl() {
  if (typeof window === 'undefined') {
    return ''
  }

  const { hostname, protocol } = window.location
  return `${protocol}//${hostname}:${backendPort}/api`
}

const apiBaseUrl = String(viteEnv.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
const directDevApiBaseUrl = viteEnv.DEV ? resolveDirectDevApiBaseUrl().replace(/\/$/, '') : ''

async function readJsonResponse(response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

async function request(path, options = {}) {
  const normalizedPath = String(path || '')
  const requestTargets = [apiBaseUrl]

  if (
    directDevApiBaseUrl &&
    directDevApiBaseUrl !== apiBaseUrl &&
    !requestTargets.includes(directDevApiBaseUrl)
  ) {
    requestTargets.push(directDevApiBaseUrl)
  }

  let lastNetworkError = null

  for (const baseUrl of requestTargets) {
    let response

    try {
      response = await fetch(`${baseUrl}${normalizedPath}`, options)
    } catch (error) {
      lastNetworkError = error
      continue
    }

    const payload = await readJsonResponse(response)

    if (!response.ok) {
      const message =
        payload && typeof payload === 'object' && 'message' in payload
          ? payload.message
          : 'Request failed.'

      throw new Error(message)
    }

    return payload
  }

  throw new Error(
    lastNetworkError
      ? `Could not reach the local backend. Restart \`npm run dev\` and make sure the backend is running on port ${backendPort}.`
      : 'Request failed.',
  )
}

export function fetchSubmissions() {
  return request('/submissions')
}

export function fetchAcceptedProjects() {
  return request('/submissions/accepted-projects')
}

export function submitApplication(payload) {
  const isFormData = payload instanceof FormData

  return request('/submissions', {
    method: 'POST',
    ...(isFormData
      ? { body: payload }
      : {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
  })
}

export function fetchSubmissionByProjectId(projectId) {
  return request(`/submissions/project/${encodeURIComponent(projectId)}`)
}

export function updateSubmissionReviewStage(id, reviewStage) {
  return request(`/submissions/${id}/review-stage`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reviewStage }),
  })
}

export function updateSubmissionNotes(id, organizerNotes) {
  return request(`/submissions/${id}/notes`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ organizerNotes }),
  })
}

export function deleteSubmission(id) {
  return request(`/submissions/${id}`, {
    method: 'DELETE',
  })
}

export function fetchAroundRoomMedia(includeAll = false) {
  const query = includeAll ? '?includeAll=true' : ''
  return request(`/around-room-media${query}`)
}

export function createAroundRoomMedia(formData) {
  return request('/around-room-media', {
    method: 'POST',
    body: formData,
  })
}

export function updateAroundRoomMedia(id, formData) {
  return request(`/around-room-media/${id}`, {
    method: 'PUT',
    body: formData,
  })
}

export function deleteAroundRoomMedia(id) {
  return request(`/around-room-media/${id}`, {
    method: 'DELETE',
  })
}

export function fetchAdmins() {
  return request('/admins')
}

export function createAdmin(payload) {
  return request('/admins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export function updateAdmin(id, payload) {
  return request(`/admins/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export function deleteAdmin(id) {
  return request(`/admins/${id}`, {
    method: 'DELETE',
  })
}

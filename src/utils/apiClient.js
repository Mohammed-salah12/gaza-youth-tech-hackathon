const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

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
  const response = await fetch(`${apiBaseUrl}${path}`, options)
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

export function fetchSubmissions() {
  return request('/submissions')
}

export function submitApplication(payload) {
  return request('/submissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
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

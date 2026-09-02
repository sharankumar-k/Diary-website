const apiUrl = import.meta.env.VITE_API_URL

export default async function apiFetch(path, { method = 'GET', body = null } = {}) {
  const config = {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${apiUrl}${path}`, config)

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong.')
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

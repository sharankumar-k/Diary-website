import apiFetch from './client'

export async function register(name, email, password) {
  return apiFetch('/api/auth/register', {
    method: 'POST',
    body: { name, email, password },
  })
}

export async function login(email, password) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

export async function logout() {
  return apiFetch('/api/auth/logout', { method: 'POST' })
}

export async function getMe() {
  return apiFetch('/api/auth/me')
}

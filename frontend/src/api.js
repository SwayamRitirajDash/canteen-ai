import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Send a chat message to the backend.
 * @param {string} sessionId
 * @param {string} message
 * @param {Array}  history - [{ role, content }]
 */
export async function sendMessage(sessionId, message, history = []) {
  const response = await api.post('/api/chat', {
    session_id: sessionId,
    message,
    history,
  })
  return response.data
}

/**
 * Fetch full menu from backend.
 */
export async function fetchMenu(filters = {}) {
  const params = new URLSearchParams()
  if (filters.category)    params.append('category', filters.category)
  if (filters.dietary)     params.append('dietary', filters.dietary)
  if (filters.max_price)   params.append('max_price', filters.max_price)
  const response = await api.get(`/api/menu?${params}`)
  return response.data
}

/**
 * Fetch available menu categories.
 */
export async function fetchCategories() {
  const response = await api.get('/api/menu/categories')
  return response.data.categories
}

export default api

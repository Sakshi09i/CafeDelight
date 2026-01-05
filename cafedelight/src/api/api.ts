const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ======================
// POST REQUEST
// ======================
export async function apiPost(url: string, data?: any) {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    })

    const text = await res.text()
    const json = text ? JSON.parse(text) : {}

    if (!res.ok) {
      throw new Error(json.message || 'Request failed')
    }

    return json
  } catch (err: any) {
    throw new Error(err.message || 'Network error')
  }
}

// ======================
// GET REQUEST
// ======================
export async function apiGet(url: string) {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(`${API_BASE}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })

    const text = await res.text()
    const json = text ? JSON.parse(text) : {}

    if (!res.ok) {
      throw new Error(json.message || 'Request failed')
    }

    return json
  } catch (err: any) {
    throw new Error(err.message || 'Network error')
  }
}

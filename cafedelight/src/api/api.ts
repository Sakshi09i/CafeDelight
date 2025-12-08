const API_BASE = 'http://localhost:5000'

export async function apiPost(url: string, data: any) {
  try {
    const res = await fetch(API_BASE + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
      throw new Error(result.message || 'Server Error')
    }

    return result
  } catch (err: any) {
    console.error('API Error:', err)
    throw new Error(err.message || 'Failed to fetch')
  }
}

import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { apiPost } from '../api/api'

export function ResetPasswordPage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!password) {
      setError('Password is required')
      return
    }

    try {
      setLoading(true)
      await apiPost(`/api/auth/reset-password/${token}`, { password })
      alert('Password reset successful')
      navigate('/login')
    } catch (err: any) {
      setError(err.message || 'Reset failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto py-10 max-w-md'>
      <h2 className='text-2xl font-semibold mb-4'>Reset Password</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='password'
          placeholder='New password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input-field'
        />

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <button type='submit' disabled={loading} className='btn-primary w-full'>
          {loading ? 'Resetting…' : 'Reset Password'}
        </button>
      </form>
    </div>
  )
}

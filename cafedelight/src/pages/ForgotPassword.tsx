import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { apiPost } from '../api/api'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const res = await apiPost('/api/auth/forgot-password', { email })
      setMessage(res.message || 'If an account exists, we have emailed you.')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-coffee-50'>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'
      >
        <h1 className='text-3xl font-bold text-coffee-900 mb-6'>
          Forgot Password
        </h1>

        <p className='text-sm text-coffee-600 mb-4'>
          Enter your registered email address. We’ll send you a link to reset
          your password.
        </p>

        <input
          type='email'
          placeholder='Email'
          className='input-field mb-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type='submit'
          className='w-full bg-rosevale text-white py-3 rounded-xl mt-2'
        >
          {loading ? 'Sending link…' : 'Send Reset Link'}
        </button>

        {error && (
          <p className='mt-3 text-center text-red-500 text-sm'>{error}</p>
        )}
        {message && (
          <p className='mt-3 text-center text-emerald-600 text-sm'>{message}</p>
        )}

        <p className='text-sm text-center mt-4'>
          Remembered your password?{' '}
          <Link to='/login' className='text-rosevale font-semibold'>
            Back to Login
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

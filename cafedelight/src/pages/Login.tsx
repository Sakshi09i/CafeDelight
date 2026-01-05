import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { apiPost } from '../api/api'
import { useAuth } from '../stores/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuth((s) => s.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await apiPost('/api/auth/login', {
        email,
        password,
        role, // ✅ IMPORTANT
      })

      if (!res?.token || !res?.user) {
        throw new Error('Invalid login response')
      }

      login(res.user, res.token)

      // ✅ TEMP redirect (admin dashboard later)
      if (res.user.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate('/home', { replace: true })
      }
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-coffee-50'>
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'
      >
        <h1 className='text-3xl font-bold text-center mb-6'>Login</h1>

        {/* ROLE SELECTION */}
        <div className='flex gap-4 mb-4'>
          <button
            type='button'
            onClick={() => setRole('USER')}
            className={`flex-1 py-2 rounded-lg border ${
              role === 'USER'
                ? 'bg-rosevale text-white'
                : 'bg-white text-coffee-700'
            }`}
          >
            Customer
          </button>

          <button
            type='button'
            onClick={() => setRole('ADMIN')}
            className={`flex-1 py-2 rounded-lg border ${
              role === 'ADMIN'
                ? 'bg-rosevale text-white'
                : 'bg-white text-coffee-700'
            }`}
          >
            Café Manager
          </button>
        </div>

        <input
          type='email'
          placeholder='Email'
          className='input-field mb-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type='password'
          placeholder='Password'
          className='input-field mb-4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-rosevale text-white py-3 rounded-xl disabled:opacity-60'
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>

        {error && (
          <p className='text-red-500 text-sm mt-3 text-center'>{error}</p>
        )}

        <div className='text-sm text-center mt-4 space-y-2'>
          <Link to='/forgot-password' className='text-coffee-600 block'>
            Forgot Password?
          </Link>

          <p>
            Don’t have an account?{' '}
            <Link to='/register' className='text-rosevale font-semibold'>
              Register
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  )
}

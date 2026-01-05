import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { apiPost } from '../api/api'
import { useAuth } from '../stores/auth'

export function RegisterPage() {
  const navigate = useNavigate()
  const login = useAuth((s) => s.login)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('All fields are required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await apiPost('/api/auth/register', {
        name,
        email,
        password,
        role,
      })

      if (!res?.token || !res?.user) {
        throw new Error('Invalid registration response')
      }

      login(res.user, res.token)
      if (res.user.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate('/home', { replace: true })
      }
    } catch (err: any) {
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-coffee-50'>
      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'
      >
        <h1 className='text-3xl font-bold mb-6 text-center'>Create Account</h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Full Name'
          className='input-field mb-4'
        />

        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='input-field mb-4'
        />

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='input-field mb-4'
        />

        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          className='input-field mb-4'
        />

        {/* <label className='block text-sm font-medium text-coffee-700 mb-1'>
          Register as
        </label> */}
        {/* ROLE SELECT */}
        <select
          aria-label='Select account type'
          value={role}
          onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN')}
          className='input-field mb-4'
        >
          <option value='USER'>Customer</option>
          <option value='ADMIN'>Cafe Manager (Admin)</option>
        </select>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-rosevale text-white py-3 rounded-xl'
        >
          {loading ? 'Creating…' : 'Register'}
        </button>

        {error && <p className='text-red-500 text-sm mt-3'>{error}</p>}

        <p className='text-sm text-center mt-4'>
          Already registered?{' '}
          <Link to='/login' className='text-rosevale font-semibold'>
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

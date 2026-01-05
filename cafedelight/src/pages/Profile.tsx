import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../stores/auth'

export function ProfilePage() {
  const user = useAuth((s) => s.user)
  const logout = useAuth((s) => s.logout)
  const navigate = useNavigate()

  const [phone, setPhone] = useState(user?.phone || '')
  const [phoneMsg, setPhoneMsg] = useState('')
  const [phoneError, setPhoneError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  const savePhone = async () => {
    setPhoneError('')
    setPhoneMsg('')

    if (!phone.trim()) {
      setPhoneError('Phone number is required')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/update-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ phone }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to update phone')

      setPhoneMsg('✅ Phone number saved successfully')
    } catch (err: any) {
      setPhoneError(err.message || 'Failed to save phone')
    }
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className='min-h-screen bg-coffee-50 flex justify-center py-12'>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'
      >
        {/* Avatar */}
        <div className='flex justify-center'>
          <div className='h-28 w-28 rounded-full bg-rosevale text-white flex items-center justify-center text-3xl font-bold'>
            {initials}
          </div>
        </div>

        <h2 className='mt-4 text-center text-2xl font-semibold'>{user.name}</h2>
        <p className='text-center text-coffee-600'>{user.email}</p>

        {/* Phone Section */}
        <div className='mt-6 bg-white border rounded-xl p-4 space-y-3'>
          <h3 className='font-semibold'>Phone Number</h3>

          <input
            type='tel'
            placeholder='Enter phone number'
            className='input-field'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={savePhone} className='btn-primary w-full'>
            Save Phone
          </button>

          {phoneMsg && <p className='text-green-600 text-sm'>{phoneMsg}</p>}
          {phoneError && <p className='text-red-500 text-sm'>{phoneError}</p>}
        </div>

        <button
          onClick={() => {
            logout()
            navigate('/login')
          }}
          className='w-full mt-6 bg-red-500 text-white py-2 rounded-xl'
        >
          Logout
        </button>
      </motion.div>
    </div>
  )
}

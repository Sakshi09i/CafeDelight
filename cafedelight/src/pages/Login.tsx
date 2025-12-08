// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Link, useNavigate } from 'react-router-dom'
// import { useUser } from '../stores/user'

// type FormState = {
//   username: string
//   email: string
//   password: string
// }

// type FormErrors = Partial<Record<keyof FormState | 'general', string>>

// export function LoginPage() {
//   const [form, setForm] = useState<FormState>({
//     username: '',
//     email: '',
//     password: '',
//   })
//   const [errors, setErrors] = useState<FormErrors>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const navigate = useNavigate()
//   const setName = useUser((s) => s.setName)

//   const validate = () => {
//     const nextErrors: FormErrors = {}
//     if (!form.username.trim()) {
//       nextErrors.username = 'Username is required.'
//     }
//     if (!form.email.trim()) {
//       nextErrors.email = 'Email is required.'
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
//       nextErrors.email = 'Enter a valid email address.'
//     }
//     if (!form.password.trim()) {
//       nextErrors.password = 'Password is required.'
//     } else if (form.password.trim().length < 6) {
//       nextErrors.password = 'Password must be at least 6 characters.'
//     }
//     return nextErrors
//   }

//   const handleChange =
//     (field: keyof FormState) =>
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setForm((prev) => ({ ...prev, [field]: event.target.value }))
//       setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }))
//     }

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     const nextErrors = validate()
//     if (Object.keys(nextErrors).length) {
//       setErrors(nextErrors)
//       return
//     }
//     setIsSubmitting(true)

//     setTimeout(() => {
//       setName(form.username.trim())
//       setIsSubmitting(false)
//       navigate('/home')
//     }, 600)
//   }

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-coffee-50 via-white to-coffee-100 py-10'>
//       <div className='container-px mx-auto grid max-w-5xl items-center gap-8 rounded-[32px] bg-white/90 p-6 shadow-2xl shadow-coffee-200/60 md:grid-cols-[1.05fr_0.95fr] md:p-12'>
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className='space-y-6'
//         >
//           <p className='inline-flex items-center gap-2 rounded-full bg-rosevale/10 px-4 py-1 text-sm font-medium text-rosevale'>
//             Members lounge • Private access
//           </p>
//           <h1 className='text-4xl font-display leading-tight text-coffee-900'>
//             Log in to view your dashboard, loyalty perks & curated menu.
//           </h1>
//           <p className='text-coffee-700'>
//             Welcome back! Sign in with your Café Delight credentials and keep
//             your orders, favorites, and reward beans in sync across devices.
//           </p>
//           <div className='flex flex-wrap gap-4 text-sm text-coffee-600'>
//             <div className='rounded-2xl border border-coffee-100 bg-coffee-50/60 px-4 py-3'>
//               <p className='text-lg font-semibold text-coffee-900'>
//                 Realtime updates
//               </p>
//               <p>Track brewing status instantly.</p>
//             </div>
//             <div className='rounded-2xl border border-coffee-100 bg-coffee-50/60 px-4 py-3'>
//               <p className='text-lg font-semibold text-coffee-900'>
//                 Secure access
//               </p>
//               <p>Protected by encrypted sessions.</p>
//             </div>
//           </div>
//         </motion.div>

//         <motion.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1, duration: 0.5 }}
//           className='glass-panel rounded-3xl border border-white/70 p-8 shadow-xl'
//         >
//           <div className='mb-6'>
//             <h2 className='text-2xl font-semibold text-coffee-900'>
//               Account login
//             </h2>
//             <p className='text-sm text-coffee-600'>
//               Use your registered username and password.
//             </p>
//           </div>

//           <label className='block text-sm font-medium text-coffee-700'>
//             Username
//             <input
//               type='text'
//               value={form.username}
//               onChange={handleChange('username')}
//               placeholder='e.g. aarav.shah'
//               className={`input-field mt-2 ${
//                 errors.username
//                   ? 'ring-rosevale/40 ring-2 border-rosevale/60'
//                   : ''
//               }`}
//               autoComplete='username'
//             />
//             {errors.username && (
//               <p className='mt-1 text-sm text-rosevale'>{errors.username}</p>
//             )}
//           </label>

//           <label className='mt-5 block text-sm font-medium text-coffee-700'>
//             Email
//             <input
//               type='email'
//               value={form.email}
//               onChange={handleChange('email')}
//               placeholder='you@example.com'
//               className={`input-field mt-2 ${
//                 errors.email ? 'ring-rosevale/40 ring-2 border-rosevale/60' : ''
//               }`}
//               autoComplete='email'
//             />
//             {errors.email && (
//               <p className='mt-1 text-sm text-rosevale'>{errors.email}</p>
//             )}
//           </label>

//           <label className='mt-5 block text-sm font-medium text-coffee-700'>
//             Password
//             <input
//               type='password'
//               value={form.password}
//               onChange={handleChange('password')}
//               placeholder='Minimum 6 characters'
//               className={`input-field mt-2 ${
//                 errors.password
//                   ? 'ring-rosevale/40 ring-2 border-rosevale/60'
//                   : ''
//               }`}
//               autoComplete='current-password'
//             />
//             {errors.password && (
//               <p className='mt-1 text-sm text-rosevale'>{errors.password}</p>
//             )}
//           </label>

//           <div className='mt-6 flex items-center justify-between text-sm text-coffee-600'>
//             <label className='inline-flex items-center gap-2'>
//               <input
//                 type='checkbox'
//                 className='h-4 w-4 rounded border-coffee-200 text-rosevale focus:ring-rosevale/60'
//               />{' '}
//               Remember me
//             </label>
//             <button
//               type='button'
//               className='font-semibold text-rosevale hover:underline'
//             >
//               Forgot password?
//             </button>
//           </div>

//           {errors.general && (
//             <p className='mt-4 text-sm text-rosevale'>{errors.general}</p>
//           )}

//           <button
//             type='submit'
//             disabled={isSubmitting}
//             className='mt-6 w-full rounded-xl bg-rosevale px-5 py-3 text-lg font-semibold text-white transition enabled:hover:bg-mango disabled:opacity-70'
//           >
//             {isSubmitting ? 'Signing you in…' : 'Login'}
//           </button>

//           <div className='mt-4 text-center text-sm text-coffee-600'>
//             New guest?{' '}
//             <Link
//               to='/register'
//               className='font-semibold text-rosevale hover:underline'
//             >
//               Create an account
//             </Link>
//           </div>
//         </motion.form>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { apiPost } from '../api/api'
import { useUser } from '../stores/user'

export function LoginPage() {
  const navigate = useNavigate()
  const setUser = useUser((s) => s.setUser)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await apiPost('/api/auth/login', { email, password })

      if (!res.token || !res.user) {
        throw new Error('Invalid API response')
      }

      // Save token
      localStorage.setItem('token', res.token)

      // Save user details in Zustand
      setUser({
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
      })

      navigate('/home')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }

    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-coffee-50'>
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'
      >
        <h1 className='text-3xl font-bold text-coffee-900 mb-6'>Login</h1>

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
          className='w-full bg-rosevale text-white py-3 rounded-xl mt-2'
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>

        {error && <p className='mt-3 text-center text-red-500'>{error}</p>}

        <p className='text-sm text-center mt-4'>
          Don’t have an account?{' '}
          <Link to='/register' className='text-rosevale font-semibold'>
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

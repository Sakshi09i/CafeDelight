// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useUser } from '../stores/user'

// export function RegisterPage() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//   })

//   const [message, setMessage] = useState('')
//   const [loading, setLoading] = useState(false)

//   const navigate = useNavigate()
//   const setName = useUser((s) => s.setName)

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//     setMessage('')
//   }

//   // Password must be 6+ chars and include at least one special char
//   const validatePassword = (pwd: string) => {
//     const special = /[!@#$%^&*()\-_=+{}\[\]:;"'<>,.?/]/
//     if (pwd.length < 6) return 'Password must be at least 6 characters.'
//     if (!special.test(pwd)) return 'Password must include a special character.'
//     return null
//   }

//   const handleSubmit = async (e: any) => {
//     e.preventDefault()
//     setLoading(true)
//     setMessage('')

//     // FRONTEND VALIDATION
//     const pwdError = validatePassword(form.password)
//     if (pwdError) {
//       setMessage(pwdError)
//       setLoading(false)
//       return
//     }

//     try {
//       const res = await axios.post(
//         'http://localhost:4000/api/user/register',
//         form
//       )

//       // Save name globally so home page can use it
//       setName(form.name)

//       setMessage('Registration successful! Redirecting…')

//       setTimeout(() => navigate('/home'), 1000)
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Something went wrong')
//     }

//     setLoading(false)
//   }

//   return (
//     <div className='min-h-screen bg-coffee-50 flex items-center justify-center'>
//       <motion.form
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         onSubmit={handleSubmit}
//         className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'
//       >
//         <h2 className='text-2xl font-bold text-coffee-900'>
//           Create New Account
//         </h2>
//         <p className='text-sm text-coffee-600 mb-4'>Register as a new guest</p>

//         <input
//           type='text'
//           name='name'
//           placeholder='Enter your name'
//           className='input-field mb-4'
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type='email'
//           name='email'
//           placeholder='Enter your email'
//           className='input-field mb-4'
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type='text'
//           name='phone'
//           placeholder='Phone number'
//           className='input-field mb-4'
//           value={form.phone}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type='password'
//           name='password'
//           placeholder='Password (min 6 chars, 1 special character)'
//           className='input-field mb-4'
//           value={form.password}
//           onChange={handleChange}
//           required
//         />

//         <button
//           type='submit'
//           disabled={loading}
//           className='w-full bg-rosevale text-white py-3 rounded-xl mt-2'
//         >
//           {loading ? 'Registering…' : 'Register'}
//         </button>

//         {message && <p className='mt-3 text-center text-rosevale'>{message}</p>}
//       </motion.form>
//     </div>
//   )
// }

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Link, useNavigate } from 'react-router-dom'
// import { useUser } from '../stores/user'

// type FormState = {
//   username: string
//   email: string
//   password: string
//   confirm: string
// }

// type FormErrors = Partial<Record<keyof FormState | 'general', string>>

// export function RegisterPage() {
//   const [form, setForm] = useState<FormState>({
//     username: '',
//     email: '',
//     password: '',
//     confirm: '',
//   })

//   const [errors, setErrors] = useState<FormErrors>({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const setName = useUser((s) => s.setName)
//   const navigate = useNavigate()

//   const validate = () => {
//     const nextErrors: FormErrors = {}

//     if (!form.username.trim()) nextErrors.username = 'Username is required.'

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

//     if (form.confirm.trim() !== form.password.trim()) {
//       nextErrors.confirm = 'Passwords do not match.'
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

//     // Simulated server register
//     setTimeout(() => {
//       setName(form.username.trim())
//       setIsSubmitting(false)
//       navigate('/home')
//     }, 700)
//   }

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-coffee-50 via-white to-coffee-100 py-10'>
//       <div className='container-px mx-auto grid max-w-5xl items-center gap-8 rounded-[32px] bg-white/90 p-6 shadow-2xl shadow-coffee-200/60 md:grid-cols-[1.05fr_0.95fr] md:p-12'>
//         {/* Left side panel */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           className='space-y-6'
//         >
//           <p className='inline-flex items-center gap-2 rounded-full bg-rosevale/10 px-4 py-1 text-sm font-medium text-rosevale'>
//             Create your account • Welcome!
//           </p>

//           <h1 className='text-4xl font-display leading-tight text-coffee-900'>
//             Join Café Delight and unlock personalized menus, rewards & more.
//           </h1>

//           <p className='text-coffee-700'>
//             Sign up to sync your orders, track your favorites, and access
//             exclusive member perks.
//           </p>

//           <div className='flex flex-wrap gap-4 text-sm text-coffee-600'>
//             <div className='rounded-2xl border border-coffee-100 bg-coffee-50/60 px-4 py-3'>
//               <p className='text-lg font-semibold text-coffee-900'>
//                 Membership rewards
//               </p>
//               <p>Earn points on every cup you enjoy.</p>
//             </div>
//             <div className='rounded-2xl border border-coffee-100 bg-coffee-50/60 px-4 py-3'>
//               <p className='text-lg font-semibold text-coffee-900'>
//                 Custom recommendations
//               </p>
//               <p>Your taste inspires our brews.</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* Registration Form */}
//         <motion.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1, duration: 0.5 }}
//           className='glass-panel rounded-3xl border border-white/70 p-8 shadow-xl'
//         >
//           <div className='mb-6'>
//             <h2 className='text-2xl font-semibold text-coffee-900'>
//               Create an account
//             </h2>
//             <p className='text-sm text-coffee-600'>
//               Fill in the details to get started.
//             </p>
//           </div>

//           {/* Username */}
//           <label className='block text-sm font-medium text-coffee-700'>
//             Username
//             <input
//               type='text'
//               value={form.username}
//               onChange={handleChange('username')}
//               placeholder='e.g. arjun.mehta'
//               className={`input-field mt-2 ${
//                 errors.username
//                   ? 'ring-rosevale/40 ring-2 border-rosevale/60'
//                   : ''
//               }`}
//             />
//             {errors.username && (
//               <p className='mt-1 text-sm text-rosevale'>{errors.username}</p>
//             )}
//           </label>

//           {/* Email */}
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
//             />
//             {errors.email && (
//               <p className='mt-1 text-sm text-rosevale'>{errors.email}</p>
//             )}
//           </label>

//           {/* Password */}
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
//             />
//             {errors.password && (
//               <p className='mt-1 text-sm text-rosevale'>{errors.password}</p>
//             )}
//           </label>

//           {/* Confirm Password */}
//           <label className='mt-5 block text-sm font-medium text-coffee-700'>
//             Confirm Password
//             <input
//               type='password'
//               value={form.confirm}
//               onChange={handleChange('confirm')}
//               placeholder='Re-enter password'
//               className={`input-field mt-2 ${
//                 errors.confirm
//                   ? 'ring-rosevale/40 ring-2 border-rosevale/60'
//                   : ''
//               }`}
//             />
//             {errors.confirm && (
//               <p className='mt-1 text-sm text-rosevale'>{errors.confirm}</p>
//             )}
//           </label>

//           {/* Submit */}
//           <button
//             type='submit'
//             disabled={isSubmitting}
//             className='mt-7 w-full rounded-xl bg-rosevale px-5 py-3 text-lg font-semibold text-white transition enabled:hover:bg-mango disabled:opacity-70'
//           >
//             {isSubmitting ? 'Creating account…' : 'Register'}
//           </button>

//           <div className='mt-4 text-center text-sm text-coffee-600'>
//             Already have an account?{' '}
//             <Link
//               to='/login'
//               className='font-semibold text-rosevale hover:underline'
//             >
//               Login instead
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

export function RegisterPage() {
  const navigate = useNavigate()
  const setUser = useUser((s) => s.setUser)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // ✅ BASIC VALIDATION FRONTEND
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const res = await apiPost('/api/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
      })

      // ✅ SAFE RESPONSE HANDLING
      if (!res || !res.token || !res.user) {
        throw new Error(res?.message || 'Registration failed')
      }

      // ✅ STORE TOKEN
      localStorage.setItem('token', res.token)

      // ✅ STORE USER IN ZUSTAND
      setUser({
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
      })

      navigate('/home')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
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
        <h1 className='text-3xl font-bold text-coffee-900 mb-6'>
          Create Account
        </h1>

        <input
          type='text'
          placeholder='Full Name'
          className='input-field mb-4'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          placeholder='Password (min 6 characters)'
          className='input-field mb-4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type='submit'
          disabled={loading}
          className={`w-full py-3 rounded-xl mt-2 text-white transition ${
            loading ? 'bg-gray-400' : 'bg-rosevale hover:bg-mango'
          }`}
        >
          {loading ? 'Creating…' : 'Register'}
        </button>

        {error && <p className='mt-3 text-center text-red-500'>{error}</p>}

        <p className='text-sm text-center mt-4'>
          Already have an account?{' '}
          <Link to='/login' className='text-rosevale font-semibold'>
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

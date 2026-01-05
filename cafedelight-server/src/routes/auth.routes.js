import express from 'express'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendResetEmail } from '../utils/sendEmail.js'

const router = express.Router()

// ======================
// REGISTER (USER ONLY)
// ======================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' })
    }

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword, // ✅ ALWAYS SAVED
      role: role === 'ADMIN' ? 'ADMIN' : 'USER',
    })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// ======================
// LOGIN (USER / ADMIN)
// ======================
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields required' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    if (user.role !== role) {
      return res.status(403).json({
        message:
          role === 'ADMIN'
            ? 'Admin access denied'
            : 'Customer access denied',
      })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ message: 'Incorrect password' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    console.error('LOGIN ERROR:', err)
    res.status(500).json({ message: 'Server error' })
  }
})
// ======================
// CHANGE PASSWORD
// ======================
router.post('/change-password', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) return res.status(404).json({ message: 'User not found' })

    const { oldPassword, newPassword } = req.body

    const match = await bcrypt.compare(oldPassword, user.password)
    if (!match) {
      return res.status(400).json({ message: 'Old password incorrect' })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.json({ message: 'Password changed successfully' })
  } catch (err) {
    console.error('CHANGE PASSWORD ERROR:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// ======================
// FORGOT PASSWORD
// ======================
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'No account with that email' })
    }

    const token = crypto.randomBytes(32).toString('hex')

    user.resetToken = token
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000
    await user.save()

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`
    await sendResetEmail(user.email, resetLink)

    res.json({ message: 'Password reset link sent to email' })
  } catch (err) {
    console.error('FORGOT PASSWORD ERROR:', err)
    res.status(500).json({ message: 'Email failed to send' })
  }
})

// ======================
// RESET PASSWORD
// ======================
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body
    const { token } = req.params

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired link' })
    }

    user.password = await bcrypt.hash(password, 10)
    user.resetToken = null
    user.resetTokenExpires = null
    await user.save()

    res.json({ message: 'Password reset successful' })
  } catch (err) {
    console.error('RESET PASSWORD ERROR:', err)
    res.status(500).json({ message: 'Reset failed' })
  }
})

export default router

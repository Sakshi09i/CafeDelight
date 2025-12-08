import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" })

    const exists = await User.findOne({ email })
    if (exists)
      return res.status(400).json({ message: "Email already registered" })

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hashed })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Register failed" })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: "Wrong password" })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })

  } catch (err) {
    res.status(500).json({ message: "Login failed" })
  }
}

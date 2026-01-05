import express from 'express'
import Order from '../models/Order.js'
import User from '../models/User.js'
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

// ======================
// PLACE ORDER (USER ONLY)
// ======================
router.post('/place', requireAuth, async (req, res) => {
  try {
    // 🔒 ROLE CHECK
    if (req.user.role !== 'USER') {
      return res.status(403).json({ message: 'Only customers can place orders' })
    }

    const {
      items,
      totalAmount,
      paymentMethod,
      phone,
      instructions = '',
    } = req.body

    // ✅ VALIDATIONS
    if (!items || !items.length) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' })
    }

    if (!paymentMethod || !phone) {
      return res
        .status(400)
        .json({ message: 'Payment method & phone required' })
    }

    // ✅ CREATE ORDER
    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      paymentMethod,
      phone,
      instructions,
      status: 'PENDING',
    })

    // 📧 SEND EMAIL (NON-BLOCKING)
    try {
      const user = await User.findById(req.user.id)
      if (user?.email) {
        sendOrderConfirmationEmail(user.email, order)
      }
    } catch (emailErr) {
      console.error('📧 Order email failed:', emailErr.message)
    }

    return res.status(201).json({
      message: 'Order placed successfully',
      orderId: order._id,
    })
  } catch (err) {
    console.error('PLACE ORDER ERROR:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// ======================
// GET MY ORDERS (USER ONLY)
// ======================
router.get('/my', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'USER') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (err) {
    console.error('GET MY ORDERS ERROR:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// ======================
// GET SINGLE ORDER (USER ONLY)
// ======================
router.get('/:id', requireAuth, async (req, res) => {
  try {
    if (req.user.role !== 'USER') {
      return res.status(403).json({ message: 'Access denied' })
    }

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(order)
  } catch (err) {
    console.error('GET ORDER ERROR:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

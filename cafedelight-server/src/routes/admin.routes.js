import express from 'express'
import Order from '../models/Order.js'
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// ======================
// ADMIN DASHBOARD METRICS
// ======================
router.get('/metrics', requireAuth, requireAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments()

    const pendingOrders = await Order.countDocuments({
      status: 'PENDING',
    })

    // 🗓 Today revenue
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const todayOrders = await Order.find({
      createdAt: { $gte: startOfDay },
    })

    const todayRevenue = todayOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    )

    res.json({
      totalOrders,
      pendingOrders,
      todayRevenue,
    })
  } catch (err) {
    console.error('ADMIN METRICS ERROR:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

import express from 'express'
import { requireAuth, requireAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/dashboard', requireAuth, requireAdmin, (req, res) => {
  res.json({
    message: 'Admin dashboard access granted',
    admin: {
      id: req.user.id,
      role: req.user.role,
    },
  })
})

export default router

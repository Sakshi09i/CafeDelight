import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './db.js'

import authRoutes from './routes/auth.routes.js'
import orderRoutes from './routes/order.routes.js'
import adminRoutes from './routes/admin.routes.js'

const app = express()

// ======================
// MIDDLEWARE
// ======================
app.use(express.json())

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)

      const allowed = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
      ].filter(Boolean)

      if (allowed.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('CORS not allowed'))
      }
    },
    credentials: true,
  })
)

// ======================
// TEST ROUTE
// ======================
app.get('/', (req, res) => {
  res.send('✅ Backend working fine')
})

// ======================
// ROUTES (ORDER MATTERS)
// ======================
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin', adminRoutes)

// ======================
// GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error('🔥 Backend error:', err)
  res.status(500).json({ message: err.message || 'Internal server error' })
})

// ======================
// DB CONNECT
// ======================
connectDB()

export default app

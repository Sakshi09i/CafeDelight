import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import authRoutes from './routes/auth.routes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

connectDB()

app.get('/', (req, res) => {
  res.send("Backend working ✅")
})

app.use('/api/auth', authRoutes)

export default app

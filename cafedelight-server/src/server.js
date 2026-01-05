import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('✅ ENV CHECK:')
  console.log('MONGO_URI =', process.env.MONGO_URI ? 'FOUND' : 'MISSING')
  console.log('JWT_SECRET =', process.env.JWT_SECRET ? 'FOUND' : 'MISSING')
  console.log('EMAIL_USER =', process.env.EMAIL_USER ? 'FOUND' : 'MISSING')
  console.log('EMAIL_PASS =', process.env.EMAIL_PASS ? 'FOUND' : 'MISSING')
  console.log('FRONTEND_URL =', process.env.FRONTEND_URL ? 'FOUND' : 'MISSING')

  console.log(`🚀 Server running on port ${PORT}`)
})

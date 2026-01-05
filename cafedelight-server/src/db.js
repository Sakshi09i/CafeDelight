import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI missing in .env')
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true, // good for dev
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

export default connectDB

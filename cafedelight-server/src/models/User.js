import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // 🔐 IMPORTANT
    },

    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },

    phone: {
      type: String,
      default: '',
    },

    resetToken: String,
    resetTokenExpires: Date,
  },
  { timestamps: true }
)

userSchema.index({ email: 1 })

export default mongoose.model('User', userSchema)

import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'UPI', 'CARD'],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING',
    },

    phone: {
      type: String,
      required: true,
    },

    instructions: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['PENDING', 'PREPARING', 'READY', 'SERVED'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
)

orderSchema.index({ user: 1, createdAt: -1 })

export default mongoose.model('Order', orderSchema)

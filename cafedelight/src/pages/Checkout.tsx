import { useState } from 'react'
import { useCart, selectCartArray, selectTotal } from '../stores/cart'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { apiPost } from '../api/api'
import { useAuth } from '../stores/auth'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { user, token } = useAuth()

  // cart store
  const itemsMap = useCart((s) => s.items)
  const inc = useCart((s) => s.increment)
  const dec = useCart((s) => s.decrement)
  const remove = useCart((s) => s.remove)
  const clear = useCart((s) => s.clear)

  const items = selectCartArray(itemsMap)
  const total = selectTotal(itemsMap)

  // customer fields
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [instructions, setInstructions] = useState('')
  const [payment, setPayment] = useState<'COD' | 'UPI' | 'CARD'>('COD')
  const [placed, setPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validate = () => {
    if (!user || !token) return 'Please login to place order.'
    if (!name.trim()) return 'Please enter your name.'
    if (!contact.trim()) return 'Please enter your contact number.'
    if (items.length === 0) return 'Cart is empty.'
    return ''
  }

  const placeOrder = async () => {
    const err = validate()
    if (err) {
      setError(err)
      return
    }

    try {
      setError('')
      setLoading(true)

      const orderPayload = {
        items: items.map((i) => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        totalAmount: total, // ✅ FIX
        paymentMethod: payment,
        phone: contact, // ✅ FIX
      }

      const res = await apiPost('/api/orders/place', orderPayload)

      setPlaced(true) // ✅ AFTER success
      clear()

      navigate(`/status?step=1&orderId=${res.orderId}`)
    } catch (err: any) {
      setPlaced(false)
      setError(err?.message || 'Order failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto py-8'>
      <h2 className='text-2xl font-display mb-4'>Checkout</h2>

      <div className='grid lg:grid-cols-3 gap-6'>
        {/* LEFT */}
        <div className='lg:col-span-2 space-y-4'>
          {/* Order Summary */}
          <div className='bg-white rounded-xl border p-4'>
            <div className='font-semibold mb-3'>Order Summary</div>

            {items.length === 0 ? (
              <div>Your cart is empty.</div>
            ) : (
              items.map((i) => (
                <div
                  key={i.id}
                  className='flex justify-between items-center border-b py-2'
                >
                  <div className='flex items-center gap-3'>
                    <img
                      src={i.image}
                      alt={i.name}
                      className='w-14 h-14 rounded object-cover'
                    />
                    <div>
                      <div className='font-medium'>{i.name}</div>
                      <div className='text-sm text-coffee-600'>
                        ₹{i.price} each
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <button onClick={() => dec(i.id)}>-</button>
                    <span>{i.quantity}</span>
                    <button onClick={() => inc(i.id)}>+</button>
                  </div>

                  <div>₹{i.price * i.quantity}</div>

                  <button onClick={() => remove(i.id)}>Remove</button>
                </div>
              ))
            )}

            <div className='text-right font-semibold mt-3'>Total: ₹{total}</div>
          </div>

          {/* Customer Details */}
          <div className='bg-white rounded-xl border p-4 space-y-3'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Customer Name'
              className='input-field'
            />
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder='Contact Number'
              className='input-field'
            />
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder='Special Instructions (optional)'
              className='input-field'
            />
          </div>

          {/* Payment */}
          <div className='bg-white rounded-xl border p-4'>
            <div className='font-semibold mb-3'>Payment</div>
            <div className='flex gap-3'>
              {[
                { key: 'COD', label: 'Cash on Delivery' },
                { key: 'UPI', label: 'UPI' },
                { key: 'CARD', label: 'Card' },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPayment(p.key as any)}
                  className={`px-4 py-2 border rounded ${
                    payment === p.key ? 'bg-peacock text-white' : ''
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className='bg-white rounded-xl border p-4 sticky top-20'>
          <div className='font-semibold mb-2'>Bill Summary</div>

          <div className='flex justify-between'>
            <span>Payable</span>
            <span>₹{total}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={placeOrder}
            disabled={loading}
            className='btn-primary w-full mt-4'
          >
            {loading ? 'Placing…' : 'Place Order'}
          </motion.button>

          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

          {placed && (
            <div className='mt-3 text-center text-green-600'>
              🎉 Order placed! Redirecting…
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

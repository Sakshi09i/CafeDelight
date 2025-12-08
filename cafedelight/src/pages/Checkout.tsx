import { useState } from 'react'
import { useCart, selectCartArray, selectTotal } from '../stores/cart'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function CheckoutPage() {
  const navigate = useNavigate()

  // cart store usage
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
  const [payment, setPayment] = useState<'COD' | 'UPI' | 'Card'>('COD')
  const [placed, setPlaced] = useState(false)

  const [error, setError] = useState('')

  const validate = () => {
    if (!name.trim()) return 'Please enter your name.'
    if (!contact.trim()) return 'Please enter your contact number or email.'
    if (items.length === 0) return 'Cart is empty.'
    return ''
  }

  const placeOrder = () => {
    const err = validate()
    if (err) {
      setError(err)
      return
    }

    setError('')
    setPlaced(true)

    // clears cart and moves to status page
    setTimeout(() => {
      clear()
      navigate('/status?step=1') // ⭐ step=1 for "Preparing"
    }, 1200)
  }

  return (
    <div className='container mx-auto py-8'>
      <h2 className='text-2xl font-display mb-4'>Checkout</h2>

      <div className='grid lg:grid-cols-3 gap-6'>
        {/* Left side */}
        <div className='lg:col-span-2 space-y-4'>
          {/* Order summary */}
          <div className='bg-white rounded-xl border border-coffee-100 p-4'>
            <div className='font-semibold mb-3'>Order Summary</div>

            {items.length === 0 ? (
              <div className='text-coffee-700'>Your cart is empty.</div>
            ) : (
              <div className='space-y-3'>
                {items.map((i) => (
                  <div
                    key={i.id}
                    className='flex items-center justify-between border-b border-coffee-100 pb-3'
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

                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => i.quantity > 1 && dec(i.id)}
                        className='px-2 py-1 rounded border'
                      >
                        -
                      </button>
                      <span>{i.quantity}</span>
                      <button
                        onClick={() => inc(i.id)}
                        className='px-2 py-1 rounded border'
                      >
                        +
                      </button>

                      <div className='w-20 text-right'>
                        ₹{i.price * i.quantity}
                      </div>

                      <button
                        onClick={() => remove(i.id)}
                        className='text-rosevale underline'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className='flex justify-end pt-2'>
                  <div className='text-lg font-semibold'>Total: ₹{total}</div>
                </div>
              </div>
            )}
          </div>

          {/* Customer Details */}
          <div className='bg-white rounded-xl border border-coffee-100 p-4'>
            <div className='font-semibold mb-3'>Customer Details</div>

            <div className='grid gap-3'>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Customer Name'
                className='border rounded-md px-3 py-2 bg-white'
              />

              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder='Contact Number / Email'
                className='border rounded-md px-3 py-2 bg-white'
              />

              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder='Special Instructions (optional)'
                rows={3}
                className='border rounded-md px-3 py-2 bg-white'
              />
            </div>
          </div>

          {/* Payment */}
          <div className='bg-white rounded-xl border border-coffee-100 p-4'>
            <div className='font-semibold mb-3'>Payment</div>

            <div className='grid sm:grid-cols-3 gap-3'>
              {[
                { key: 'COD', label: 'Cash on Delivery' },
                { key: 'UPI', label: 'Google Pay / UPI' },
                { key: 'Card', label: 'Card Payment' },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPayment(p.key as any)}
                  className={`px-4 py-2 rounded-md border transition 
                    ${
                      payment === p.key
                        ? 'bg-peacock text-white border-peacock'
                        : 'bg-white text-charcoal'
                    }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className='space-y-4'>
          {/* Bill summary */}
          <div className='bg-white rounded-xl border border-coffee-100 p-4 sticky top-20'>
            <div className='font-semibold mb-2'>Bill Summary</div>

            <div className='flex items-center justify-between'>
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className='flex items-center justify-between'>
              <span>Discounts</span>
              <span>₹0</span>
            </div>

            <div className='flex items-center justify-between font-semibold border-t border-coffee-100 mt-2 pt-2'>
              <span>Payable</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={placeOrder}
              className='btn-primary w-full mt-3'
            >
              Place Order
            </motion.button>

            {error && <p className='text-sm text-rosevale mt-2'>{error}</p>}

            <div className='mt-2 text-xs text-coffee-600'>
              You can rate your order after it’s served.
            </div>
          </div>

          {placed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-turmeric rounded-xl p-4 text-center'
            >
              🎉 Order placed! Redirecting…
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

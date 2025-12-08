import { useCart, selectCartArray, selectTotal } from '../stores/cart'
import { Link } from 'react-router-dom'

export function CartPage() {
  const itemsMap = useCart((s) => s.items)
  const inc = useCart((s) => s.increment)
  const dec = useCart((s) => s.decrement)
  const remove = useCart((s) => s.remove)
  const clear = useCart((s) => s.clear)

  const items = selectCartArray(itemsMap)
  const total = selectTotal(itemsMap)

  return (
    <div className='container-px mx-auto py-10'>
      <h2 className='text-3xl font-display mb-6 text-coffee-900'>Your Cart</h2>

      {items.length === 0 ? (
        <div className='text-coffee-700 text-lg'>
          Your cart is empty.
          <br />
          <Link to='/menu' className='text-rosevale font-semibold underline'>
            Go to Menu
          </Link>
        </div>
      ) : (
        <div className='space-y-6'>
          <div className='overflow-x-auto rounded-xl shadow-lg'>
            <table className='w-full bg-white border border-coffee-100 overflow-hidden'>
              <thead className='bg-coffee-100/60 text-coffee-900'>
                <tr>
                  <th className='px-4 py-3 text-left'>Item</th>
                  <th className='px-4 py-3 text-center'>Qty</th>
                  <th className='px-4 py-3 text-center'>Price</th>
                  <th className='px-4 py-3 text-center'>Subtotal</th>
                  <th className='px-4 py-3'></th>
                </tr>
              </thead>

              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className='border-t border-coffee-100'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={i.image}
                          alt={i.name}
                          className='w-12 h-12 rounded-lg object-cover shadow'
                        />
                        <div>
                          <div className='font-semibold text-coffee-900'>
                            {i.name}
                          </div>
                          <div className='text-sm text-coffee-600'>
                            {i.category}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className='px-4 py-3 text-center'>
                      <div className='inline-flex items-center gap-2'>
                        <button
                          onClick={() => dec(i.id)}
                          className='px-3 py-1 rounded-md border bg-coffee-50 hover:bg-coffee-100 transition'
                        >
                          −
                        </button>
                        <span className='font-medium'>{i.quantity}</span>
                        <button
                          onClick={() => inc(i.id)}
                          className='px-3 py-1 rounded-md border bg-coffee-50 hover:bg-coffee-100 transition'
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className='px-4 py-3 text-center font-medium text-coffee-900'>
                      ₹{i.price}
                    </td>

                    <td className='px-4 py-3 text-center font-semibold text-rosevale'>
                      ₹{i.price * i.quantity}
                    </td>

                    <td className='px-4 py-3 text-right'>
                      <button
                        onClick={() => remove(i.id)}
                        className='text-rosevale hover:underline font-medium'
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='flex items-center justify-between'>
            <button
              onClick={clear}
              className='px-4 py-2 rounded-xl border border-coffee-200 bg-coffee-50 hover:bg-coffee-100 transition'
            >
              Clear Cart
            </button>

            <div className='text-2xl font-bold text-coffee-900'>
              Total: ₹{total}
            </div>
          </div>

          <div className='text-right'>
            <Link
              to='/checkout'
              className='inline-block bg-rosevale text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-mango transition'
            >
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

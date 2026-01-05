import { useEffect, useState } from 'react'
import { apiGet } from '../api/api'
import { useAuth } from '../stores/auth'
import { useNavigate } from 'react-router-dom'

export function OrdersPage() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await apiGet('/api/orders/my')
        setOrders(res)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchOrders()
  }, [token])

  if (loading) return <p className='p-6'>Loading orders...</p>

  if (!orders.length) {
    return (
      <div className='p-6 text-center'>
        <p>You haven’t placed any orders yet ☕</p>
      </div>
    )
  }

  return (
    <div className='container-px mx-auto py-8 space-y-6'>
      <h1 className='text-2xl font-display'>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className='bg-white rounded-xl border p-4 cursor-pointer hover:shadow'
          onClick={() => navigate(`/status?orderId=${order._id}`)}
        >
          <div className='flex justify-between'>
            <div>
              <p className='font-semibold'>Order #{order._id.slice(-6)}</p>
              <p className='text-sm text-coffee-600'>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <span className='px-3 py-1 rounded-full text-sm bg-coffee-100'>
              {order.status}
            </span>
          </div>

          <div className='mt-3 text-sm'>
            Items: {order.items.length} <br />
            Total: ₹{order.totalAmount} <br />
            Payment: {order.paymentMethod}
          </div>
        </div>
      ))}
    </div>
  )
}

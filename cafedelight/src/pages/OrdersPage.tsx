import { useEffect, useState } from 'react'
import { apiGet } from '../api/api'
import { useAuth } from '../stores/auth'
import { useNavigate } from 'react-router-dom'

export function OrdersPage() {
  const { token } = useAuth()
  const navigate = useNavigate()

  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const res = await apiGet('/api/orders/my')
      setOrders(res)
    } catch (err) {
      console.error('Failed to fetch orders', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return

    fetchOrders()

    // 🔁 LIVE UPDATE every 5 seconds
    const interval = setInterval(fetchOrders, 5000)

    return () => clearInterval(interval)
  }, [token])

  if (loading) return <p className='p-6'>Loading orders…</p>

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
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-semibold'>Order #{order._id.slice(-6)}</p>
              <p className='text-sm text-coffee-600'>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {/* STATUS BADGE */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-700'
                  : order.status === 'PREPARING'
                  ? 'bg-blue-100 text-blue-700'
                  : order.status === 'READY'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className='mt-3 text-sm text-coffee-700'>
            Items: {order.items.length} <br />
            Total: ₹{order.totalAmount} <br />
            Payment: {order.paymentMethod}
          </div>
        </div>
      ))}
    </div>
  )
}

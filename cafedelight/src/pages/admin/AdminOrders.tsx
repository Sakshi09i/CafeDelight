import { useEffect, useState } from 'react'
import { apiGetAdminOrders, apiUpdateOrderStatus } from '../../api/api'

interface Order {
  _id: string
  user?: {
    name: string
    email: string
  }
  totalAmount: number
  status: 'PENDING' | 'PREPARING' | 'READY' | 'SERVED'
  createdAt: string
}

const statuses: Order['status'][] = ['PENDING', 'PREPARING', 'READY', 'SERVED']

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await apiGetAdminOrders()
      setOrders(data)
    } catch (err: any) {
      setError(err?.message || 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleStatusChange = async (
    orderId: string,
    status: Order['status']
  ) => {
    try {
      await apiUpdateOrderStatus(orderId, status)
      await loadOrders() // refresh list
    } catch (err: any) {
      alert(err?.message || 'Failed to update order status')
    }
  }

  if (loading) {
    return <p className='text-coffee-700'>Loading orders…</p>
  }

  if (error) {
    return <p className='text-red-500'>{error}</p>
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Manage Orders</h1>

      <div className='space-y-4'>
        {orders.map((order) => (
          <div
            key={order._id}
            className='bg-white p-4 rounded-xl shadow border'
          >
            <div className='flex justify-between items-start gap-4'>
              <div>
                <p className='font-semibold'>{order.user?.name || 'Guest'}</p>
                <p className='text-sm text-gray-500'>
                  {order.user?.email || '—'}
                </p>
                <p className='text-sm mt-1'>Total: ₹{order.totalAmount}</p>
              </div>

              {/* ✅ ACCESSIBLE SELECT */}
              <select
                aria-label='Update order status'
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(
                    order._id,
                    e.target.value as Order['status']
                  )
                }
                className='border rounded px-2 py-1'
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <p className='text-xs text-gray-400 mt-2'>
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

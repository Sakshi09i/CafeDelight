import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiGet } from '../api/api'

const steps = ['Pending', 'Preparing', 'Ready', 'Served']

const statusMap: Record<string, number> = {
  PENDING: 0,
  PREPARING: 1,
  READY: 2,
  SERVED: 3,
}

export function OrderStatusPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchOrder = async () => {
    try {
      const res = await apiGet(`/api/orders/${orderId}`)
      setOrder(res)
    } catch (err) {
      console.error('Failed to load order', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!orderId) return

    fetchOrder()

    // 🔁 LIVE UPDATE every 5 seconds
    const interval = setInterval(fetchOrder, 5000)

    return () => clearInterval(interval)
  }, [orderId])

  if (loading) return <p className='p-6'>Loading order status…</p>
  if (!order) return <p className='p-6'>Order not found</p>

  const currentStep = statusMap[order.status] ?? 0

  return (
    <div className='container-px mx-auto py-8 space-y-10'>
      {/* ORDER STATUS */}
      <section>
        <h2 className='mb-6 text-2xl font-display'>Order Status</h2>

        <ol className='flex items-center justify-between gap-4'>
          {steps.map((label, idx) => (
            <li key={label} className='flex-1'>
              <div
                className={`flex items-center ${
                  idx < steps.length - 1
                    ? "after:content-[''] after:ml-4 after:h-0.5 after:flex-1 after:bg-coffee-200"
                    : ''
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                    idx <= currentStep
                      ? 'bg-coffee-600 text-white'
                      : 'bg-coffee-100 text-coffee-600'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className='ml-2 text-sm text-coffee-700'>{label}</span>
              </div>
            </li>
          ))}
        </ol>

        <p className='mt-4 text-sm text-coffee-600'>
          Order ID: <span className='font-medium'>{order._id}</span>
        </p>

        <p className='mt-2 text-sm'>
          Current Status:{' '}
          <span className='font-semibold text-coffee-800'>{order.status}</span>
        </p>
      </section>
    </div>
  )
}


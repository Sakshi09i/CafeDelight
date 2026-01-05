import { useEffect, useState } from 'react'
import { apiGetAdminMetrics } from '../../api/api'

interface Metrics {
  totalOrders: number
  pendingOrders: number
  todayRevenue: number
}

export function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGetAdminMetrics()
      .then(setMetrics)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading dashboard…</p>
  if (!metrics) return <p>Failed to load metrics</p>

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-xl shadow'>
          <h3 className='text-sm text-gray-500'>Total Orders</h3>
          <p className='text-3xl font-bold mt-2'>{metrics.totalOrders}</p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow'>
          <h3 className='text-sm text-gray-500'>Pending Orders</h3>
          <p className='text-3xl font-bold mt-2 text-orange-600'>
            {metrics.pendingOrders}
          </p>
        </div>

        <div className='bg-white p-6 rounded-xl shadow'>
          <h3 className='text-sm text-gray-500'>Today Revenue</h3>
          <p className='text-3xl font-bold mt-2 text-green-600'>
            ₹{metrics.todayRevenue}
          </p>
        </div>
      </div>
    </div>
  )
}

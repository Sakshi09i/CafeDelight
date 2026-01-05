export function AdminOrders() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>Manage Orders</h1>

      <div className='bg-white rounded-xl shadow p-4'>
        <p className='text-coffee-700'>Orders list will come from backend.</p>

        <ul className='mt-4 space-y-3'>
          <li className='border p-3 rounded'>Order #1234 – Pending</li>
          <li className='border p-3 rounded'>Order #1233 – Preparing</li>
        </ul>
      </div>
    </div>
  )
}

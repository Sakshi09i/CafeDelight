export function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-coffee-700">
        Overview of café operations.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold">Total Orders</h3>
          <p className="text-2xl mt-2">128</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold">Pending Orders</h3>
          <p className="text-2xl mt-2">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold">Today Revenue</h3>
          <p className="text-2xl mt-2">₹8,540</p>
        </div>
      </div>
    </div>
  )
}

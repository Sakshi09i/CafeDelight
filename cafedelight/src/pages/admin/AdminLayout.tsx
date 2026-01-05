import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../stores/auth'

export function AdminLayout() {
  const logout = useAuth((s) => s.logout)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex'>
      {/* SIDEBAR */}
      <aside className='w-64 bg-coffee-900 text-white p-6'>
        <h2 className='text-2xl font-bold mb-6'>Café Manager</h2>

        <nav className='space-y-3'>
          <NavLink to='/admin/dashboard' className='block hover:text-mango'>
            📊 Dashboard
          </NavLink>
          <NavLink to='/admin/orders' className='block hover:text-mango'>
            📦 Orders
          </NavLink>
        </nav>

        <button
          onClick={() => {
            logout()
            navigate('/login')
          }}
          className='mt-10 text-red-400 hover:text-red-300'
        >
          🚪 Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className='flex-1 bg-coffee-50 p-8'>
        <Outlet />
      </main>
    </div>
  )
}

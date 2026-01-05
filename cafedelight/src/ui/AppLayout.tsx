import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../stores/auth'

export function AppLayout() {
  const user = useAuth((s) => s.user)
  const logout = useAuth((s) => s.logout)
  const navigate = useNavigate()

  return (
    <div className='min-h-full flex flex-col'>
      {/* HEADER */}
      <header className='sticky top-0 z-50 bg-rosevale/90 backdrop-blur border-b border-mango'>
        <div className='container-px mx-auto flex items-center justify-between py-3'>
          {/* LOGO */}
          <NavLink
            to='/home'
            end
            className='text-2xl font-display text-white'
          >
            Café Delight
          </NavLink>

          {/* NAV */}
          <nav className='flex items-center gap-4 text-white'>
            <NavLink to='/home' end>Home</NavLink>
            <NavLink to='/menu'>Menu</NavLink>
            <NavLink to='/cart'>Cart</NavLink>
            <NavLink to='/checkout'>Checkout</NavLink>
            <NavLink to='/status'>Order Status</NavLink>

            {/* USER DROPDOWN */}
            {user && (
              <div className='relative group'>
                {/* Avatar */}
                <div className='w-10 h-10 rounded-full bg-white text-rosevale font-bold flex items-center justify-center cursor-pointer shadow-md'>
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* Dropdown */}
                <div
                  className='absolute right-0 mt-3 w-56 rounded-xl shadow-xl border
                             bg-white text-coffee-900 opacity-0 invisible
                             group-hover:opacity-100 group-hover:visible
                             transition-all duration-200 z-50'
                >
                  {/* User Info */}
                  <div className='px-4 py-3 border-b bg-coffee-50 rounded-t-xl'>
                    <p className='font-semibold'>{user.name}</p>
                    <p className='text-xs text-gray-500 truncate'>
                      {user.email}
                    </p>
                  </div>

                  {/* My Profile */}
                  <NavLink
                    to='/profile'
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 text-sm transition-colors
                       ${
                         isActive
                           ? 'bg-mango/30 font-semibold'
                           : 'hover:bg-mango/20'
                       }`
                    }
                  >
                    👤 <span>My Profile</span>
                  </NavLink>

                  {/* My Orders */}
                  <NavLink
                    to='/orders'
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 text-sm transition-colors
                       ${
                         isActive
                           ? 'bg-mango/30 font-semibold'
                           : 'hover:bg-mango/20'
                       }`
                    }
                  >
                    📜 <span>My Orders</span>
                  </NavLink>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout()
                      navigate('/login')
                    }}
                    className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm
                               text-red-600 hover:bg-red-50 rounded-b-xl'
                  >
                    🚪 <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}

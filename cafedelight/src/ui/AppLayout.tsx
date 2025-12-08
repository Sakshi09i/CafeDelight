import { NavLink, Outlet } from 'react-router-dom'
import { useUser } from '../stores/user'

export function AppLayout() {
  const user = useUser((s) => s.user)

  return (
    <div className='min-h-full flex flex-col'>
      <header className='sticky top-0 z-50 bg-rosevale/90 backdrop-blur border-b border-mango'>
        <div className='container-px mx-auto flex items-center justify-between py-3'>
          <NavLink to='/home' className='text-2xl font-display text-white'>
            Café Delight
          </NavLink>
          <nav className='flex items-center gap-4 text-white'>
            <NavLink
              to='/home'
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : ''
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/menu'
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : ''
              }
            >
              Menu
            </NavLink>
            <NavLink
              to='/cart'
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : ''
              }
            >
              Cart
            </NavLink>
            <NavLink
              to='/checkout'
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : ''
              }
            >
              Checkout
            </NavLink>
            <NavLink
              to='/status'
              className={({ isActive }) =>
                isActive ? 'font-semibold underline' : ''
              }
            >
              Order Status
            </NavLink>
            {user && (
              <span className='ml-2 text-sm opacity-90'>Hi, {user.name}!</span>
            )}
          </nav>
        </div>
      </header>
      <main className='flex-1'>
        <Outlet />
      </main>
      <footer className='mt-8 bg-cornsilk text-charcoal'>
        {/* footer content stays the same */}
      </footer>
    </div>
  )
}

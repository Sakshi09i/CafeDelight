import { Link } from 'react-router-dom'
import { useAuth } from '../stores/auth'

export function UnauthorizedPage() {
  const user = useAuth((s) => s.user)

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-3">
          Access Denied
        </h1>
        <p className="text-coffee-700 mb-6">
          You don’t have permission to access this page.
        </p>

        <Link
          to={user?.role === 'ADMIN' ? '/admin/dashboard' : '/home'}
          className="bg-rosevale text-white px-6 py-3 rounded-xl inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

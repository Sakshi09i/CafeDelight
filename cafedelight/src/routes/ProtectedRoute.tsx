import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../stores/auth'

type Role = 'USER' | 'ADMIN'

interface Props {
  allowedRoles?: Role[]
}

export function ProtectedRoute({ allowedRoles }: Props) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  // 🔐 Not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 🔒 Role-based authorization
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

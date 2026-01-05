import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './style.css'

import { AppLayout } from './ui/AppLayout'
import { HomePage } from './pages/Home'
import { WelcomePage } from './pages/Welcome'
import { MenuPage } from './pages/Menu'
import { CartPage } from './pages/Cart'
import { CheckoutPage } from './pages/Checkout'
import { OrderStatusPage } from './pages/OrderStatusPage'
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/RegisterPage'
import { ForgotPasswordPage } from './pages/ForgotPassword'
import { ResetPasswordPage } from './pages/ResetPassword'
import { ProfilePage } from './pages/Profile'
import { OrdersPage } from './pages/OrdersPage'

import { ProtectedRoute } from './routes/ProtectedRoute'
import { UnauthorizedPage } from './pages/Unauthorized'

import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminOrders } from './pages/admin/AdminOrders'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      // 🌸 PUBLIC
      { index: true, element: <WelcomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password/:token', element: <ResetPasswordPage /> },
      { path: 'unauthorized', element: <UnauthorizedPage /> }, // ✅ HERE

      // 🔐 USER ROUTES
      {
        element: <ProtectedRoute allowedRoles={['USER']} />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: 'home', element: <HomePage /> },
              { path: 'menu', element: <MenuPage /> },
              { path: 'cart', element: <CartPage /> },
              { path: 'checkout', element: <CheckoutPage /> },
              { path: 'status', element: <OrderStatusPage /> },
              { path: 'orders', element: <OrdersPage /> },
              { path: 'profile', element: <ProfilePage /> },
            ],
          },
        ],
      },

      // 🔒 ADMIN ROUTES
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: 'dashboard', element: <AdminDashboard /> },
              { path: 'orders', element: <AdminOrders /> },
            ],
          },
        ],
      },
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

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
import { OrderStatusPage } from './pages/OrderStatus'
import { LoginPage } from './pages/Login'
import { RegisterPage } from './pages/RegisterPage'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: <AppLayout />,
        children: [
          { path: 'home', element: <HomePage /> },
          { path: 'menu', element: <MenuPage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'status', element: <OrderStatusPage /> },
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



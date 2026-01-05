import nodemailer from 'nodemailer'

function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials not configured')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// ======================
// RESET PASSWORD EMAIL
// ======================
export async function sendResetEmail(to, resetLink) {
  try {
    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"Café Delight" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Reset your Café Delight password',
      html: `
        <div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;">
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your Café Delight password.</p>

          <p>
            <a href="${resetLink}"
               style="background:#b45309;color:white;padding:10px 16px;
                      border-radius:6px;text-decoration:none;">
              Reset Password
            </a>
          </p>

          <p>This link will expire in 15 minutes.</p>
          <p>If you did not request this, you can safely ignore this email.</p>

          <hr />
          <small>© Café Delight</small>
        </div>
      `,
    })
  } catch (err) {
    console.error('❌ Reset email failed:', err.message)
  }
}

// ======================
// ORDER CONFIRMATION EMAIL
// ======================
export async function sendOrderConfirmationEmail(
  to,
  order,
  userName = 'Customer'
) {
  try {
    const transporter = createTransporter()

    const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0)

    await transporter.sendMail({
      from: `"Café Delight" <${process.env.EMAIL_USER}>`,
      to,
      subject: '☕ Your order has been placed successfully',
      html: `
        <div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;">
          <h2>Hello ${userName},</h2>

          <p>Thank you for ordering from <strong>Café Delight</strong>.</p>

          <h3>🧾 Order Summary</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Number of items:</strong> ${totalItems}</p>
          <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>

          <h4>Items</h4>
          <ul>
            ${order.items
              .map(
                (i) =>
                  `<li>${i.name} × ${i.quantity} — ₹${
                    i.price * i.quantity
                  }</li>`
              )
              .join('')}
          </ul>

          <p>Our team has started preparing your order.</p>
          <p>You can check the order status anytime in your profile.</p>

          <p>☕ We hope you enjoy your experience with us!</p>

          <hr />
          <p>Warm regards,<br/><strong>Café Delight Team</strong></p>
        </div>
      `,
    })
  } catch (err) {
    console.error('❌ Order confirmation email failed:', err.message)
  }
}

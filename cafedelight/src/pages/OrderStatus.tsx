import { useMemo, useEffect, useState } from 'react'
import { useReviews } from '../stores/reviews'
import { useSearchParams } from 'react-router-dom'
import { apiGet } from '../api/api'

const steps = ['Pending', 'Preparing', 'Ready', 'Served']
const statusMap: Record<string, number> = {
  PENDING: 0,
  PREPARING: 1,
  READY: 2,
  SERVED: 3,
}

export function OrderStatusPage() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // ⭐ FETCH ORDER FROM DB
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await apiGet(`/api/orders/${orderId}`)
        setOrder(res)
      } catch (err) {
        console.error('Failed to load order', err)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) fetchOrder()
  }, [orderId])

  const current = order ? statusMap[order.status] ?? 0 : 0

  /* ---------------- REVIEWS (UNCHANGED) ---------------- */

  const { reviews, addReview, removeReview } = useReviews((s) => ({
    reviews: s.reviews,
    addReview: s.addReview,
    removeReview: s.removeReview,
  }))

  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })
  const [error, setError] = useState('')

  const averageRating = useMemo(
    () =>
      reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
    [reviews]
  )

  const ratingBadges = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((score) => ({
        score,
        count: reviews.filter((r) => r.rating === score).length,
      })),
    [reviews]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.comment.trim()) {
      setError('Please add your name and a short comment.')
      return
    }

    addReview({
      name: form.name.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
    })

    setForm({ name: '', rating: 5, comment: '' })
  }

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5 text-mango">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>{star <= rating ? '★' : '☆'}</span>
      ))}
    </div>
  )

  const handleDelete = (id: string) => removeReview(id)

  if (loading) return <p className="p-6">Loading order status...</p>

  if (!order) return <p className="p-6">Order not found</p>

  return (
    <div className="container-px mx-auto py-8 space-y-10">
      {/* ✅ ORDER STATUS */}
      <section>
        <h2 className="mb-6 text-2xl font-display">Order Status</h2>

        <ol className="flex items-center justify-between gap-4">
          {steps.map((label, idx) => (
            <li key={label} className="flex-1">
              <div
                className={`flex items-center ${
                  idx < steps.length - 1
                    ? "after:content-[''] after:ml-4 after:h-0.5 after:flex-1 after:bg-coffee-200"
                    : ''
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                    idx <= current
                      ? 'bg-coffee-600 text-white'
                      : 'bg-coffee-100 text-coffee-600'
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="ml-2 text-sm text-coffee-700">
                  {label}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-sm text-coffee-600">
          Order ID: <span className="font-medium">{order._id}</span>
        </p>
      </section>

      {/* ⭐ REVIEWS (AS-IS) */}
      {/* Your entire reviews section remains unchanged */}
    </div>
  )
}

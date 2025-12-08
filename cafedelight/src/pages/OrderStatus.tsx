import { useMemo, useState } from 'react'
import { useReviews } from '../stores/reviews'
import { useSearchParams } from 'react-router-dom'

const steps = ['Pending', 'Preparing', 'Ready', 'Served']

export function OrderStatusPage() {
  // ✅ SAFELY GET STEP FROM URL
  const [params] = useSearchParams()
  const stepParam = Number(params.get('step'))
  const current = isNaN(stepParam) ? 0 : Math.min(stepParam, steps.length - 1)

  const { reviews, addReview, removeReview } = useReviews((s) => ({
    reviews: s.reviews,
    addReview: s.addReview,
    removeReview: s.removeReview,
  }))

  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })
  const [error, setError] = useState('')

  // ✅ CALCULATE AVERAGE RATING
  const averageRating = useMemo(
    () =>
      reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0,
    [reviews]
  )

  // ✅ RATING BREAKDOWN
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
    <div className='flex items-center gap-0.5 text-mango'>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>{star <= rating ? '★' : '☆'}</span>
      ))}
    </div>
  )

  const handleDelete = (id: string) => {
    removeReview(id)
  }

  return (
    <div className='container-px mx-auto py-8 space-y-10'>
      {/* ✅ ORDER STATUS */}
      <section>
        <h2 className='mb-6 text-2xl font-display'>Order Status</h2>
        <ol className='flex items-center justify-between gap-4'>
          {steps.map((label, idx) => (
            <li key={label} className='flex-1'>
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
                <span className='ml-2 text-sm text-coffee-700'>{label}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ✅ REVIEWS */}
      <section className='rounded-3xl bg-white/90 p-6 shadow-xl shadow-coffee-200/40'>
        <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
          {/* FORM */}
          <div>
            <div className='flex flex-wrap items-center justify-between gap-4'>
              <div>
                <p className='text-sm uppercase tracking-wider text-coffee-500'>
                  Customer Reviews & Ratings
                </p>
                <h3 className='text-3xl font-display text-coffee-900'>
                  Share your experience
                </h3>
              </div>

              <div className='rounded-2xl bg-coffee-50 px-4 py-2 text-center text-sm text-coffee-700'>
                <div className='text-2xl font-bold text-coffee-900'>
                  {averageRating ? averageRating.toFixed(1) : '–'}
                </div>
                <div className='text-xs'>Average rating</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='mt-6 space-y-5'>
              <label className='block text-sm font-medium text-coffee-700'>
                Your name
                <input
                  type='text'
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder='e.g. Priya Sharma'
                  className='input-field mt-2'
                />
              </label>

              <div className='text-sm font-medium text-coffee-700'>
                Your rating
                <div className='mt-2 flex flex-wrap gap-2'>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type='button'
                      key={score}
                      onClick={() => setForm((p) => ({ ...p, rating: score }))}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1 text-sm ${
                        form.rating === score
                          ? 'border-rosevale bg-rosevale text-white'
                          : 'border-coffee-200 bg-white text-coffee-700 hover:border-rosevale/60'
                      }`}
                    >
                      {score} ★
                    </button>
                  ))}
                </div>
              </div>

              <label className='block text-sm font-medium text-coffee-700'>
                Comments
                <textarea
                  value={form.comment}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, comment: e.target.value }))
                  }
                  placeholder='Tell us your experience...'
                  className='input-field mt-2 min-h-[140px]'
                />
              </label>

              {error && <p className='text-sm text-rosevale'>{error}</p>}

              <button
                type='submit'
                className='w-full rounded-2xl bg-rosevale px-6 py-3 text-lg font-semibold text-white hover:bg-mango'
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* REVIEWS LIST */}
          <div className='space-y-6'>
            <div className='rounded-2xl border border-coffee-100 bg-coffee-50/60 p-4'>
              <p className='text-sm font-semibold'>Ratings snapshot</p>
              <div className='mt-3 space-y-2'>
                {ratingBadges.map(({ score, count }) => (
                  <div key={score} className='flex gap-3 items-center text-sm'>
                    <span className='w-14'>{score} ★</span>
                    <div className='flex-1 bg-coffee-100 rounded-full h-2'>
                      <div
                        className='h-full rounded-full bg-rosevale transition-all'
                        data-width={
                          reviews.length ? (count / reviews.length) * 100 : 0
                        }
                        style={{
                          width: `${
                            reviews.length ? (count / reviews.length) * 100 : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className='w-6 text-right'>{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {reviews.length === 0 ? (
              <p className='text-sm text-coffee-600'>
                No reviews yet. Be the first to share!
              </p>
            ) : (
              reviews.map((review) => (
                <article
                  key={review.id}
                  className='rounded-2xl border border-coffee-100 bg-white p-4 shadow-sm'
                >
                  <div className='flex justify-between'>
                    <div>
                      <p className='font-semibold'>{review.name}</p>
                      <p className='text-xs text-coffee-500'>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className='flex items-center gap-2'>
                      {renderStars(review.rating)}
                      <button
                        onClick={() => {
                          if (confirm('Delete this review?'))
                            handleDelete(review.id)
                        }}
                        className='text-xs text-rosevale hover:text-mango'
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className='mt-3 text-sm'>{review.comment}</p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

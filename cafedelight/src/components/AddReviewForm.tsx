import { useState } from 'react'
import { useReviews } from '../stores/reviews'
import { useAuth } from '../stores/auth'

export default function AddReviewForm() {
  const addReview = useReviews((state) => state.addReview)
  const user = useAuth((s) => s.user)

  const [rating, setRating] = useState<number>(5)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  // 🔐 Must be logged in
  if (!user) {
    return (
      <p className='text-sm text-gray-500'>Please login to add a review.</p>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) {
      setError('Please write a comment')
      return
    }

    if (rating < 1 || rating > 5) {
      setError('Invalid rating')
      return
    }

    addReview({
      name: user.name,
      rating,
      comment: comment.trim(),
    })

    // reset
    setRating(5)
    setComment('')
    setError('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='p-6 bg-white rounded-xl shadow-md space-y-4 border'
    >
      <h3 className='text-xl font-bold'>Add a Review</h3>

      {error && <p className='text-red-600 text-sm'>{error}</p>}

      <p className='text-sm text-gray-500'>
        Reviewing as <strong>{user.name}</strong>
      </p>

      <label className='block text-sm font-medium'>
        Rating
        <select
          value={rating}
          onChange={(e) => {
            setRating(Number(e.target.value))
            setError('')
          }}
          className='w-full border rounded px-3 py-2 mt-1'
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>
      </label>

      <textarea
        placeholder='Write your review...'
        value={comment}
        onChange={(e) => {
          setComment(e.target.value)
          setError('')
        }}
        className='w-full border rounded px-3 py-2'
        rows={3}
      />

      <button
        type='submit'
        className='bg-coffee-600 text-white px-4 py-2 rounded hover:bg-coffee-700'
      >
        Submit Review
      </button>
    </form>
  )
}

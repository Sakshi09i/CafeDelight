import { useState } from 'react'
import { useReviews } from '../stores/reviews'
import { useUser } from '../stores/user'

export default function AddReviewForm() {
  const addReview = useReviews((state) => state.addReview)
  const user = useUser((s) => s.user)

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  if (!user) {
    return <p className="text-sm text-gray-500">Please login to add review.</p>
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) {
      setError('Please write a comment')
      return
    }

    setError('')
    addReview({ name: user.name, rating, comment })

    setRating(5)
    setComment('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='p-6 bg-white rounded-xl shadow-md space-y-4 border'
    >
      <h3 className='text-xl font-bold'>Add a Review</h3>

      {error && <p className='text-red-600 text-sm'>{error}</p>}

      <p className="text-sm text-gray-500">
        Reviewing as <strong>{user.name}</strong>
      </p>

      <label className="block text-sm font-medium">
  Rating
  <select
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
    className='w-full border rounded px-3 py-2 mt-1'
    aria-label="Select rating"
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
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
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

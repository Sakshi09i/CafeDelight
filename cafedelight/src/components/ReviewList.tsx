import { useReviews } from '../stores/reviews'
import { useAuth } from '../stores/auth'
import { motion } from 'framer-motion'

export default function ReviewList() {
  const reviews = useReviews((s) => s.reviews)
  const remove = useReviews((s) => s.removeReview)
  const user = useAuth((s) => s.user)

  if (reviews.length === 0) {
    return <p className='text-gray-600 mt-6'>No reviews yet.</p>
  }

  return (
    <div className='space-y-4 mt-6'>
      {reviews.map((r) => {
        const rating = Math.min(Math.max(r.rating, 1), 5)
        const canDelete = user && user.name === r.name

        return (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='p-4 rounded-xl border shadow-sm bg-white'
          >
            <div className='flex justify-between items-center'>
              <div>
                <h4 className='font-semibold'>{r.name}</h4>
                <p className='text-xs text-gray-400'>
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span className='text-yellow-600'>{'⭐'.repeat(rating)}</span>
            </div>

            <p className='text-gray-700 mt-2'>{r.comment}</p>

            {canDelete && (
              <button
                onClick={() => {
                  if (window.confirm('Delete this review?')) {
                    remove(r.id)
                  }
                }}
                className='text-red-600 text-sm mt-2 underline'
              >
                Delete
              </button>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

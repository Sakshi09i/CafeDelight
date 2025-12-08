import { useReviews } from '../stores/reviews'
import { motion } from 'framer-motion'

export default function ReviewList() {
  const reviews = useReviews((s) => s.reviews)
  const remove = useReviews((s) => s.removeReview)

  return (
    <div className='space-y-4 mt-6'>
      {reviews.length === 0 ? (
        <p className='text-gray-600'>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='p-4 rounded-xl border shadow-sm bg-white'
          >
            <div className='flex justify-between'>
              <h4 className='font-semibold'>{r.name}</h4>
              <span className='text-yellow-600'>{'⭐'.repeat(r.rating)}</span>
            </div>

            <p className='text-gray-700 mt-1'>{r.comment}</p>

            <button
              onClick={() => {
                if (window.confirm('Delete this review?')) remove(r.id)
              }}
              className='text-red-600 text-sm mt-2 underline'
            >
              Delete
            </button>
          </motion.div>
        ))
      )}
    </div>
  )
}

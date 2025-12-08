import AddReviewForm from '../components/AddReviewForm'
import ReviewList from '../components/ReviewList'

export default function ReviewsPage() {
  return (
    <div className='container mx-auto py-10'>
      <AddReviewForm />
      <ReviewList />
    </div>
  )
}

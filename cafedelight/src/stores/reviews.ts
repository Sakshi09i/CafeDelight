import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Review = {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

type ReviewInput = {
  name: string
  rating: number
  comment: string
}

type ReviewsState = {
  reviews: Review[]
  addReview: (input: ReviewInput) => void
  removeReview: (id: string) => void
}

const noopStorage: Storage = {
  length: 0,
  clear: () => undefined,
  getItem: () => null,
  key: () => null,
  removeItem: () => undefined,
  setItem: () => undefined,
}

export const useReviews = create<ReviewsState>()(
  persist(
    (set) => ({
      reviews: [],
      addReview: ({ name, rating, comment }) =>
        set((state) => ({
          reviews: [
            {
              id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
              name: name.trim(),
              rating,
              comment: comment.trim(),
              createdAt: new Date().toISOString(),
            },
            ...state.reviews,
          ],
        })),
      removeReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== id),
        })),
    }),
    {
      name: 'cafedelight-reviews',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : noopStorage)),
    },
  ),
)



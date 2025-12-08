import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useReviews } from '../stores/reviews'

export function HomePage() {
  const heroImages = useMemo(
    () => [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527169402691-feff5539e52c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop',
    ],
    []
  )
  const [heroIdx, setHeroIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroImages.length),
      4000
    )
    return () => clearInterval(t)
  }, [heroImages.length])
  const offers = useMemo(
    () => [
      {
        title: 'Festive Combo',
        desc: 'Latte + Brownie 20% OFF',
        color: 'from-coffee-200 to-coffee-400',
        img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Happy Hours',
        desc: '3–6 PM: Buy 1 Get 1 on Chai',
        color: 'from-coffee-100 to-coffee-300',
        img: 'https://images.unsplash.com/photo-1542444459-db67a4bd4b88?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Student Deal',
        desc: 'Show ID for flat ₹30 OFF',
        color: 'from-coffee-300 to-coffee-500',
        img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    []
  )
  const [offerIdx, setOfferIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setOfferIdx((i) => (i + 1) % offers.length),
      3000
    )
    return () => clearInterval(t)
  }, [offers.length])
  const reviews = useReviews((s) => s.reviews)
  const averageRating = useMemo(
    () =>
      reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0,
    [reviews]
  )
  const topReviews = useMemo(
    () =>
      [...reviews]
        .sort((a, b) => {
          if (b.rating === a.rating) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          }
          return b.rating - a.rating
        })
        .slice(0, 3),
    [reviews]
  )
  const renderStars = (rating: number) => (
    <div
      className='flex items-center gap-0.5 text-mango'
      aria-label={`${rating} star rating`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>{star <= rating ? '★' : '☆'}</span>
      ))}
    </div>
  )
  return (
    <div className='container-px mx-auto'>
      <section className='grid md:grid-cols-2 gap-8 items-center py-12'>
        <div className='space-y-4'>
          <div className='text-4xl md:text-5xl font-display text-saffron'>
            Café Delight
          </div>
          <div className='text-warmbrown'>Sip. Relax. Delight.</div>
          <p className='text-coffee-700 max-w-prose'>
            Welcome to your neighborhood spot for artisanal coffee, handcrafted
            teas, and freshly baked treats.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <NavLink to='/menu' className='btn-primary inline-block'>
              Order Now
            </NavLink>
          </motion.div>
        </div>
        <div className='relative'>
          <motion.img
            key={heroImages[heroIdx]}
            src={heroImages[heroIdx]}
            alt='Cafe highlight'
            initial={{ opacity: 0.0 }}
            animate={{ opacity: 1.0 }}
            transition={{ duration: 0.8 }}
            className='rounded-2xl shadow-2xl w-full object-cover max-h-[24rem]'
          />
        </div>
      </section>

      <section className='py-6'>
        <h2 className='text-2xl font-display mb-3 text-maroon'>
          Special Offers
        </h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[0, 1, 2].map((i) => {
            const offer = offers[(offerIdx + i) % offers.length]
            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden bg-gradient-to-r ${offer.color}`}
              >
                <div className='grid grid-cols-2 items-stretch h-40'>
                  <div className='p-4 flex flex-col justify-center'>
                    <div className='text-lg font-semibold text-coffee-900'>
                      {offer.title}
                    </div>
                    <div className='text-coffee-800 text-sm'>{offer.desc}</div>
                  </div>
                  <img
                    src={offer.img}
                    alt={offer.title}
                    className='w-full h-40 object-cover'
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className='py-10'>
        <h2 className='text-2xl font-display mb-4'>Best Sellers</h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[
            {
              name: 'Cappuccino',
              img: 'https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=1200&auto=format&fit=crop',
              price: 180,
            },
            {
              name: 'Latte',
              img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop',
              price: 170,
            },
            {
              name: 'Masala Chai',
              img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1200&auto=format&fit=crop',
              price: 100,
            },
            {
              name: 'Brownie',
              img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=1200&auto=format&fit=crop',
              price: 130,
            },
          ].map((card) => (
            <div
              key={card.name}
              className='bg-white rounded-xl overflow-hidden shadow border border-coffee-100'
            >
              <img
                src={card.img}
                alt={card.name}
                className='w-full h-40 object-cover'
              />
              <div className='p-4 flex items-center justify-between'>
                <div className='font-medium'>{card.name}</div>
                <div className='text-coffee-700'>₹{card.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='py-10'>
        <div className='flex flex-wrap items-center justify-between gap-6'>
          <div>
            <h2 className='text-2xl font-display mb-1'>Community voice</h2>
            <p className='text-coffee-600'>
              Live ratings gathered from our guests
            </p>
          </div>
          <div className='flex gap-4'>
            <div className='rounded-2xl border border-coffee-100 bg-white px-5 py-3 text-center shadow-sm'>
              <div className='text-3xl font-semibold text-coffee-900'>
                {reviews.length ? averageRating.toFixed(1) : '–'}
              </div>
              <div className='text-sm text-coffee-600'>Average rating</div>
              <div className='mt-1'>
                {renderStars(Math.round(averageRating))}
              </div>
            </div>
            <div className='rounded-2xl border border-coffee-100 bg-white px-5 py-3 text-center shadow-sm'>
              <div className='text-3xl font-semibold text-coffee-900'>
                {reviews.length}
              </div>
              <div className='text-sm text-coffee-600'>Total reviews</div>
              <div className='mt-1 text-xs text-coffee-500'>
                Updated in real-time
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 grid gap-6 md:grid-cols-3'>
          {topReviews.length === 0 && (
            <div className='rounded-2xl border border-coffee-100 bg-white p-6 text-coffee-600 shadow-sm md:col-span-3'>
              No reviews yet. Head to the Reviews tab to share your first
              experience!
            </div>
          )}
          {topReviews.map((review) => (
            <article
              key={review.id}
              className='rounded-2xl border border-coffee-100 bg-white p-6 shadow-sm'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <div className='font-semibold text-coffee-900'>
                    {review.name}
                  </div>
                  <div className='text-xs text-coffee-500'>
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className='mt-3 text-coffee-700'>{review.comment}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='py-10'>
        <h2 className='text-2xl font-display mb-4'>Find your perfect corner</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='bg-white rounded-xl border border-coffee-100 p-5'>
            <div className='font-semibold mb-2'>For Couples</div>
            <p className='text-coffee-700 mb-3'>
              Candle-lit evenings, shared desserts, and cozy two-seaters.
            </p>
            <img
              src='https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop'
              alt='Couple'
              className='rounded-md object-cover h-40 w-full'
            />
          </div>
          <div className='bg-white rounded-xl border border-coffee-100 p-5'>
            <div className='font-semibold mb-2'>For Students</div>
            <p className='text-coffee-700 mb-3'>
              Power outlets, study-friendly playlists, and budget combos.
            </p>
            <img
              src='https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop'
              alt='Student'
              className='rounded-md object-cover h-40 w-full'
            />
          </div>
          <div className='bg-white rounded-xl border border-coffee-100 p-5'>
            <div className='font-semibold mb-2'>For Seniors</div>
            <p className='text-coffee-700 mb-3'>
              Warm service, quiet mornings, and light bites with tea.
            </p>
            <img
              src='https://images.unsplash.com/photo-1603635835343-3ad0709b71b8?q=80&w=1200&auto=format&fit=crop'
              alt='Senior'
              className='rounded-md object-cover h-40 w-full'
            />
          </div>
        </div>
      </section>
    </div>
  )
}



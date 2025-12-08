import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu'
import { useCart } from '../stores/cart'
import type { MenuItem } from '../data/menu'

export function MenuPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] =
    useState<(typeof MENU_CATEGORIES)[number]>('All')
  const [price, setPrice] = useState(400)
  const [minRating, setMinRating] = useState(0)


  const results = useMemo(() => {
    return MENU_ITEMS.filter(
      (item) =>
        (category === 'All' || item.category === category) &&
        item.price <= price &&
        item.name.toLowerCase().includes(query.toLowerCase()) &&
        item.rating >= minRating
    )
  }, [query, category, price, minRating])

  return (
    <div className="container-px mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
        <h2 className="text-2xl font-display">Our Menu</h2>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">

          {/* ✅ SEARCH */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search menu items"
            className="w-full md:w-64 border border-coffee-200 rounded-md px-3 py-2 bg-white"
          />

          {/* ✅ CATEGORY */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            aria-label="Filter by category"
            className="border border-coffee-200 rounded-md px-3 py-2 bg-white"
          >
            {MENU_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* ✅ PRICE RANGE */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-coffee-700">Up to ₹{price}</span>
            <input
              type="range"
              min={50}
              max={400}
              value={price}
              aria-label="Price range"
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>

          {/* ✅ RATING RANGE */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-coffee-700">
              Min rating {minRating}★
            </span>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={minRating}
              aria-label="Minimum rating"
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* ⭐ SPECIALS */}
      <div className="mt-6">
        <h3 className="text-xl font-display text-maroon mb-2">
          Today’s Specials
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results
            .filter((r) => r.category === 'Specials')
            .slice(0, 3)
            .map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
        </div>
      </div>

      {/* ⭐ ALL ITEMS */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results
          .filter((r) => r.category !== 'Specials')
          .map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  )
}

/* ------------------------------------------ */
/* ✅ MENU CARD */
/* ------------------------------------------ */

function MenuCard({ item }: { item: MenuItem }) {
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl overflow-hidden shadow border border-coffee-100"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-semibold text-charcoal">{item.name}</div>
            {item.description && (
              <div className="text-sm text-warmbrown">{item.description}</div>
            )}
          </div>

          <div className="text-peacock">
            {'★'.repeat(Math.round(item.rating))}
            <span className="text-coffee-600 ml-1">
              ({item.rating.toFixed(1)})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {item.badges?.map((b) => (
            <span
              key={b}
              className={`text-xs px-2 py-0.5 rounded ${
                b === 'Best Seller'
                  ? 'bg-maroon text-cream'
                  : b === "Chef's Choice"
                  ? 'bg-turmeric text-charcoal'
                  : b === 'Spicy'
                  ? 'bg-peacock text-white'
                  : 'bg-mango text-charcoal'
              }`}
            >
              {b}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-coffee-700 font-medium">₹{item.price}</div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              aria-label="Quantity"
              className="w-16 border rounded px-2 py-1"
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, parseInt(e.target.value || '1')))
              }
            />

            <button
              className="btn-primary"
              onClick={() => {
                for (let i = 0; i < qty; i++) add(item)
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

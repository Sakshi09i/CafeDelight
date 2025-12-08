export type MenuCategory = 'Drinks' | 'Snacks' | 'Desserts' | 'Specials'

export type MenuItem = {
  id: string
  name: string
  category: MenuCategory
  price: number
  image: string
  rating: number
  description?: string
  badges?: Array<'Best Seller' | 'Spicy' | "Chef's Choice" | 'New'>
}

export const MENU_ITEMS: MenuItem[] = [
  // ------------------------
  // DRINKS
  // ------------------------
  {
    id: 'd001',
    name: 'Espresso',
    category: 'Drinks',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop',
    rating: 4.5,
    description: 'Rich and bold single shot.',
    badges: ["Chef's Choice"],
  },
  {
    id: 'd002',
    name: 'Cappuccino',
    category: 'Drinks',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    description: 'Foamy, creamy classic beverage.',
    badges: ['Best Seller'],
  },
  {
    id: 'd003',
    name: 'Latte',
    category: 'Drinks',
    price: 170,
    image:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    description: 'Smooth and milk-forward brew.',
  },
  {
    id: 'd004',
    name: 'Cold Coffee',
    category: 'Drinks',
    price: 160,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    rating: 4.5,
    description: 'Chilled and refreshing.',
  },
  {
    id: 'd005',
    name: 'Masala Chai',
    category: 'Drinks',
    price: 100,
    image:
      'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    description: 'Traditional spiced Indian tea.',
    badges: ['Best Seller'],
  },
  {
    id: 'd006',
    name: 'Lemon Iced Tea',
    category: 'Drinks',
    price: 110,
    image:
      'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1200&auto=format&fit=crop',
    rating: 4.3,
    description: 'Cool and zesty summer drink.',
  },

  // ------------------------
  // SNACKS
  // ------------------------
  {
    id: 's001',
    name: 'Veg Sandwich',
    category: 'Snacks',
    price: 150,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop',
    rating: 4.3,
    description: 'Fresh veggies with a house spread.',
  },
  {
    id: 's002',
    name: 'Garlic Bread',
    category: 'Snacks',
    price: 120,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    rating: 4.1,
    description: 'Buttery, herby toasted slices.',
  },
  {
    id: 's003',
    name: 'Paneer Tikka Sandwich',
    category: 'Snacks',
    price: 180,
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
    rating: 4.4,
    description: 'Grilled sandwich stuffed with spicy paneer.',
    badges: ['Spicy'],
  },
  {
    id: 's004',
    name: 'French Fries',
    category: 'Snacks',
    price: 130,
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop',
    rating: 4.2,
    description: 'Crispy golden fries.',
  },

  // ------------------------
  // DESSERTS
  // ------------------------
  {
    id: 'ds001',
    name: 'Chocolate Brownie',
    category: 'Desserts',
    price: 130,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    description: 'Fudgy and decadent treat.',
    badges: ['Best Seller'],
  },
  {
    id: 'ds002',
    name: 'Cheesecake',
    category: 'Desserts',
    price: 220,
    image:
      'https://images.unsplash.com/photo-1511911063855-2bf39afa5b2c?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    description: 'Classic New York–style cheesecake.',
  },
  {
    id: 'ds003',
    name: 'Gulab Jamun Cheesecake',
    category: 'Desserts',
    price: 240,
    image:
      'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    description: 'Fusion of Indian dessert & cheesecake.',
    badges: ['Best Seller'],
  },
  {
    id: 'ds004',
    name: 'Tiramisu',
    category: 'Desserts',
    price: 230,
    image:
      'https://images.unsplash.com/photo-1602743059441-c9e1e4d8a6b8?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    description: 'Classic Italian layered dessert.',
  },

  // ------------------------
  // SPECIALS
  // ------------------------
  {
    id: 'sp001',
    name: 'Monsoon Pakora Platter',
    category: 'Specials',
    price: 199,
    image:
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1200&auto=format&fit=crop',
    rating: 4.6,
    description: 'Crispy assorted pakoras served hot.',
    badges: ['New'],
  },
  {
    id: 'sp002',
    name: 'Saffron Kulfi Falooda',
    category: 'Specials',
    price: 210,
    image:
      'https://images.archanaskitchen.com/archanaskitchen/recipe/kesar-pista-falooda-recipe/1.jpg',
    rating: 4.7,
    description: 'Royal dessert with saffron and pistachio.',
    badges: ['New', "Chef's Choice"],
  },
]

export const MENU_CATEGORIES: Array<'All' | MenuCategory> = [
  'All',
  'Drinks',
  'Snacks',
  'Desserts',
  'Specials',
]

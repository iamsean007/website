export interface Dish {
  id: string
  name: string
  tagline: string
  description: string
  popularity: number
  image: string
  gradient: string
  accent: string
}

export const dishes: Dish[] = [
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    tagline: 'Your story in every bite',
    description: 'Clay-oven chicken swimming in velvet tomato-butter curry',
    popularity: 98,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%)',
    accent: '#f97316',
  },
  {
    id: 'biryani',
    name: 'Hyderabadi Biryani',
    tagline: 'Layered love, sealed with saffron',
    description: 'Fragrant basmati, slow-cooked lamb, whole spices',
    popularity: 94,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d29a?w=800&q=80',
    gradient: 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)',
    accent: '#d97706',
  },
  {
    id: 'paneer-tikka',
    name: 'Paneer Tikka',
    tagline: 'Charred edges, soft heart',
    description: 'Hand-cut cottage cheese, tandoor-smoked perfection',
    popularity: 89,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
    gradient: 'linear-gradient(135deg, #166534 0%, #15803d 50%, #22c55e 100%)',
    accent: '#22c55e',
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    tagline: 'Midnight comfort, slow-simmered',
    description: 'Black lentils, cream, butter — 18 hours of patience',
    popularity: 91,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
    gradient: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #92400e 100%)',
    accent: '#92400e',
  },
  {
    id: 'korma',
    name: 'Royal Korma',
    tagline: 'Silk and spice, Mughal elegance',
    description: 'Cashew-cream sauce, tender chicken, golden saffron',
    popularity: 87,
    image: 'https://images.unsplash.com/photo-1585937421612-70a08c3568be?w=800&q=80',
    gradient: 'linear-gradient(135deg, #854d0e 0%, #a16207 50%, #ca8a04 100%)',
    accent: '#ca8a04',
  },
]

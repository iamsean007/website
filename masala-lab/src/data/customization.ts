export interface ChickenOption {
  id: string
  name: string
  cut: string
  description: string
  color: string
  glow: string
  emoji: string
}

export interface FlavorSlider {
  id: string
  label: string
  icon: string
  defaultValue: number
}

export const chickenOptions: ChickenOption[] = [
  {
    id: 'tandoori',
    name: 'Smoky Tandoori',
    cut: 'Drumstick',
    description: 'Charred edges, deep smoke, bold red marinade',
    color: '#dc2626',
    glow: 'rgba(220, 38, 38, 0.5)',
    emoji: '🔥',
  },
  {
    id: 'garlicky',
    name: 'Garlicky',
    cut: 'Thigh',
    description: 'Roasted garlic crust, aromatic and punchy',
    color: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.5)',
    emoji: '🧄',
  },
  {
    id: 'spicy',
    name: 'Spicy',
    cut: 'Drumstick',
    description: 'Kashmiri chili heat, layered fire',
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.6)',
    emoji: '🌶️',
  },
  {
    id: 'buttery',
    name: 'Buttery',
    cut: 'Breast',
    description: 'Golden butter baste, melt-in-mouth tender',
    color: '#fcd34d',
    glow: 'rgba(252, 211, 77, 0.5)',
    emoji: '🧈',
  },
  {
    id: 'herb',
    name: 'Herb-Marinated',
    cut: 'Thigh',
    description: 'Fresh mint, cilantro, green chili kiss',
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.5)',
    emoji: '🌿',
  },
  {
    id: 'classic',
    name: 'Classic Clay Oven',
    cut: 'Drumstick',
    description: 'Traditional tandoor, yogurt-marinated perfection',
    color: '#ea580c',
    glow: 'rgba(234, 88, 12, 0.5)',
    emoji: '🏺',
  },
]

export const flavorSliders: FlavorSlider[] = [
  { id: 'buttery', label: 'Buttery', icon: '🧈', defaultValue: 70 },
  { id: 'garlicky', label: 'Garlicky', icon: '🧄', defaultValue: 45 },
  { id: 'creamy', label: 'Creamy', icon: '🥛', defaultValue: 65 },
  { id: 'smoky', label: 'Smoky', icon: '💨', defaultValue: 40 },
  { id: 'tangy', label: 'Tangy', icon: '🍋', defaultValue: 35 },
  { id: 'spicy', label: 'Spicy', icon: '🌶️', defaultValue: 55 },
]

export interface CustomizationState {
  chickenIndex: number
  flavors: Record<string, number>
  dishName: string
  side: 'rice' | 'naan'
}

export function createDefaultCustomization(): CustomizationState {
  return {
    chickenIndex: 0,
    flavors: Object.fromEntries(flavorSliders.map((f) => [f.id, f.defaultValue])),
    dishName: '',
    side: 'rice',
  }
}

export function generateDishNumber(): number {
  return Math.floor(200 + Math.random() * 800)
}

export function computeNutrition(flavors: Record<string, number>, chickenIndex: number) {
  const base = { protein: 38, calories: 620, fat: 45, spice: 5, cream: 50, richness: 55 }
  const f = flavors
  return {
    protein: Math.round(base.protein + chickenIndex * 2 + (f.creamy ?? 0) * 0.04),
    calories: Math.round(base.calories + (f.buttery ?? 0) * 1.2 + (f.creamy ?? 0) * 0.8),
    fat: Math.min(95, Math.round(base.fat + (f.buttery ?? 0) * 0.35 + (f.creamy ?? 0) * 0.25)),
    spice: Math.min(10, Math.round((base.spice + (f.spicy ?? 0) * 0.06) * 10) / 10),
    cream: Math.min(100, Math.round(base.cream + (f.creamy ?? 0) * 0.4 + (f.buttery ?? 0) * 0.15)),
    richness: Math.min(100, Math.round(base.richness + (f.buttery ?? 0) * 0.3 + (f.smoky ?? 0) * 0.1)),
  }
}

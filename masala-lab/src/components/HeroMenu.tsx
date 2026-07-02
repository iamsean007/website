import { motion } from 'framer-motion'
import { dishes, type Dish } from '../data/dishes'
import './HeroMenu.css'

interface HeroMenuProps {
  onSelectDish: (dishId: string) => void
}

export function HeroMenu({ onSelectDish }: HeroMenuProps) {
  return (
    <div className="hero-menu">
      <header className="hero-menu__header">
        <div className="hero-menu__brand">
          <span className="hero-menu__logo">🍛</span>
          <div>
            <h1 className="hero-menu__title">Masala Lab</h1>
            <p className="hero-menu__subtitle">Five dishes. Infinite you.</p>
          </div>
        </div>
        <div className="hero-menu__community">
          <span className="hero-menu__live-dot" />
          2.4k creating now
        </div>
      </header>

      <div className="hero-menu__scroll">
        {dishes.map((dish, i) => (
          <DishCard key={dish.id} dish={dish} index={i} onSelect={() => onSelectDish(dish.id)} />
        ))}
      </div>
    </div>
  )
}

function DishCard({
  dish,
  index,
  onSelect,
}: {
  dish: Dish
  index: number
  onSelect: () => void
}) {
  return (
    <motion.article
      className="dish-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="dish-card__image-wrap">
        <img src={dish.image} alt={dish.name} className="dish-card__image" loading={index < 2 ? 'eager' : 'lazy'} />
        <div className="dish-card__gradient" style={{ background: dish.gradient }} />
        <div className="dish-card__steam" aria-hidden="true" />
      </div>

      <div className="dish-card__content">
        <div className="dish-card__meta">
          <span className="dish-card__popularity">
            <span className="dish-card__fire">🔥</span>
            {dish.popularity}%
          </span>
          <span className="dish-card__tag">Signature #{index + 1}</span>
        </div>

        <h2 className="dish-card__name">{dish.name}</h2>
        <p className="dish-card__tagline">{dish.tagline}</p>
        <p className="dish-card__desc">{dish.description}</p>

        <motion.button
          type="button"
          className="dish-card__cta"
          style={{ background: dish.gradient }}
          whileTap={{ scale: 0.96 }}
          onClick={onSelect}
        >
          Create Yours
          <span className="dish-card__cta-arrow">→</span>
        </motion.button>
      </div>
    </motion.article>
  )
}

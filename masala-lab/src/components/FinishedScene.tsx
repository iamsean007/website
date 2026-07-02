import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  chickenOptions,
  generateDishNumber,
  type CustomizationState,
} from '../data/customization'
import { NutritionPanel } from './NutritionPanel'
import './FinishedScene.css'

interface FinishedSceneProps {
  state: CustomizationState
  onNameChange: (name: string) => void
  onSideChange: (side: 'rice' | 'naan') => void
}

export function FinishedScene({ state, onNameChange, onSideChange }: FinishedSceneProps) {
  const dishNumber = useMemo(() => generateDishNumber(), [])
  const chicken = chickenOptions[state.chickenIndex]

  return (
    <div className="finished-scene">
      <motion.div
        className="finished-scene__celebration"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <p className="finished-scene__eyebrow">Scene 03 · Your Masterpiece</p>
        <h2 className="finished-scene__title">
          Butter Chicken <span className="finished-scene__number">#{dishNumber}</span>
        </h2>
      </motion.div>

      <motion.div
        className="finished-scene__plate"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="finished-scene__bowl">
          <img
            src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80"
            alt="Your butter chicken creation"
            className="finished-scene__food-img"
          />
          <div className="finished-scene__steam" aria-hidden="true" />
          <div className="finished-scene__badge" style={{ borderColor: chicken.color }}>
            {chicken.emoji} {chicken.name}
          </div>
        </div>

        <div className="finished-scene__sides">
          <button
            type="button"
            className={`finished-scene__side ${state.side === 'rice' ? 'finished-scene__side--active' : ''}`}
            onClick={() => onSideChange('rice')}
          >
            🍚 Basmati Rice
          </button>
          <button
            type="button"
            className={`finished-scene__side ${state.side === 'naan' ? 'finished-scene__side--active' : ''}`}
            onClick={() => onSideChange('naan')}
          >
            🫓 Warm Naan
          </button>
        </div>
      </motion.div>

      <motion.div
        className="finished-scene__naming"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <label className="finished-scene__name-label" htmlFor="dish-name">
          Name your creation
        </label>
        <input
          id="dish-name"
          type="text"
          className="finished-scene__name-input"
          placeholder="e.g. Midnight Smoke Bowl"
          value={state.dishName}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={40}
        />
        <p className="finished-scene__community-hint">
          Maybe next week, everyone's eating it.
        </p>
      </motion.div>

      <NutritionPanel flavors={state.flavors} chickenIndex={state.chickenIndex} />

      <div className="finished-scene__actions">
        <motion.button
          type="button"
          className="finished-scene__share"
          whileTap={{ scale: 0.96 }}
        >
          Share Creation
        </motion.button>
        <motion.button
          type="button"
          className="finished-scene__order"
          whileTap={{ scale: 0.96 }}
        >
          Add to Order · $18
        </motion.button>
      </div>
    </div>
  )
}

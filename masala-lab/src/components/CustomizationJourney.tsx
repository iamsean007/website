import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { chickenOptions, flavorSliders, type CustomizationState } from '../data/customization'
import { FlavorSliderControl } from './FlavorSliderControl'
import { FinishedScene } from './FinishedScene'
import './CustomizationJourney.css'

interface CustomizationJourneyProps {
  onBack: () => void
}

export function CustomizationJourney({ onBack }: CustomizationJourneyProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CustomizationState>(() => ({
    chickenIndex: 0,
    flavors: Object.fromEntries(flavorSliders.map((f) => [f.id, f.defaultValue])),
    dishName: '',
    side: 'rice',
  }))
  const [activeScene, setActiveScene] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollTop = el.scrollTop
      const sceneHeight = el.clientHeight
      const scene = Math.round(scrollTop / sceneHeight)
      setActiveScene(Math.min(scene, 2))
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  const chicken = chickenOptions[state.chickenIndex]

  return (
    <div className="journey">
      <nav className="journey__nav">
        <button type="button" className="journey__back" onClick={onBack} aria-label="Back to menu">
          ←
        </button>
        <div className="journey__progress">
          {['Chicken', 'Sauce', 'Yours'].map((label, i) => (
            <div key={label} className={`journey__step ${i <= activeScene ? 'journey__step--active' : ''}`}>
              <span className="journey__step-dot" />
              <span className="journey__step-label">{label}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="journey__scroll" ref={scrollRef}>
        {/* Scene 1: Chicken */}
        <section className="journey__scene journey__scene--chicken">
          <div className="scene-chicken">
            <motion.p
              className="scene-chicken__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Scene 01 · The Foundation
            </motion.p>
            <h2 className="scene-chicken__title">Choose Your Chicken</h2>
            <p className="scene-chicken__subtitle">Swipe to explore cuts & marinades</p>

            <ChickenHero
              option={chicken}
              onSwipe={(dir) => {
                setState((s) => ({
                  ...s,
                  chickenIndex: Math.max(0, Math.min(chickenOptions.length - 1, s.chickenIndex + dir)),
                }))
              }}
            />

            <div className="scene-chicken__carousel">
              <button
                type="button"
                className="scene-chicken__arrow"
                onClick={() =>
                  setState((s) => ({ ...s, chickenIndex: Math.max(0, s.chickenIndex - 1) }))
                }
                disabled={state.chickenIndex === 0}
              >
                ‹
              </button>

              <div className="scene-chicken__options">
                {chickenOptions.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    type="button"
                    className={`scene-chicken__option ${i === state.chickenIndex ? 'scene-chicken__option--active' : ''}`}
                    onClick={() => setState((s) => ({ ...s, chickenIndex: i }))}
                    whileTap={{ scale: 0.95 }}
                    style={
                      i === state.chickenIndex
                        ? { borderColor: opt.color, boxShadow: `0 0 24px ${opt.glow}` }
                        : undefined
                    }
                  >
                    <span className="scene-chicken__option-emoji">{opt.emoji}</span>
                    <span className="scene-chicken__option-name">{opt.name}</span>
                    <span className="scene-chicken__option-cut">{opt.cut}</span>
                  </motion.button>
                ))}
              </div>

              <button
                type="button"
                className="scene-chicken__arrow"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    chickenIndex: Math.min(chickenOptions.length - 1, s.chickenIndex + 1),
                  }))
                }
                disabled={state.chickenIndex === chickenOptions.length - 1}
              >
                ›
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={chicken.id}
                className="scene-chicken__desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {chicken.description}
              </motion.p>
            </AnimatePresence>

            <motion.div
              className="journey__scroll-hint"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Scroll to craft your sauce ↓
            </motion.div>
          </div>
        </section>

        {/* Scene 2: Sauce */}
        <section className="journey__scene journey__scene--sauce">
          <div className="scene-sauce">
            <motion.p
              className="scene-sauce__eyebrow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Scene 02 · The Soul
            </motion.p>
            <h2 className="scene-sauce__title">Craft Your Sauce</h2>
            <p className="scene-sauce__subtitle">Drag sliders — watch it transform</p>

            <SauceVisual flavors={state.flavors} />

            <div className="scene-sauce__sliders">
              {flavorSliders.map((slider) => (
                <FlavorSliderControl
                  key={slider.id}
                  slider={slider}
                  value={state.flavors[slider.id]}
                  onChange={(v) =>
                    setState((s) => ({ ...s, flavors: { ...s.flavors, [slider.id]: v } }))
                  }
                />
              ))}
            </div>

            <motion.div
              className="journey__scroll-hint"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Scroll to see your creation ↓
            </motion.div>
          </div>
        </section>

        {/* Scene 3: Finished */}
        <section className="journey__scene journey__scene--finished">
          <FinishedScene
            state={state}
            onNameChange={(name) => setState((s) => ({ ...s, dishName: name }))}
            onSideChange={(side) => setState((s) => ({ ...s, side }))}
          />
        </section>
      </div>
    </div>
  )
}

function ChickenHero({
  option,
  onSwipe,
}: {
  option: (typeof chickenOptions)[0]
  onSwipe: (dir: number) => void
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-150, 0, 150], [-8, 0, 8])
  const scale = useTransform(x, [-150, 0, 150], [0.92, 1, 0.92])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) onSwipe(1)
    else if (info.offset.x > 50) onSwipe(-1)
  }

  return (
    <div className="chicken-hero">
      <div className="chicken-hero__glow" style={{ background: option.glow }} />
      <div className="chicken-hero__oven" aria-hidden="true">
        <div className="chicken-hero__flames" />
      </div>

      <motion.div
        className="chicken-hero__drumstick"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        style={{ x, rotate, scale }}
        onDragEnd={handleDragEnd}
        key={option.id}
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div
          className="chicken-hero__meat"
          style={{
            background: `radial-gradient(ellipse at 40% 30%, ${option.color}ee, ${option.color}88 40%, #5c2e0a 100%)`,
            boxShadow: `0 20px 60px ${option.glow}, inset -10px -10px 30px rgba(0,0,0,0.3)`,
          }}
        >
          <div className="chicken-hero__bone" />
          <div className="chicken-hero__char" />
          <div className="chicken-hero__juice" />
        </div>
        <div className="chicken-hero__steam-wisp" />
        <div className="chicken-hero__steam-wisp chicken-hero__steam-wisp--2" />
      </motion.div>

      <div className="chicken-hero__swipe-hint">
        <span>← swipe →</span>
      </div>
    </div>
  )
}

function SauceVisual({ flavors }: { flavors: Record<string, number> }) {
  const buttery = flavors.buttery ?? 0
  const garlicky = flavors.garlicky ?? 0
  const creamy = flavors.creamy ?? 0
  const smoky = flavors.smoky ?? 0
  const tangy = flavors.tangy ?? 0
  const spicy = flavors.spicy ?? 0

  const baseHue = 15 + spicy * 0.08
  const saturation = 70 + spicy * 0.2
  const lightness = 45 - smoky * 0.1 + creamy * 0.08

  return (
    <div className="sauce-visual">
      <motion.div
        className="sauce-visual__bowl"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <div
          className="sauce-visual__curry"
          style={{
            background: `linear-gradient(160deg, 
              hsl(${baseHue}, ${saturation}%, ${lightness + 10}%) 0%,
              hsl(${baseHue - 5}, ${saturation + 10}%, ${lightness}%) 50%,
              hsl(${baseHue - 10}, ${saturation}%, ${lightness - 8}%) 100%)`,
          }}
        >
          {/* Cream swirl */}
          <motion.div
            className="sauce-visual__cream"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            style={{ opacity: creamy / 100 }}
          />

          {/* Butter pat */}
          <motion.div
            className="sauce-visual__butter"
            style={{ opacity: buttery / 100, scale: 0.5 + buttery / 200 }}
          />

          {/* Garlic cloves */}
          {[...Array(Math.ceil(garlicky / 25))].map((_, i) => (
            <motion.span
              key={i}
              className="sauce-visual__garlic"
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + (i % 2) * 20}%`,
                opacity: garlicky / 100,
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.3 }}
            >
              🧄
            </motion.span>
          ))}

          {/* Chili oil */}
          <div
            className="sauce-visual__chili-oil"
            style={{ opacity: spicy / 120, transform: `scale(${0.8 + spicy / 200})` }}
          />

          {/* Smoke */}
          <motion.div
            className="sauce-visual__smoke"
            style={{ opacity: smoky / 100 }}
            animate={{ y: [-10, -30], opacity: [smoky / 150, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />

          {/* Herbs */}
          <motion.div
            className="sauce-visual__herbs"
            style={{ opacity: 0.3 + tangy / 200 }}
          >
            🌿
          </motion.div>
        </div>
      </motion.div>

      <div className="sauce-visual__gloss" />
    </div>
  )
}

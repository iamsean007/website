import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { FlavorSlider } from '../data/customization'
import './FlavorSliderControl.css'

interface FlavorSliderControlProps {
  slider: FlavorSlider
  value: number
  onChange: (value: number) => void
}

export function FlavorSliderControl({ slider, value, onChange }: FlavorSliderControlProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const handlePointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current
    if (!track) return

    const update = (clientX: number) => {
      const rect = track.getBoundingClientRect()
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
      onChange(Math.round(pct))
    }

    update(e.clientX)

    const onMove = (ev: PointerEvent) => update(ev.clientX)
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const intensity = value / 100

  return (
    <div className="flavor-slider">
      <div className="flavor-slider__header">
        <span className="flavor-slider__icon">{slider.icon}</span>
        <span className="flavor-slider__label">{slider.label}</span>
        <span className="flavor-slider__value">{value}%</span>
      </div>

      <div
        ref={trackRef}
        className="flavor-slider__track"
        onPointerDown={handlePointerDown}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={slider.label}
      >
        <div
          className="flavor-slider__fill"
          style={{
            width: `${value}%`,
            opacity: 0.4 + intensity * 0.6,
          }}
        />
        <motion.div
          className="flavor-slider__thumb"
          style={{ left: `calc(${value}% - 14px)` }}
          whileTap={{ scale: 1.2 }}
        />
      </div>
    </div>
  )
}

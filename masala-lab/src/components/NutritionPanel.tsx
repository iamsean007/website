import { computeNutrition } from '../data/customization'
import './NutritionPanel.css'

interface NutritionPanelProps {
  flavors: Record<string, number>
  chickenIndex: number
}

export function NutritionPanel({ flavors, chickenIndex }: NutritionPanelProps) {
  const n = computeNutrition(flavors, chickenIndex)

  const metrics = [
    { label: 'Protein', value: `${n.protein}g`, bar: null },
    { label: 'Calories', value: `${n.calories}`, bar: null },
    { label: 'Fat Level', value: null, bar: n.fat, barLabel: n.fat > 65 ? 'Rich' : n.fat > 40 ? 'Medium' : 'Light' },
    { label: 'Spice', value: `${n.spice}/10`, bar: n.spice * 10, icons: '🌶️'.repeat(Math.ceil(n.spice)) },
    { label: 'Cream Level', value: null, bar: n.cream, barLabel: n.cream > 70 ? 'Luxurious' : n.cream > 45 ? 'Balanced' : 'Light' },
    { label: 'Richness', value: null, bar: n.richness, barLabel: n.richness > 70 ? 'Decadent' : n.richness > 45 ? 'Comfort' : 'Clean' },
  ]

  return (
    <div className="nutrition-panel">
      <div className="nutrition-panel__header">
        <span className="nutrition-panel__icon">✦</span>
        <span>Your Creation Profile</span>
      </div>

      <div className="nutrition-panel__grid">
        {metrics.map((m) => (
          <div key={m.label} className="nutrition-panel__metric">
            <span className="nutrition-panel__metric-label">{m.label}</span>
            {m.value && <span className="nutrition-panel__metric-value">{m.value}</span>}
            {m.icons && <span className="nutrition-panel__metric-icons">{m.icons}</span>}
            {m.bar !== null && m.bar !== undefined && (
              <div className="nutrition-panel__bar-wrap">
                <div className="nutrition-panel__bar">
                  <div className="nutrition-panel__bar-fill" style={{ width: `${m.bar}%` }} />
                </div>
                {m.barLabel && <span className="nutrition-panel__bar-label">{m.barLabel}</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="nutrition-panel__disclaimer">Estimates based on your customizations</p>
    </div>
  )
}

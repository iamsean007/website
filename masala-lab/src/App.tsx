import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HeroMenu } from './components/HeroMenu'
import { CustomizationJourney } from './components/CustomizationJourney'
import './styles/global.css'

type Screen = 'menu' | 'journey'

function App() {
  const [screen, setScreen] = useState<Screen>('menu')

  const handleSelectDish = (dishId: string) => {
    if (dishId === 'butter-chicken') {
      setScreen('journey')
    }
  }

  return (
    <div className="app-shell">
      <p className="app-shell__label">Masala Lab — Concept Prototype</p>
      <div className="phone-frame">
        <div className="phone-frame__notch" aria-hidden="true" />
        <div className="phone-frame__content">
          <AnimatePresence mode="wait">
            {screen === 'menu' ? (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <HeroMenu onSelectDish={handleSelectDish} />
              </motion.div>
            ) : (
              <motion.div
                key="journey"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%' }}
              >
                <CustomizationJourney onBack={() => setScreen('menu')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default App

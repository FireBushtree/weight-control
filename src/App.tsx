import React, { useState } from 'react'
import { Divider } from 'tdesign-react'
import BaseInfo from './components/BaseInfo'
import CarbonCycle from './components/CarbonCycle'
import HeatTarget from './components/HeatTarget'

export interface Energy {
  protein: number
  proteinHeat: number
  carbon: number
  carbonHeat: number
  fat: number
  fatHeat: number
}

function App (): JSX.Element {
  const [weight, setWeight] = useState<number>()
  const [showHeatTarget, setShowHeatTarget] = useState(false)
  const [energy, setEnergy] = useState<Energy>()

  return (
    <div className="app pt-10">
      <div className="container flex ma-a">
        <div className="flex-1 mr-10">
          <BaseInfo
            onChange={(form, hasTdee) => {
              const { weight: formWeight } = form
              setWeight(formWeight)
              setShowHeatTarget(hasTdee)
            }}
          />

          <Divider />

          {weight && showHeatTarget && (
            <HeatTarget setEnergy={setEnergy} weight={weight} />
          )}
        </div>
        <div className="flex-1">
          {energy && <CarbonCycle energy={energy} />}
        </div>
      </div>
    </div>
  )
}

export default App

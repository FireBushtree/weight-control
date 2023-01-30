import React, { useState } from 'react'
import { Divider } from 'tdesign-react'
import BaseInfo from './components/BaseInfo'
import DailyDiet from './components/DailyDiet'
import HeatTarget from './components/HeatTarget'

function App (): JSX.Element {
  const [weight, setWeight] = useState<number>()
  const [showHeatTarget, setShowHeatTarget] = useState(false)

  return (
    <div className="app pt-10">
      <div className="container flex ma-a">
        <div className='flex-1 mr-10'>
          <BaseInfo onChange={(form, hasTdee) => {
            const { weight: formWeight } = form
            setWeight(formWeight)
            setShowHeatTarget(hasTdee)
          }} />

          <Divider />

          {(weight && showHeatTarget) && <HeatTarget weight={weight} />}
        </div>
        <div className='flex-1'>
          <DailyDiet />
        </div>
      </div>
    </div>
  )
}

export default App

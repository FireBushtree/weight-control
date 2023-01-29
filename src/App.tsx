import React from 'react'
import BaseInfo from './components/BaseInfo'
import DailyDiet from './components/DailyDiet'

function App (): JSX.Element {
  // console.log(
  //   calcBMR({ gender: 'man', age: 27, height: 182, weight: 77.5 }),
  //   calcBMR({ gender: 'woman', age: 27, height: 163, weight: 62 })
  // )

  return (
    <div className="app pt-10">
      <div className="container flex ma-a">
        <div className='flex-1 mr-10'>
          <BaseInfo />
        </div>
        <div className='flex-1'>
          <DailyDiet />
        </div>
      </div>
    </div>
  )
}

export default App

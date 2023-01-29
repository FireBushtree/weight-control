import React from 'react'
import BaseInfo from './components/BaseInfo'

function App (): JSX.Element {
  // console.log(
  //   calcBMR({ gender: 'man', age: 27, height: 182, weight: 77.5 }),
  //   calcBMR({ gender: 'woman', age: 27, height: 163, weight: 62 })
  // )

  return (
    <div className="app pt-10">
      <div className="container ma-a">
        <BaseInfo />
      </div>
    </div>
  )
}

export default App

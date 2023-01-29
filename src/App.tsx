import React from 'react'
import { calcBMR } from './formula'

function App (): JSX.Element {
  console.log(
    calcBMR({ gender: 'man', age: 27, height: 182, weight: 77.5 }),
    calcBMR({ gender: 'woman', age: 27, height: 163, weight: 62 })
  )

  return (
    <div className='app'>
      weight-control
    </div>
  )
}

export default App

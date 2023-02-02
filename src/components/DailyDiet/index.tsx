import React from 'react'
import { Collapse } from 'tdesign-react'
import FoodForm from './FoodForm'

const { Panel } = Collapse
export default function DailyDiet (): JSX.Element {
  return (
    <div className='daily-diet'>
      <Collapse defaultValue={['breakfast', 'lunch', 'dinner']} borderless expandIconPlacement='right'>
        <Panel header="早饭" value="breakfast">
          <FoodForm />
        </Panel>
        <Panel header="午饭" value="lunch">
          <FoodForm />
        </Panel>
        <Panel header="晚饭" value="dinner">
          <FoodForm />
        </Panel>
      </Collapse>
    </div>
  )
}

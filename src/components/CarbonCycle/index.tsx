import { Energy } from '@/App'
import React from 'react'
import { Collapse } from 'tdesign-react'

const { Panel } = Collapse

export interface DailyDietProps {
  energy: Energy
}

export default function DailyDiet (props: DailyDietProps): JSX.Element {
  const { energy } = props
  console.log(energy)

  return (
    <div className='daily-diet'>
      <Collapse defaultValue={['low', 'common', 'high']} borderless expandIconPlacement='right'>
        <Panel header="低碳(天)" value="low">
        </Panel>
        <Panel header="中碳(天)" value="common">
        </Panel>
        <Panel header="高碳(天)" value="high">
        </Panel>
      </Collapse>
    </div>
  )
}

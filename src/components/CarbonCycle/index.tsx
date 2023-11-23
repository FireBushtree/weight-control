import { Energy } from '@/App'
import {
  TEXT_CALORIE,
  TEXT_CARBON,
  TEXT_FAT,
  TEXT_PROTEIN
} from '@/constants/text'
import { keep2decimals } from '@/utils'
import React from 'react'
import { Collapse } from 'tdesign-react'
import {
  HIGH_CARBON_DAY_CARBON_COEFFICIENT,
  HIGH_CARBON_DAY_FAT_COEFFICIENT,
  LOW_CARBON_DAY_CARBON_COEFFICIENT,
  LOW_CARBON_DAY_FAT_COEFFICIENT,
  MIDDLE_CARBON_DAY_CARBON_COEFFICIENT,
  MIDDLE_CARBON_DAY_FAT_COEFFICIENT
} from './constants'
import {
  CARBON_CALORIE_PER_G,
  FAT_CALORIE_PER_G,
  PROTEIN_CALORIE_PER_G
} from '@/constants/food'

const { Panel } = Collapse

export interface DailyDietProps {
  energy: Energy
}

interface InTakeProp {
  label: string
  value: number
  class: string
  unit?: string
}

type GenList = (
  protein: number,
  carbon: number,
  fat: number,
) => InTakeProp[]

const genList: GenList = (protein: number, carbon: number, fat: number) => {
  const calorie = keep2decimals(
    protein * PROTEIN_CALORIE_PER_G +
      carbon * CARBON_CALORIE_PER_G +
      fat * FAT_CALORIE_PER_G
  )
  return [
    {
      label: TEXT_PROTEIN,
      value: keep2decimals(protein),
      class: 'bg-protein',
      unit: 'g'
    },
    {
      label: TEXT_CARBON,
      value: keep2decimals(carbon),
      class: 'bg-carbon',
      unit: 'g'
    },
    {
      label: TEXT_FAT,
      value: keep2decimals(fat),
      class: 'bg-fat',
      unit: 'g'
    },
    { label: TEXT_CALORIE, value: calorie, class: 'bg-calorie' }
  ]
}

export default function DailyDiet (props: DailyDietProps): JSX.Element {
  const { energy } = props
  const { protein, fat, carbon } = energy

  const proteinPerWeek = protein * 7
  const fatPerWeek = fat * 7
  const carbonPerWeek = carbon * 7

  const weekList = genList(proteinPerWeek, carbonPerWeek, fatPerWeek)

  const lowCarbonDayCarbon = keep2decimals(
    (carbonPerWeek * LOW_CARBON_DAY_CARBON_COEFFICIENT) / 2
  )
  const lowCarbonDayFat = keep2decimals(
    (fatPerWeek * LOW_CARBON_DAY_FAT_COEFFICIENT) / 2
  )
  const highCarbonDayCarbon = keep2decimals(
    (carbonPerWeek * HIGH_CARBON_DAY_CARBON_COEFFICIENT) / 2
  )
  const highCarbonDayFat = keep2decimals(
    (fatPerWeek * HIGH_CARBON_DAY_FAT_COEFFICIENT) / 2
  )
  const middleCarbonDayCarbon = keep2decimals(
    (carbonPerWeek * MIDDLE_CARBON_DAY_CARBON_COEFFICIENT) / 3
  )
  const middleCarbonDayFat = keep2decimals(
    (fatPerWeek * MIDDLE_CARBON_DAY_FAT_COEFFICIENT) / 3
  )

  const lowCarbonDayList = genList(
    protein,
    lowCarbonDayCarbon,
    lowCarbonDayFat
  )

  const highCarbonDayList = genList(
    protein,
    highCarbonDayCarbon,
    highCarbonDayFat
  )

  const middleCarbonDayList = genList(
    protein,
    middleCarbonDayCarbon,
    middleCarbonDayFat
  )

  const renderInTakeBlock: (
    list: InTakeProp[],
    wrapClass?: string
  ) => JSX.Element = (list: InTakeProp[], wrapClass?: string) => {
    return (
      <div className={`flex ${wrapClass ?? ''}`}>
        {list.map((item) => (
          <div
            key={item.label}
            className={`intake-block heat-number flex-1 font-size-14px mx-16px ${item.class}`}
          >
            {item.value}{item.unit} {item.label}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="daily-diet">
      <div className="font-size-5 font-bold">每周总摄入</div>
      {renderInTakeBlock(weekList, 'py-12px')}

      <div className="font-size-5 font-bold">碳水循环</div>
      <Collapse
        defaultValue={['low', 'middle', 'high']}
        borderless
        expandIconPlacement="right"
      >
        <Panel header="低碳" value="low">
          {renderInTakeBlock(lowCarbonDayList)}
        </Panel>
        <Panel header="中碳" value="middle">
          {renderInTakeBlock(middleCarbonDayList)}
        </Panel>
        <Panel header="高碳" value="high">
          {renderInTakeBlock(highCarbonDayList)}
        </Panel>
      </Collapse>
    </div>
  )
}

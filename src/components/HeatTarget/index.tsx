import { Energy } from '@/App'
import {
  TEXT_CALORIE,
  TEXT_CARBON,
  TEXT_FAT,
  TEXT_PROTEIN
} from '@/constants/text'
import { keep2decimals } from '@/utils'
import React, { useEffect } from 'react'
import { InputNumber, InputNumberValue } from 'tdesign-react'
import { useLocalStorageState } from 'ahooks'
import Field from '@/lib/Field'

const PROTEIN_PER_G_STORAGE_KEY = 'wc-protein-per-g'
const CARBON_PER_G_STORAGE_KEY = 'wc-carbon-per-g'
const FAT_PER_G_STORAGE_KEY = 'wc-fat-per-g'

export interface HeatTargetProps {
  weight: number
  setEnergy: React.Dispatch<React.SetStateAction<Energy | undefined>>
}

export default function HeatTarget (props: HeatTargetProps): JSX.Element {
  const { weight, setEnergy } = props

  const [proteinVal, setProteinVal] = useLocalStorageState<number>(
    PROTEIN_PER_G_STORAGE_KEY,
    {
      defaultValue: 1.2
    }
  )
  const handleSetProteinVal = (val: InputNumberValue): void =>
    setProteinVal(val as number)
  const [carbonVal, setCarbonVal] = useLocalStorageState<number>(
    CARBON_PER_G_STORAGE_KEY,
    {
      defaultValue: 2
    }
  )
  const handleSetCarbonVal = (val: InputNumberValue): void =>
    setCarbonVal(val as number)
  const [fatVal, setFatVal] = useLocalStorageState<number>(
    FAT_PER_G_STORAGE_KEY,
    {
      defaultValue: 0.8
    }
  )
  const handleSetFatVal = (val: InputNumberValue): void =>
    setFatVal(val as number)

  const protein = keep2decimals(weight * (proteinVal as number))
  const proteinHeat = keep2decimals(protein * 4)

  const carbon = keep2decimals(weight * (carbonVal as number))
  const carbonHeat = keep2decimals(carbon * 4)

  const fat = keep2decimals(weight * (fatVal as number))
  const fatHeat = keep2decimals(fat * 9)

  useEffect(() => {
    setEnergy({
      protein,
      proteinHeat,
      carbon,
      carbonHeat,
      fat,
      fatHeat
    })
  }, [protein, proteinHeat, carbon, carbonHeat, fat, fatHeat])

  const nutrientList = [
    {
      label: TEXT_PROTEIN,
      name: 'protein',
      weight: protein,
      calorie: proteinHeat,
      class: 'bg-protein',
      value: proteinVal,
      onChange: handleSetProteinVal
    },
    {
      label: TEXT_CARBON,
      name: 'carbon',
      weight: carbon,
      calorie: carbonHeat,
      class: 'bg-carbon',
      value: carbonVal,
      onChange: handleSetCarbonVal
    },
    {
      label: TEXT_FAT,
      name: 'fat',
      weight: fat,
      calorie: fatHeat,
      class: 'bg-fat',
      value: fatVal,
      onChange: handleSetFatVal
    }
  ]
  return (
    <div className="heat-target">
      <div>
        {nutrientList.map((item) => (
          <Field
            key={item.label}
            label={item.label}
            width="100px"
            textAlign="right"
          >
            <span className="mr-2 font-size-14px">每公斤体重摄入</span>
            <InputNumber
              value={item.value}
              onChange={item.onChange}
              className="flex-1"
              suffix="g"
              step={0.1}
            />
            <span
              className={`font-size-14px ml-2 mr-2 px intake-block heat-number ${item.class}`}
            >
              {item.weight}g {item.label}
            </span>
            <span>≈</span>
            <span
              className={`font-size-14px ml-2 px intake-block heat-number ${item.class}`}
            >
              {item.calorie} {TEXT_CALORIE}
            </span>
          </Field>
        ))}
      </div>
    </div>
  )
}

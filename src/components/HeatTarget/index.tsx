import { Energy } from '@/App'
import { TEXT_CALORIE, TEXT_CARBON, TEXT_FAT, TEXT_PROTEIN } from '@/constants/text'
import { keep2decimals } from '@/utils'
import React, { useEffect } from 'react'
import { Form, InputNumber } from 'tdesign-react'
import { useLocalStorageState } from 'ahooks'

const PROTEIN_PER_G_STORAGE_KEY = 'wc-protein-per-g'
const CARBON_PER_G_STORAGE_KEY = 'wc-carbon-per-g'
const FAT_PER_G_STORAGE_KEY = 'wc-fat-per-g'

const { FormItem } = Form

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
  const [carbonVal, setCarbonVal] = useLocalStorageState<number>(
    CARBON_PER_G_STORAGE_KEY,
    {
      defaultValue: 2
    }
  )
  const [fatVal, setFatVal] = useLocalStorageState<number>(
    FAT_PER_G_STORAGE_KEY,
    {
      defaultValue: 0.8
    }
  )

  const [form] = Form.useForm()
  const proteinPerg = Form.useWatch('protein', form)
  const protein = keep2decimals(weight * proteinPerg)
  const proteinHeat = keep2decimals(protein * 4)

  const carbonPerg = Form.useWatch('carbon', form)
  const carbon = keep2decimals(weight * carbonPerg)
  const carbonHeat = keep2decimals(carbon * 4)

  const fatPerg = Form.useWatch('fat', form)
  const fat = keep2decimals(weight * fatPerg)
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
  }, [
    protein,
    proteinHeat,
    carbon,
    carbonHeat,
    fat,
    fatHeat
  ])

  useEffect(() => {
    setProteinVal(proteinPerg)
  }, [proteinPerg])

  useEffect(() => {
    setCarbonVal(carbonPerg)
  }, [carbonPerg])

  useEffect(() => {
    setFatVal(fatPerg)
  }, [fatPerg])

  const nutrientList = [
    {
      label: TEXT_PROTEIN,
      name: 'protein',
      weight: protein,
      calorie: proteinHeat,
      class: 'bg-protein',
      initialData: proteinVal
    },
    {
      label: TEXT_CARBON,
      name: 'carbon',
      weight: carbon,
      calorie: carbonHeat,
      class: 'bg-carbon',
      initialData: carbonVal
    },
    {
      label: TEXT_FAT,
      name: 'fat',
      weight: fat,
      calorie: fatHeat,
      class: 'bg-fat',
      initialData: fatVal
    }
  ]
  return (
    <div className="heat-target">
      <Form form={form}>
        {nutrientList.map((item) => (
          <FormItem
            key={item.label}
            initialData={item.initialData}
            label={item.label}
            name={item.name}
          >
            <span className="mr-2">每公斤体重摄入</span>
            <InputNumber className='flex-1' suffix="g" step={0.1} />
            <span className={`ml-2 mr-2 px intake-block heat-number ${item.class}`}>
              {item.weight}g {item.label}
            </span>
            <span>≈</span>
            <span className={`ml-2 px intake-block heat-number ${item.class}`}>
              {item.calorie} {TEXT_CALORIE}
            </span>
          </FormItem>
        ))}
      </Form>
    </div>
  )
}

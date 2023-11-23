import { Energy } from '@/App'
import { TEXT_CARBON, TEXT_FAT, TEXT_PROTEIN } from '@/constants/text'
import { keep2decimals } from '@/utils'
import React, { useEffect } from 'react'
import { Form, InputNumber } from 'tdesign-react'
const { FormItem } = Form

export interface HeatTargetProps {
  weight: number
  setEnergy: React.Dispatch<React.SetStateAction<Energy | undefined>>
}

export default function HeatTarget (props: HeatTargetProps): JSX.Element {
  const { weight, setEnergy } = props
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

  const nutrientList = [
    {
      label: TEXT_PROTEIN,
      name: 'protein',
      weight: protein,
      calorie: proteinHeat,
      class: 'bg-protein',
      initialData: 1.2
    },
    {
      label: TEXT_CARBON,
      name: 'carbon',
      weight: carbon,
      calorie: carbonHeat,
      class: 'bg-carbon',
      initialData: 2
    },
    {
      label: TEXT_FAT,
      name: 'fat',
      weight: fat,
      calorie: fatHeat,
      class: 'bg-fat',
      initialData: 0.8
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
              {item.calorie}卡路里
            </span>
          </FormItem>
        ))}
      </Form>
    </div>
  )
}

import { keep2decimals } from '@/utils'
import React from 'react'
import { Form, InputNumber } from 'tdesign-react'
const { FormItem } = Form

export interface HeatTargetProps {
  weight: number
}

export default function HeatTarget (props: HeatTargetProps): JSX.Element {
  const { weight } = props
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
  return (
    <div className="heat-target">
      <Form form={form}>
        <FormItem initialData={1.2} label="蛋白质" name="protein">
          <span className="mr-2">每公斤体重摄入</span>
          <InputNumber suffix="g" step={0.1} />
          <span className="ml-2 mr-2 px intake-block heat-number bg-cyan-400">
            {protein}g 蛋白质
          </span>
          <span>≈</span>
          <span className="ml-2 px intake-block heat-number bg-cyan-400">{proteinHeat}卡路里</span>
        </FormItem>
        <FormItem initialData={2} label="碳水" name="carbon">
          <span className="mr-2">每公斤体重摄入</span>
          <InputNumber suffix="g" step={0.1} />
          <span className="ml-2 mr-2 px intake-block heat-number bg-yellow-400">
            {carbon}g 碳水
          </span>
          <span>≈</span>
          <span className="ml-2 px intake-block heat-number bg-yellow-400">{carbonHeat}卡路里</span>
        </FormItem>
        <FormItem initialData={0.8} label="脂肪" name="fat">
          <span className="mr-2">每公斤体重摄入</span>
          <InputNumber suffix="g" step={0.1} />
          <span className="ml-2 mr-2 px intake-block heat-number bg-rose-400">
            {fat}g 脂肪
          </span>
          <span>≈</span>
          <span className="ml-2 px intake-block heat-number bg-rose-400">{fatHeat}卡路里</span>
        </FormItem>
      </Form>
    </div>
  )
}

import React from 'react'
import { Form, InputNumber } from 'tdesign-react'
const { FormItem } = Form

export interface HeatTargetProps {
  weight: number
}

export default function HeatTarget (props: HeatTargetProps): JSX.Element {
  return (
    <div className='heat-target'>
      <Form>
        <FormItem initialData={1.2} label="蛋白质">
          <span className='mr-2'>每公斤体重摄入</span>
          <InputNumber className='w-xs' suffix="g" />
        </FormItem>
        <FormItem label="碳水">
          <InputNumber />
        </FormItem>
        <FormItem label="脂肪">
          <InputNumber />
        </FormItem>
      </Form>
    </div>
  )
}

import React from 'react'
import { Divider, Form, InputNumber, Radio, Select } from 'tdesign-react'
import {
  calcBMR,
  calcTDEE,
  Gender,
  TDEECoefficientKeys,
  TDEEOptions
} from './formula'
const { FormItem } = Form

function App (): JSX.Element {
  // console.log(
  //   calcBMR({ gender: 'man', age: 27, height: 182, weight: 77.5 }),
  //   calcBMR({ gender: 'woman', age: 27, height: 163, weight: 62 })
  // )

  const [form] = Form.useForm()
  const gender: Gender = Form.useWatch('gender', form)
  const age: number = Form.useWatch('age', form)
  const height: number = Form.useWatch('height', form)
  const weight: number = Form.useWatch('weight', form)
  const frequency: TDEECoefficientKeys = Form.useWatch('frequency', form)

  const needCalcBMR = gender && age && height && weight
  const needCalcTdee = needCalcBMR && frequency

  const bmr = needCalcBMR
    ? calcBMR({ gender, age, height, weight })
    : undefined
  const tdee = needCalcTdee ? calcTDEE(bmr as number, frequency) : undefined

  return (
    <div className="app pt-10">
      <div className="container ma-a">
        <Form form={form}>
          <FormItem name="gender" label="性别">
            <Radio.Group>
              <Radio value="man">男</Radio>
              <Radio value="woman">女</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem name="height" label="身高">
            <InputNumber className="w-xs" suffix="cm" />
          </FormItem>
          <FormItem name="weight" label="体重">
            <InputNumber className="w-xs" suffix="kg" />
          </FormItem>
          <FormItem name="age" label="年龄">
            <InputNumber className="w-xs" />
          </FormItem>
          <FormItem name="frequency" label="锻炼频率">
            <Select className="w-xs" options={TDEEOptions}></Select>
          </FormItem>
        </Form>

        <Divider></Divider>

        <Form>
          {needCalcBMR && (
            <FormItem label="BMR">
              <span className="font-800" style={{ width: '80px' }}>
                {bmr}
              </span>
              卡路里
            </FormItem>
          )}

          {needCalcTdee && (
            <>
              <FormItem label="TDEE">
                <span className="font-800" style={{ width: '80px' }}>
                  {tdee}
                </span>
                卡路里
              </FormItem>

              <FormItem label="饮食摄入">
                <span
                  className="flex justify-center mr-1 font-800 text-white"
                  style={{ width: '80px', background: 'rgb(110, 231, 183)' }}
                >
                  {(tdee as number) - 500}
                </span>
                卡路里
              </FormItem>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}

export default App

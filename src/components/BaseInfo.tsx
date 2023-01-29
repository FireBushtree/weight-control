import React, { useEffect } from 'react'
import { Divider, Form, InputNumber, Radio, Select } from 'tdesign-react'
import {
  calcBMR,
  calcTDEE,
  Gender,
  TDEECoefficientKeys,
  TDEEOptions
} from '@/formula'
const { FormItem } = Form
const BASE_INFO_STORAGE_KEY = 'wc-base-info'

export default function BaseInfo (): JSX.Element {
  const [form] = Form.useForm()
  const gender: Gender = Form.useWatch('gender', form)
  const age: number = Form.useWatch('age', form)
  const height: number = Form.useWatch('height', form)
  const weight: number = Form.useWatch('weight', form)
  const frequency: TDEECoefficientKeys = Form.useWatch('frequency', form)

  const needCalcBMR = gender && age && height && weight
  const needCalcTdee = needCalcBMR && frequency

  const bmrOptions = { gender, age, height, weight }
  const bmr = needCalcBMR
    ? calcBMR(bmrOptions)
    : undefined
  const tdee = needCalcTdee ? calcTDEE(bmr as number, frequency) : undefined

  useEffect(() => {
    const baseInfoStr = localStorage.getItem(BASE_INFO_STORAGE_KEY)
    if (!baseInfoStr) {
      return
    }

    const baseInfo = JSON.parse(baseInfoStr)
    form.setFieldsValue(baseInfo)
  }, [])

  useEffect(() => {
    localStorage.setItem(BASE_INFO_STORAGE_KEY, JSON.stringify({ ...bmrOptions, frequency }))
  }, [gender, age, height, weight, frequency])

  return (
    <div className="base-info">
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
            <span
              className="flex justify-center mr-1 font-800 text-white"
              style={{ width: '80px', background: '#000' }}
            >
              {bmr}
            </span>
            卡路里
          </FormItem>
        )}

        {needCalcTdee && (
          <>
            <FormItem label="TDEE">
              <span
                className="flex justify-center mr-1 font-800 text-white"
                style={{ width: '80px', background: '#000' }}
              >
                {tdee}
              </span>
              卡路里
            </FormItem>

            <FormItem label="热量缺口">
              <span
                className="flex justify-center mr-1 font-800 text-white"
                style={{ width: '80px', background: 'rgb(248, 113, 113)' }}
              >
                - 500
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
  )
}

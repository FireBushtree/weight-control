import React, { useEffect } from 'react'
import {
  Divider,
  InputNumber,
  InputNumberValue,
  Radio,
  RadioValue,
  Select,
  SelectValue
} from 'tdesign-react'
import {
  calcBMR,
  calcTDEE,
  Gender,
  TDEECoefficientKeys,
  TDEEOptions
} from '@/formula'
import { keep2decimals } from '@/utils'
import Field from '@/lib/Field'
import { useLocalStorageState } from 'ahooks'
import { TEXT_CALORIE } from '@/constants/text'

const BASE_INFO_GENDER_STORAGE_KEY = 'wc-base-info-gender'
const BASE_INFO_AGE_STORAGE_KEY = 'wc-base-info-age'
const BASE_INFO_HEIGHT_STORAGE_KEY = 'wc-base-info-height'
const BASE_INFO_WEIGHT_STORAGE_KEY = 'wc-base-info-weight'
const BASE_INFO_FREQUENCY_STORAGE_KEY = 'wc-base-info-frequency'

export interface BMROptions {
  gender: Gender
  age: number
  height: number
  weight: number
}

export interface BaseInfoProps {
  onChange?: (form: BMROptions, hasTdee: boolean) => void
}

const BaseInfo: React.FC<BaseInfoProps> = (props: BaseInfoProps) => {
  const { onChange } = props
  const commonFieldProps = {
    width: '100px',
    textAlign: 'right' as 'right'
  }
  const [gender, setGender] = useLocalStorageState<Gender>(
    BASE_INFO_GENDER_STORAGE_KEY
  )
  const handleSetGender = (val: RadioValue): void => setGender(val as Gender)
  const [age, setAge] = useLocalStorageState<number>(BASE_INFO_AGE_STORAGE_KEY)
  const handleSetAge = (val: InputNumberValue): void => setAge(val as number)
  const [height, setHeight] = useLocalStorageState<number>(
    BASE_INFO_HEIGHT_STORAGE_KEY
  )
  const handleSetHeight = (val: InputNumberValue): void =>
    setHeight(val as number)
  const [weight, setWeight] = useLocalStorageState<number>(
    BASE_INFO_WEIGHT_STORAGE_KEY
  )
  const handleSetWeight = (val: InputNumberValue): void =>
    setWeight(val as number)
  const [frequency, setFrequency] = useLocalStorageState<TDEECoefficientKeys>(
    BASE_INFO_FREQUENCY_STORAGE_KEY
  )
  const handleSetFrequency = (val: SelectValue): void =>
    setFrequency(val as TDEECoefficientKeys)

  const needCalcBMR = !!(gender && age && height && weight)
  const needCalcTdee = !!(needCalcBMR && frequency)

  const bmrOptions = needCalcBMR ? { gender, age, height, weight } : undefined
  const bmr = bmrOptions ? calcBMR(bmrOptions) : undefined
  const tdee = needCalcTdee ? calcTDEE(bmr as number, frequency) : undefined
  const intake = tdee ? keep2decimals(tdee - 500) : undefined

  useEffect(() => {
    if (bmrOptions) {
      onChange?.(bmrOptions, needCalcTdee)
    }
  }, [needCalcTdee])

  return (
    <div className="base-info">
      <div>
        <Field label="性别" {...commonFieldProps}>
          <Radio.Group value={gender} onChange={handleSetGender}>
            <Radio value="man">男</Radio>
            <Radio value="woman">女</Radio>
          </Radio.Group>
        </Field>

        <Field label="身高" {...commonFieldProps}>
          <InputNumber
            value={height}
            onChange={handleSetHeight}
            className="w-xs"
            suffix="cm"
          />
        </Field>

        <Field label="体重" {...commonFieldProps}>
          <InputNumber
            value={weight}
            onChange={handleSetWeight}
            className="w-xs"
            suffix="kg"
          />
        </Field>

        <Field label="年龄" {...commonFieldProps}>
          <InputNumber value={age} onChange={handleSetAge} className="w-xs" />
        </Field>

        <Field label="锻炼频率" {...commonFieldProps}>
          <Select
            className="w-xs"
            options={TDEEOptions}
            value={frequency}
            onChange={handleSetFrequency}
          ></Select>
        </Field>
      </div>

      <Divider></Divider>

      <div>
        {needCalcBMR && (
          <Field label="BMR" {...commonFieldProps}>
            <span className="intake-block mr-1 heat-number bg-black">
              {bmr}
            </span>
            {TEXT_CALORIE}
          </Field>
        )}

        {needCalcTdee && (
          <>
            <Field label="TDEE" {...commonFieldProps}>
              <span
                className="intake-block mr-1 heat-number bg-black"
              >
                {tdee}
              </span>
              卡路里
            </Field>

            <Field label="热量缺口" {...commonFieldProps}>
              <span
                className="intake-block mr-1 heat-number bg-red-400"
              >
                - 500
              </span>
              卡路里
            </Field>

            <Field label="饮食摄入" {...commonFieldProps}>
              <span
                className="intake-block mr-1 heat-number bg-calorie"
              >
                {intake}
              </span>
              卡路里
            </Field>
          </>
        )}
      </div>
    </div>
  )
}

export default BaseInfo

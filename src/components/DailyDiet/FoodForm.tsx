import React, { useEffect, useState } from 'react'
import { Button, Form, InputNumber, Select, Tooltip } from 'tdesign-react'
import { MinusCircleIcon } from 'tdesign-icons-react'
import { getFoodByName, groupFoodOptions } from '@/constants/food'
import Food from '@/class/food'
import { keep2decimals } from '@/utils'
const FOOD_FORM_PREFIX = 'wc-food-form'
const { FormItem, FormList } = Form
const { Option, OptionGroup } = Select
export interface FormRow {
  food: string
  weight: number
}

export interface PatchedFormRow extends FormRow {
  heat?: number
  foodObj?: Food
  protein?: number
  fat?: number
  carbon?: number
}

export interface FoodFormProps {
  name: string
}

const FoodForm: React.FC<FoodFormProps> = ({ name }): JSX.Element => {
  const storeKey = `${FOOD_FORM_PREFIX}${name}`
  const { protein, fat, carbon } = groupFoodOptions
  const [total, setTotal] = useState<number>()
  const [form] = Form.useForm()
  const rows: undefined | FormRow[] = Form.useWatch('rows', form)
  const heatRows: PatchedFormRow[] = (rows ?? []).map(item => {
    const foodObj = getFoodByName(item.food)
    const isCalc = !!(foodObj && item.weight)

    return {
      ...item,
      foodObj,
      heat: isCalc ? keep2decimals(item.weight * foodObj.heat) : undefined,
      protein: isCalc ? keep2decimals(item.weight * foodObj.protein) : undefined,
      fat: isCalc ? keep2decimals(item.weight * foodObj.fat) : undefined,
      carbon: isCalc ? keep2decimals(item.weight * foodObj.carbon) : undefined
    }
  })

  useEffect(() => {
    const formStr = localStorage.getItem(storeKey)
    if (!formStr) {
      return
    }
    try {
      const rows = JSON.parse(formStr)
      form.setFieldsValue({ rows })
    } catch (e) {
      // do noting
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(storeKey, JSON.stringify(rows))

    let total = 0
    heatRows.forEach((item) => {
      total += item.heat ?? 0
    })

    setTotal(total)
  }, [rows])

  return (
    <Form form={form}>
      <FormList name="rows">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ name, key }) => (
              <FormItem key={key}>
                <FormItem name={[name, 'food']}>
                  <Select>
                    <OptionGroup label="蛋白质" divider={true}>
                      {protein.map((item, index) => (
                        <Option
                          label={item.label}
                          value={item.value}
                          key={index}
                        />
                      ))}
                    </OptionGroup>
                    <OptionGroup label="碳水" divider={true}>
                      {carbon.map((item, index) => (
                        <Option
                          label={item.label}
                          value={item.value}
                          key={index}
                        />
                      ))}
                    </OptionGroup>
                    <OptionGroup label="脂肪" divider={true}>
                      {fat.map((item, index) => (
                        <Option
                          label={item.label}
                          value={item.value}
                          key={index}
                        />
                      ))}
                    </OptionGroup>
                  </Select>
                </FormItem>

                <FormItem name={[name, 'weight']}>
                  <InputNumber style={{ width: '180px' }} suffix="g" />
                </FormItem>

                <FormItem>
                  <Tooltip theme='light' content={(
                    <div className='flex'>
                      <span className='px mr-1 intake-block heat-number bg-cyan-400'>{heatRows?.[name]?.protein}g蛋白质</span>
                      <span className='px mr-1 intake-block heat-number bg-yellow-400'>{heatRows?.[name]?.carbon}g碳水</span>
                      <span className='px intake-block heat-number bg-rose-400'>{heatRows?.[name]?.fat}g脂肪</span>
                    </div>
                  )}>
                    <span className='intake-block heat-number bg-lime-400'>{heatRows?.[name]?.heat}卡路里</span>
                  </Tooltip>
                </FormItem>
                <FormItem>
                  <MinusCircleIcon
                    size="20px"
                    className="cursor-pointer"
                    onClick={() => {
                      remove(name)
                    }}
                  />
                </FormItem>
              </FormItem>
            ))}

            <FormItem>
              <span className='intake-block heat-number bg-lime-400'>{ total }卡路里</span>
            </FormItem>

            <FormItem>
              <Button
                theme="success"
                onClick={() => {
                  add()
                }}
              >
                新增
              </Button>
            </FormItem>
          </>
        )}
      </FormList>
    </Form>
  )
}

export default FoodForm

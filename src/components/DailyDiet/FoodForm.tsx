import React from 'react'
import { Button, Form, Select } from 'tdesign-react'
import { MinusCircleIcon } from 'tdesign-icons-react'
import { groupFoodOptions } from '@/constants/food'
const { FormItem, FormList } = Form
const { Option, OptionGroup } = Select

const FoodForm: React.FC = (): JSX.Element => {
  const { protein, fat, carbon } = groupFoodOptions
  return (
    <Form>
      <FormList name="breakfast">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ name, key }) => (
              <FormItem key={key}>
                <FormItem>
                  <Select
                  >
                    <OptionGroup label="蛋白质" divider={true}>
                      {protein.map((item, index) => (
                        <Option label={item.label} value={item.value} key={index} />
                      ))}
                    </OptionGroup>
                    <OptionGroup label="碳水" divider={true}>
                      {carbon.map((item, index) => (
                        <Option label={item.label} value={item.value} key={index} />
                      ))}
                    </OptionGroup>
                    <OptionGroup label="脂肪" divider={true}>
                      {fat.map((item, index) => (
                        <Option label={item.label} value={item.value} key={index} />
                      ))}
                    </OptionGroup>
                  </Select>
                </FormItem>

                <FormItem>
                </FormItem>

                <FormItem>
                  <MinusCircleIcon size="20px" className='cursor-pointer' onClick={() => { remove(name) }} />
                </FormItem>
              </FormItem>
            ))}

            <FormItem>
              <Button theme="success" onClick={() => { add() }}>
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

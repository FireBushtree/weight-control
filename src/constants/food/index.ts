import { FoodClassify } from '@/class/food'
import * as foodList from './food'

export interface Option {
  label: string
  value: string
}

function genFoodOptions (): Option[] {
  const array = []
  for (const [key, value] of Object.entries(foodList)) {
    array.push({ label: value.name, value: key })
  }

  return array
}

function genGroupFoodOptions (): Record<FoodClassify, Option[]> {
  const result = {
    protein: [] as Option[],
    fat: [] as Option[],
    carbon: [] as Option[]
  }
  for (const [key, value] of Object.entries(foodList)) {
    const { classify } = value
    result[classify].push({ label: value.name, value: key })
  }

  return result
}

export const foodOptions = genFoodOptions()
export const groupFoodOptions = genGroupFoodOptions()

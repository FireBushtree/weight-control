import Food, { FoodClassify } from '@/class/food'
import * as foodList from './food'

export interface Option {
  label: string
  value: string
  origin: Food
}

export const PROTEIN_CALORIE_PER_G = 4
export const CARBON_CALORIE_PER_G = 4
export const FAT_CALORIE_PER_G = 9

function genFoodOptions (): Option[] {
  const array = []
  for (const [key, value] of Object.entries(foodList)) {
    array.push({ label: value.name, value: key, origin: value })
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
    result[classify].push({ label: value.name, value: key, origin: value })
  }

  return result
}

export function getFoodByName (name: string): Food | undefined {
  const food = foodOptions.find(item => item.value === name)
  return food?.origin
}

export const foodOptions = genFoodOptions()
export const groupFoodOptions = genGroupFoodOptions()

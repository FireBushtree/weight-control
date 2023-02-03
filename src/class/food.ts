import { keep2decimals } from '@/utils'

export interface FoodOptions {
  carbon: number
  protein: number
  fat: number
  name: string
  classify: FoodClassify
}

export const HEAT_CARBON = 4
export const HEAT_PROTEIN = 4
export const HEAT_FAT = 9

export type FoodClassify = 'protein' | 'carbon' | 'fat'

export default class Food {
  carbon: number
  protein: number
  fat: number
  heat: number
  name: string
  classify: FoodClassify

  // per g
  constructor (options: FoodOptions) {
    const { carbon, protein, fat, name, classify } = options

    this.name = name
    this.carbon = keep2decimals(carbon / 100)
    this.protein = keep2decimals(protein / 100)
    this.fat = keep2decimals(fat / 100)
    this.classify = classify
    this.heat = keep2decimals(
      HEAT_CARBON * this.carbon + HEAT_PROTEIN * this.protein + HEAT_FAT * this.fat
    )
  }
}

import { keep2decimals } from "@/utils";

export interface FoodOptions {
  carbon: number;
  protein: number;
  fat: number;
  name: string;
}

export const HEAT_CARBON = 4;
export const HEAT_PROTEIN = 4;
export const HEAT_FAT = 9;

export default class Food {
  carbon: number;
  protein: number;
  fat: number;
  heat: number;
  name: string;

  // per 100 g
  constructor(options: FoodOptions) {
    const { carbon, protein, fat, name } = options;

    this.name = name;
    this.carbon = carbon;
    this.protein = protein;
    this.fat = fat;
    this.heat = keep2decimals(
      HEAT_CARBON * carbon + HEAT_PROTEIN * protein + HEAT_FAT * fat
    );
  }
}

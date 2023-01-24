export interface CalcBMROptions {
  /**
   * human's height, unit - cm
   */
  height: number

  /**
   * human's weight, unit - kg
   */
  weight: number
  age: number
}

/**
 * BMR formual source https://zhuanlan.zhihu.com/p/137357908
 */
export function calcBMR(options: CalcBMROptions & { gender: 'man' | 'woman' }) {
  const funcMap = {
    man: calcMenBMR,
    woman: calcWomenBMR
  }
  const { gender, ...rest } = options

  const calcFunc = funcMap[gender]
  const val = calcFunc(rest)
  return val.toFixed(2)
}

export function calcMenBMR(options: CalcBMROptions) {
  const { weight, height, age } = options
  return 13.7 * weight + 5 * height - 6.8 * age + 66
}

export function calcWomenBMR(options: CalcBMROptions) {
  const { weight, height, age } = options
  return 9.6 * weight + 1.8 * height - 4.7 * age + 655
}

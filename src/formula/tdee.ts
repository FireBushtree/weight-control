import { keep2decimals } from '@/utils'

export const TDEECoefficient = {
  /**
   * 几乎没有运动
   */
  NO_ACTIVITY: 1.2,

  /**
   * 轻度活动 - 每周运动 [1-3] 天
   */
  MILD_ACTIVITY: 1.375,

  /**
   * 中度活动 - 每周运动 [3-5] 天
   */
  MODERATE_ACTIVITY: 1.55,

  /**
   * 高度活动 - 每周运动 [6-7] 天
   */
  HIGH_ACTIVITY: 1.725,

  /**
   * 非常高度活动 - 几乎无时无刻不在运动， 比如建筑工地工人
   */
  VERY_HIGHT_ACTIVITY: 1.9
}

export type TDEECoefficientKeys = keyof typeof TDEECoefficient

export const TDEEOptions = [
  { label: '几乎没有运动', value: 'NO_ACTIVITY' },
  { label: '轻度活动 - 每周运动 [1-3] 天', value: 'MILD_ACTIVITY' },
  { label: '中度活动 - 每周运动 [3-5] 天', value: 'MODERATE_ACTIVITY' },
  { label: '高度活动 - 每周运动 [6-7] 天', value: 'HIGH_ACTIVITY' },
  { label: '非常高度活动 - 几乎无时无刻不在运动， 比如建筑工地工人', value: 'VERY_HIGHT_ACTIVITY' }
]

export function calcTDEE (bmr: number, coefficient: TDEECoefficientKeys): number {
  const target = TDEECoefficient[coefficient]
  return keep2decimals(bmr * target)
}

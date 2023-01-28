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

export function calcTDEE (bmr: number, coefficient: keyof typeof TDEECoefficient): number {
  const target = TDEECoefficient[coefficient]
  return keep2decimals(bmr * target)
}

import Food from '@/class/food'

// protein
export const egg = new Food({ carbon: 2.4, protein: 13.1, fat: 8.6, name: '鸡蛋', classify: 'protein' })
export const leanBeef = new Food({ carbon: 1.3, protein: 21.3, fat: 2.5, name: '瘦猪肉', classify: 'protein' })
export const leanPork = new Food({ carbon: 1.5, protein: 20.3, fat: 6.2, name: '瘦牛肉', classify: 'protein' })
export const chickenChest = new Food({ carbon: 0.6, protein: 24, fat: 1.9, name: '鸡胸肉', classify: 'protein' })

// carbon
export const rawRice = new Food({ carbon: 77.2, protein: 7.9, fat: 0.9, name: '生米饭', classify: 'carbon' })
export const potato = new Food({ carbon: 17.8, protein: 2.6, fat: 0.2, name: '土豆', classify: 'carbon' })

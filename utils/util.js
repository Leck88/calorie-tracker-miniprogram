// 公共工具函数

// 获取今日日期字符串
function getTodayStr() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

// 获取当前推荐餐次
function getCurrentMealType() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 10) return 'breakfast'
  if (hour >= 10 && hour < 14) return 'lunch'
  if (hour >= 17 && hour < 21) return 'dinner'
  return 'snack'
}

// 餐次配置
const mealConfig = {
  breakfast: { name: '早餐', icon: '🌅', start: 5, end: 10 },
  lunch: { name: '午餐', icon: '☀️', start: 10, end: 14 },
  dinner: { name: '晚餐', icon: '🌙', start: 17, end: 21 },
  snack: { name: '加餐', icon: '🍪', start: 14, end: 17 }
}

// 餐次图标映射
const mealIcons = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍪'
}

// 格式化时间戳为 HH:MM
function formatTime(timestamp) {
  const date = new Date(timestamp)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

// 获取食品信息（根据 ID）
function getFoodById(foodId) {
  const foods = wx.getStorageSync('foods') || []
  return foods.find(f => f.id === foodId) || {}
}

// 计算单条记录的卡路里
function calcRecordCalorie(record) {
  const food = getFoodById(record.foodId)
  return Math.round((food.calorie || 0) * record.weight / 100)
}

// 处理记录列表，添加食品详情
function processRecords(records) {
  const foods = wx.getStorageSync('foods') || []
  return records.map(r => {
    const food = foods.find(f => f.id === r.foodId) || {}
    return {
      ...r,
      foodName: food.name || '未知食品',
      icon: food.icon || '🍽️',
      calorie: Math.round((food.calorie || 0) * r.weight / 100),
      timeStr: formatTime(r.createdAt),
      mealIcon: mealIcons[r.mealType] || mealIcons.snack,
      // 添加食品完整营养数据
      protein: (food.protein || 0) * r.weight / 100,
      carbs: (food.carbs || 0) * r.weight / 100,
      fat: (food.fat || 0) * r.weight / 100
    }
  })
}

// 计算营养素总量
function calcTotalNutrients(records) {
  const processed = processRecords(records)
  return processed.reduce((acc, r) => ({
    calorie: acc.calorie + r.calorie,
    protein: acc.protein + r.protein,
    carbs: acc.carbs + r.carbs,
    fat: acc.fat + r.fat
  }), { calorie: 0, protein: 0, carbs: 0, fat: 0 })
}

// 按餐次分组统计
function groupByMealType(records) {
  const groups = {
    breakfast: { records: [], totalCalorie: 0 },
    lunch: { records: [], totalCalorie: 0 },
    dinner: { records: [], totalCalorie: 0 },
    snack: { records: [], totalCalorie: 0 }
  }
  
  records.forEach(r => {
    const mealType = r.mealType || 'snack'
    if (groups[mealType]) {
      groups[mealType].records.push(r)
      groups[mealType].totalCalorie += r.calorie
    }
  })
  
  return groups
}

// 获取星期几
function getWeekday(date = new Date()) {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekdays[date.getDay()]
}

// 获取热量进度状态
function getProgressStatus(calorie, goal) {
  const ratio = calorie / goal
  if (ratio === 0) return { status: 'empty', icon: '🎯', tip: '开始记录今日饮食吧' }
  if (ratio < 0.5) return { status: 'low', icon: '💪', tip: `还可以吃 ${Math.round(goal - calorie)} 千卡` }
  if (ratio < 0.8) return { status: 'good', icon: '👍', tip: `进度良好，还剩 ${Math.round(goal - calorie)} 千卡` }
  if (ratio < 1) return { status: 'warning', icon: '⚠️', tip: `接近目标，仅剩 ${Math.round(goal - calorie)} 千卡` }
  if (ratio < 1.2) return { status: 'over', icon: '🎉', tip: `已达标！今日摄入 ${Math.round(calorie)} 千卡` }
  return { status: 'excess', icon: '😅', tip: `超标了！超出 ${Math.round(calorie - goal)} 千卡` }
}

// 导出
module.exports = {
  getTodayStr,
  getCurrentMealType,
  mealConfig,
  mealIcons,
  formatTime,
  getFoodById,
  calcRecordCalorie,
  processRecords,
  calcTotalNutrients,
  groupByMealType,
  getWeekday,
  getProgressStatus
}

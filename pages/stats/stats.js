const app = getApp()

Page({
  data: {
    timeRanges: [
      { key: 'week', name: '本周' },
      { key: 'month', name: '本月' }
    ],
    selectedRange: 'week',
    dailyData: [],
    totalCalorie: 0,
    avgCalorie: 0,
    maxCalorie: 0,
    minCalorie: 0,
    maxClass: '',
    minClass: '',
    avgProtein: 0,
    avgCarbs: 0,
    avgFat: 0,
    topFoods: [],
    settings: {
      dailyCalorieGoal: 2000,
      dailyProteinGoal: 60,
      dailyCarbsGoal: 250,
      dailyFatGoal: 65
    }
  },

  onShow() {
    this.loadSettings()
    this.loadData()
  },

  loadSettings() {
    const settings = wx.getStorageSync('settings') || app.globalData.defaultSettings
    this.setData({ settings })
  },

  selectRange(e) {
    const range = e.currentTarget.dataset.range
    this.setData({ selectedRange: range })
    this.loadData()
  },

  loadData() {
    const records = wx.getStorageSync('records') || []
    const foods = wx.getStorageSync('foods') || []
    
    // 获取日期范围
    const now = new Date()
    const startDate = new Date(now)
    const dayCount = this.data.selectedRange === 'week' ? 7 : 30
    startDate.setDate(startDate.getDate() - dayCount + 1)

    // 计算每日数据
    const dailyStats = {}
    const foodStats = {}

    for (let i = 0; i < dayCount; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      const dateStr = this.formatDate(date)
      dailyStats[dateStr] = {
        calorie: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    }

    // 统计记录
    records.forEach(r => {
      if (dailyStats[r.date]) {
        const food = foods.find(f => f.id === r.foodId) || {}
        const ratio = r.weight / 100
        dailyStats[r.date].calorie += (food.calorie || 0) * ratio
        dailyStats[r.date].protein += (food.protein || 0) * ratio
        dailyStats[r.date].carbs += (food.carbs || 0) * ratio
        dailyStats[r.date].fat += (food.fat || 0) * ratio

        // 食品统计
        if (!foodStats[r.foodId]) {
          foodStats[r.foodId] = {
            id: r.foodId,
            name: food.name,
            icon: food.icon,
            count: 0,
            totalCalorie: 0
          }
        }
        foodStats[r.foodId].count++
        foodStats[r.foodId].totalCalorie += Math.round((food.calorie || 0) * ratio)
      }
    })

    // 转换为数组
    const dailyData = Object.keys(dailyStats).map(date => {
      const day = new Date(date)
      const today = this.formatDate(now)
      return {
        date,
        dayStr: `${day.getMonth() + 1}/${day.getDate()}`,
        isToday: date === today,
        ...dailyStats[date],
        calorie: Math.round(dailyStats[date].calorie),
        height: Math.min((dailyStats[date].calorie / this.data.settings.dailyCalorieGoal) * 100, 120)
      }
    }).reverse()

    // 计算统计值
    const calorieValues = dailyData.map(d => d.calorie)
    const totalCalorie = calorieValues.reduce((a, b) => a + b, 0)
    const avgCalorie = calorieValues.length > 0 ? totalCalorie / calorieValues.length : 0
    const maxCalorie = Math.max(...calorieValues, 0)
    const minCalorie = Math.min(...calorieValues.filter(v => v > 0), 0)

    // 计算日均营养素
    let totalProtein = 0, totalCarbs = 0, totalFat = 0
    dailyData.forEach(d => {
      totalProtein += d.protein
      totalCarbs += d.carbs
      totalFat += d.fat
    })
    const days = dailyData.filter(d => d.calorie > 0).length || 1

    // Top食品
    const topFoods = Object.values(foodStats)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    this.setData({
      dailyData,
      totalCalorie: Math.round(totalCalorie),
      avgCalorie: Math.round(avgCalorie),
      maxCalorie,
      minCalorie,
      maxClass: maxCalorie > this.data.settings.dailyCalorieGoal ? 'over' : '',
      minClass: minCalorie < this.data.settings.dailyCalorieGoal * 0.5 ? 'low' : '',
      avgProtein: totalProtein / days,
      avgCarbs: totalCarbs / days,
      avgFat: totalFat / days,
      topFoods
    })
  },

  formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  },

  openSettings() {
    wx.showModal({
      title: '设置每日目标',
      editable: true,
      placeholderText: '请输入每日卡路里目标',
      content: String(this.data.settings.dailyCalorieGoal),
      success: (res) => {
        if (res.confirm && res.content) {
          const calorieGoal = parseInt(res.content)
          if (calorieGoal > 0) {
            const settings = { ...this.data.settings, dailyCalorieGoal: calorieGoal }
            wx.setStorageSync('settings', settings)
            this.loadSettings()
            this.loadData()
          }
        }
      }
    })
  }
})

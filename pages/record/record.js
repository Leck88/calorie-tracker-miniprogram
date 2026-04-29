const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    currentDate: new Date(),
    currentDateStr: '',
    dateLabel: '今天',
    dayRecords: [],
    dayCalorie: 0,
    todayNutrients: { protein: 0, carbs: 0, fat: 0 },
    settings: { dailyCalorieGoal: 2000, dailyProteinGoal: 60, dailyCarbsGoal: 250, dailyFatGoal: 65 },
    progressPercent: 0,
    progressClass: '',
    mealGroups: []
  },

  onShow() {
    this.loadSettings()
    this.updateDateDisplay()
    this.loadDayRecords()
  },

  loadSettings() {
    const settings = wx.getStorageSync('settings') || app.globalData.defaultSettings
    this.setData({ settings })
  },

  updateDateDisplay() {
    const now = new Date()
    const current = this.data.currentDate
    const todayStr = util.getTodayStr()
    const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`
    
    let label = '今天'
    if (dateStr === todayStr) {
      label = '今天'
    } else {
      const diffDays = Math.floor((now - current) / (1000 * 60 * 60 * 24))
      if (diffDays === 1) label = '昨天'
      else if (diffDays === -1) label = '明天'
    }
    
    this.setData({
      currentDateStr: dateStr,
      dateLabel: label
    })
  },

  prevDay() {
    const date = new Date(this.data.currentDate)
    date.setDate(date.getDate() - 1)
    this.setData({ currentDate: date })
    this.updateDateDisplay()
    this.loadDayRecords()
  },

  nextDay() {
    const date = new Date(this.data.currentDate)
    date.setDate(date.getDate() + 1)
    this.setData({ currentDate: date })
    this.updateDateDisplay()
    this.loadDayRecords()
  },

  loadDayRecords() {
    const records = wx.getStorageSync('records') || []
    const dateStr = this.data.currentDateStr
    
    // 使用工具函数处理记录
    const dayRecords = util.processRecords(
      records.filter(r => r.date === dateStr)
    ).sort((a, b) => a.createdAt - b.createdAt)

    // 使用工具函数计算营养素
    const totals = util.calcTotalNutrients(dayRecords)
    
    // 使用工具函数按餐次分组
    const groups = util.groupByMealType(dayRecords)
    const mealGroups = Object.entries(groups)
      .filter(([_, g]) => g.records.length > 0)
      .map(([type, g]) => ({
        type,
        name: util.mealConfig[type].name,
        icon: util.mealConfig[type].icon,
        records: g.records,
        totalCalorie: Math.round(g.totalCalorie)
      }))

    // 计算进度
    const goal = this.data.settings.dailyCalorieGoal
    const progressPercent = Math.min((totals.calorie / goal) * 100, 100)
    let progressClass = progressPercent < 50 ? 'low' : 
                         progressPercent < 80 ? 'medium' : 
                         progressPercent <= 100 ? 'normal' : 'over'

    this.setData({
      dayRecords,
      dayCalorie: Math.round(totals.calorie),
      todayNutrients: {
        protein: totals.protein,
        carbs: totals.carbs,
        fat: totals.fat
      },
      progressPercent,
      progressClass,
      proteinPercent: Math.min(totals.protein / this.data.settings.dailyProteinGoal * 100, 100),
      carbsPercent: Math.min(totals.carbs / this.data.settings.dailyCarbsGoal * 100, 100),
      fatPercent: Math.min(totals.fat / this.data.settings.dailyFatGoal * 100, 100),
      mealGroups
    })
  },

  goToAddRecord() {
    wx.navigateTo({
      url: '/pages/add-food/add-food?mode=record'
    })
  },

  deleteRecord(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除记录',
      content: '确定要删除这条记录吗？',
      success: (res) => {
        if (res.confirm) {
          const records = wx.getStorageSync('records') || []
          wx.setStorageSync('records', records.filter(r => r.id !== id))
          this.loadDayRecords()
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  }
})

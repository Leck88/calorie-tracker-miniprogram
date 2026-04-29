const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    todayStr: '',
    weekday: '',
    todayCalorie: 0,
    todayNutrients: {
      protein: 0,
      carbs: 0,
      fat: 0
    },
    settings: {
      dailyCalorieGoal: 2000,
      dailyProteinGoal: 60,
      dailyCarbsGoal: 250,
      dailyFatGoal: 65
    },
    todayRecords: [],
    progressAngle: 0,
    proteinPercent: 0,
    carbsPercent: 0,
    fatPercent: 0,
    currentMealType: 'lunch',
    mealStats: {},
    progressStatus: 'normal',
    progressIcon: '🎯',
    progressTip: '开始记录今日饮食吧'
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const settings = wx.getStorageSync('settings') || app.globalData.defaultSettings
    const records = wx.getStorageSync('records') || []
    const today = util.getTodayStr()
    
    // 获取今日记录并处理
    const todayRecords = util.processRecords(
      records.filter(r => r.date === today)
    ).sort((a, b) => b.createdAt - a.createdAt)

    // 计算营养素总量
    const totals = util.calcTotalNutrients(todayRecords)
    
    // 按餐次统计
    const mealGroups = util.groupByMealType(todayRecords)
    const mealStats = {}
    Object.keys(mealGroups).forEach(type => {
      mealStats[type] = Math.round(mealGroups[type].totalCalorie)
    })

    // 计算进度状态
    const progressInfo = util.getProgressStatus(totals.calorie, settings.dailyCalorieGoal)
    const progressAngle = Math.min(totals.calorie / settings.dailyCalorieGoal, 1) * 270

    this.setData({
      todayStr: today,
      weekday: util.getWeekday(),
      todayCalorie: Math.round(totals.calorie),
      todayNutrients: {
        protein: totals.protein,
        carbs: totals.carbs,
        fat: totals.fat
      },
      todayRecords,
      progressAngle,
      ...progressInfo,
      proteinPercent: Math.min(totals.protein / settings.dailyProteinGoal * 100, 100),
      carbsPercent: Math.min(totals.carbs / settings.dailyCarbsGoal * 100, 100),
      fatPercent: Math.min(totals.fat / settings.dailyFatGoal * 100, 100),
      mealStats,
      settings,
      currentMealType: util.getCurrentMealType()
    })
  },

  goToAddRecord() {
    wx.navigateTo({
      url: '/pages/add-food/add-food?mode=record'
    })
  },

  quickAddFood(e) {
    const mealType = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/add-food/add-food?mode=record&mealType=${mealType}`
    })
  },

  goToDiet() {
    wx.switchTab({ url: '/pages/diet/diet' })
  },

  goToTakeaway() {
    wx.switchTab({ url: '/pages/takeaway/takeaway' })
  },

  goToStats() {
    wx.switchTab({ url: '/pages/stats/stats' })
  },

  editGoal() {
    wx.showModal({
      title: '设置每日目标',
      editable: true,
      placeholderText: '请输入每日卡路里目标',
      content: String(this.data.settings.dailyCalorieGoal),
      success: (res) => {
        if (res.confirm && res.content) {
          const value = parseInt(res.content)
          if (value > 0) {
            const settings = { ...this.data.settings, dailyCalorieGoal: value }
            wx.setStorageSync('settings', settings)
            this.loadData()
          }
        }
      }
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
          this.loadData()
        }
      }
    })
  }
})

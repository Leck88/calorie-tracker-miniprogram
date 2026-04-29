const app = getApp()

Page({
  data: {
    todayCalorie: 0,
    dailyGoal: 2000,
    remaining: 2000,
    maxCalorie: 150,
    lowCalorieFoods: [],
    highProteinFoods: [],
    zeroCalFoods: [],
    mealPlans: []
  },

  onLoad() {
    this.loadTodayData()
    this.initDietFoods()
  },

  onShow() {
    this.loadTodayData()
  },

  loadTodayData() {
    const settings = wx.getStorageSync('settings') || app.globalData.defaultSettings
    const todayStr = this.getTodayStr()
    const records = wx.getStorageSync('records') || []
    const foods = wx.getStorageSync('foods') || []
    
    // 计算今日摄入
    let totalCal = 0
    records
      .filter(r => r.date === todayStr)
      .forEach(r => {
        const food = foods.find(f => f.id === r.foodId) || {}
        totalCal += (food.calorie || 0) * r.weight / 100
      })

    this.setData({
      todayCalorie: Math.round(totalCal),
      dailyGoal: settings.dailyCalorieGoal,
      remaining: Math.round(settings.dailyCalorieGoal - totalCal)
    })
  },

  initDietFoods() {
    // 低卡减脂食品 (<=150千卡/100g)
    this.setData({
      lowCalorieFoods: [
        { name: '鸡胸肉', icon: '🍗', calorie: 133, protein: 31, fat: 1.2 },
        { name: '西兰花', icon: '🥦', calorie: 34, protein: 2.8, fat: 0.4 },
        { name: '菠菜', icon: '🥬', calorie: 23, protein: 2.9, fat: 0.4 },
        { name: '西红柿', icon: '🍅', calorie: 19, protein: 0.9, fat: 0.2 },
        { name: '黄瓜', icon: '🥒', calorie: 15, protein: 0.8, fat: 0.1 },
        { name: '胡萝卜', icon: '🥕', calorie: 35, protein: 0.9, fat: 0.2 },
        { name: '苹果', icon: '🍎', calorie: 52, protein: 0.3, fat: 0.2 },
        { name: '橙子', icon: '🍊', calorie: 47, protein: 0.9, fat: 0.1 },
        { name: '火龙果', icon: '🐉', calorie: 51, protein: 1.1, fat: 0.2 },
        { name: '草莓', icon: '🍓', calorie: 30, protein: 1.0, fat: 0.3 },
        { name: '蓝莓', icon: '🫐', calorie: 57, protein: 0.7, fat: 0.3 },
        { name: '生菜', icon: '🥬', calorie: 15, protein: 1.4, fat: 0.2 },
        { name: '燕麦', icon: '🌾', calorie: 389, protein: 16.9, fat: 6.9 },
        { name: '鳕鱼', icon: '🐟', calorie: 88, protein: 18, fat: 2 }
      ]
    })

    // 高蛋白低脂肪食品
    this.setData({
      highProteinFoods: [
        { name: '鸡胸肉', icon: '🍗', calorie: 133, protein: 31, fat: 1.2 },
        { name: '虾', icon: '🦐', calorie: 85, protein: 18, fat: 0.5 },
        { name: '鳕鱼', icon: '🐟', calorie: 88, protein: 18, fat: 2 },
        { name: '牛肉', icon: '🥩', calorie: 125, protein: 26, fat: 3 },
        { name: '鸡蛋', icon: '🥚', calorie: 144, protein: 13.3, fat: 9.5 },
        { name: '豆腐', icon: '🧈', calorie: 81, protein: 8, fat: 4 },
        { name: '金枪鱼', icon: '🐟', calorie: 132, protein: 28, fat: 1 },
        { name: '火鸡胸', icon: '🦃', calorie: 135, protein: 30, fat: 1 }
      ]
    })

    // 负卡路里食物
    this.setData({
      zeroCalFoods: [
        { name: '芹菜', icon: '🥬' },
        { name: '黄瓜', icon: '🥒' },
        { name: '生菜', icon: '🥬' },
        { name: '西红柿', icon: '🍅' },
        { name: '菠菜', icon: '🥬' },
        { name: '西兰花', icon: '🥦' },
        { name: '青椒', icon: '🫑' },
        { name: '白萝卜', icon: '🥕' },
        { name: '木耳', icon: '🍄' }
      ]
    })

    // 减脂餐搭配方案
    this.setData({
      mealPlans: [
        {
          name: '早餐：燕麦蛋白碗',
          icon: '🌅',
          foods: ['燕麦50g', '鸡蛋白2个', '蓝莓30g', '牛奶100ml'],
          totalCal: 320,
          protein: 22,
          carbs: 45,
          fat: 8
        },
        {
          name: '午餐：鸡胸沙拉',
          icon: '☀️',
          foods: ['鸡胸肉100g', '西兰花50g', '西红柿1个', '黄瓜50g', '橄榄油5g'],
          totalCal: 280,
          protein: 35,
          carbs: 15,
          fat: 8
        },
        {
          name: '晚餐：清蒸鳕鱼',
          icon: '🌙',
          foods: ['鳕鱼150g', '西兰花80g', '胡萝卜50g', '米饭80g'],
          totalCal: 350,
          protein: 38,
          carbs: 35,
          fat: 6
        },
        {
          name: '加餐：水果蛋白',
          icon: '🍪',
          foods: ['苹果1个', '水煮蛋1个'],
          totalCal: 180,
          protein: 13,
          carbs: 28,
          fat: 9
        }
      ]
    })
  },

  selectFood(e) {
    const food = e.currentTarget.dataset.food
    wx.navigateTo({
      url: `/pages/add-food/add-food?mode=record&food=${JSON.stringify(food)}`
    })
  },

  recordMeal(e) {
    const { foods, cal } = e.currentTarget.dataset
    wx.showModal({
      title: '记录减脂餐',
      content: `确认记录「${foods.join(' + ')}」共${cal}千卡？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({ title: '已记录', icon: 'success' })
        }
      }
    })
  },

  goToAdd() {
    wx.navigateTo({
      url: '/pages/add-food/add-food?mode=record'
    })
  },

  getTodayStr() {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  }
})

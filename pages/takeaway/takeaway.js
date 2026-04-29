const app = getApp()

Page({
  data: {
    remaining: 2000,
    platforms: [
      { name: '美团外卖', emoji: '🍔', color: '#ff6b35', app: 'meituan' },
      { name: '饿了么', emoji: '🛵', color: '#0080ff', app: 'elem' },
      { name: '盒马鲜生', emoji: '🛒', color: '#ffcc00', app: 'hema' }
    ],
    lowCalSuggestions: [
      { name: '沙拉轻食', desc: '蔬菜沙拉、鸡胸肉沙拉', cal: '200-350', icon: '🥗' },
      { name: '日料刺身', desc: '三文鱼刺身、蔬菜军舰', cal: '150-300', icon: '🍣' },
      { name: '越南粉', desc: '火车头河粉、清汤牛肉粉', cal: '300-450', icon: '🍜' },
      { name: '蒸菜套餐', desc: '清蒸鱼、蒸蛋、时蔬', cal: '350-500', icon: '🥬' },
      { name: '麻辣烫(清汤)', desc: '多蔬菜、少加工品', cal: '300-500', icon: '🍲' },
      { name: '粥品套餐', desc: '皮蛋瘦肉粥、鱼片粥', cal: '250-400', icon: '🥣' }
    ],
    tips: [
      { icon: '🥤', title: '少喝饮料', desc: '避免奶茶、果汁，选择白水或茶' },
      { icon: '🍚', title: '主食减半', desc: '米饭、面条等碳水减半' },
      { icon: '🥗', title: '多加蔬菜', desc: '蔬菜热量低且增加饱腹感' },
      { icon: '🍗', title: '去皮食用', desc: '鸡腿、炸鸡等去皮可减脂肪' }
    ],
    alternatives: [
      { name: '奶茶 → 纯茶/黑咖啡', save: '200+', icon: '☕' },
      { name: '炒饭 → 蒸玉米', save: '150+', icon: '🌽' },
      { name: '炸鸡 → 白切鸡', save: '200+', icon: '🍗' },
      { name: '薯条 → 烤土豆', save: '180+', icon: '🥔' },
      { name: '可乐 → 无糖气泡水', save: '150+', icon: '💧' }
    ]
  },

  onLoad() {
    this.loadTodayData()
  },

  onShow() {
    this.loadTodayData()
  },

  loadTodayData() {
    const settings = wx.getStorageSync('settings') || app.globalData.defaultSettings
    const todayStr = this.getTodayStr()
    const records = wx.getStorageSync('records') || []
    const foods = wx.getStorageSync('foods') || []
    
    let totalCal = 0
    records
      .filter(r => r.date === todayStr)
      .forEach(r => {
        const food = foods.find(f => f.id === r.foodId) || {}
        totalCal += (food.calorie || 0) * r.weight / 100
      })

    this.setData({
      remaining: Math.round(settings.dailyCalorieGoal - totalCal)
    })
  },

  openPlatform(e) {
    const appName = e.currentTarget.dataset.app
    wx.showModal({
      title: '提示',
      content: `即将打开${appName === 'meituan' ? '美团外卖' : appName === 'elem' ? '饿了么' : '盒马鲜生'}，请确保已安装对应App`,
      confirmText: '打开',
      success: (res) => {
        if (res.confirm) {
          // 实际使用时可以跳转到小程序的对应外卖页面
          wx.showToast({ 
            title: '请打开外卖App',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  goToDiet() {
    wx.switchTab({ url: '/pages/index/index' })
    // 实际可以通过事件或全局状态切换到减脂餐页面
  },

  goToRecord() {
    wx.switchTab({ url: '/pages/record/record' })
  },

  getTodayStr() {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  }
})

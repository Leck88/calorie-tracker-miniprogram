const app = getApp()

Page({
  data: {
    todayCalorie: 0,
    remainingCalorie: 0,
    statusClass: '',
    statusText: '',
    todayNutrients: { protein: 0, carbs: 0, fat: 0 },
    totalNutrient: 0,
    proteinRatio: 0,
    carbsRatio: 0,
    fatRatio: 0,
    proteinAngle: 0,
    carbsAngle: 0,
    fatAngle: 0,
    recommendations: [],
    helperText: '',
    quickAddFoods: []
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const settings = wx.getStorageSync('settings') || app.globalData.defaultSettings
    const records = wx.getStorageSync('records') || []
    const foods = wx.getStorageSync('foods') || []
    const today = this.getTodayStr()

    // 计算今日摄入
    const todayRecords = records.filter(r => r.date === today)
    let totalCalorie = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0

    todayRecords.forEach(r => {
      const food = foods.find(f => f.id === r.foodId) || {}
      const ratio = r.weight / 100
      totalCalorie += (food.calorie || 0) * ratio
      totalProtein += (food.protein || 0) * ratio
      totalCarbs += (food.carbs || 0) * ratio
      totalFat += (food.fat || 0) * ratio
    })

    const remaining = Math.max(0, settings.dailyCalorieGoal - totalCalorie)

    // 判断状态
    let statusClass = 'normal'
    let statusText = '摄入正常'
    const percent = totalCalorie / settings.dailyCalorieGoal
    if (percent < 0.5) {
      statusClass = 'low'
      statusText = '摄入不足'
    } else if (percent > 1.1) {
      statusClass = 'over'
      statusText = '超标了'
    }

    // 计算营养比例
    const totalNutrient = totalProtein + totalCarbs + totalFat
    let proteinRatio = 0, carbsRatio = 0, fatRatio = 0
    if (totalNutrient > 0) {
      proteinRatio = Math.round((totalProtein / totalNutrient) * 100)
      carbsRatio = Math.round((totalCarbs / totalNutrient) * 100)
      fatRatio = 100 - proteinRatio - carbsRatio
    }

    // 计算角度
    const proteinAngle = proteinRatio * 3.6
    const carbsAngle = (proteinRatio + carbsRatio) * 3.6

    // 生成推荐
    const recommendations = this.generateRecommendations(
      todayRecords, foods, remaining,
      { protein: totalProtein, carbs: totalCarbs, fat: totalFat }
    )

    // 生成搭配建议
    const helperText = this.generateHelperText(
      { protein: totalProtein, carbs: totalCarbs, fat: totalFat },
      settings
    )

    // 快捷添加列表
    const quickAddFoods = foods.slice(0, 8)

    this.setData({
      todayCalorie: Math.round(totalCalorie),
      remainingCalorie: Math.round(remaining),
      statusClass,
      statusText,
      settings,
      todayNutrients: { protein: totalProtein, carbs: totalCarbs, fat: totalFat },
      totalNutrient,
      proteinRatio,
      carbsRatio,
      fatRatio,
      proteinAngle,
      carbsAngle,
      recommendations,
      helperText,
      quickAddFoods
    })
  },

  getTodayStr() {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  },

  generateRecommendations(todayRecords, foods, remaining, nutrients) {
    const recommendations = []
    
    // 获取已摄入的分类
    const eatenCategories = new Set()
    todayRecords.forEach(r => {
      const food = foods.find(f => f.id === r.foodId)
      if (food) eatenCategories.add(food.category)
    })

    // 找出缺少的分类
    const allCategories = ['staple', 'noodles', 'vegetable', 'meat', 'seafood', 'egg']
    const missingCategories = allCategories.filter(c => !eatenCategories.has(c))

    // 根据剩余热量和营养情况推荐
    if (remaining > 300) {
      // 如果缺少主食，推荐碳水类
      if (nutrients.carbs < 100) {
        const carbFoods = foods.filter(f => (f.category === 'staple' || f.category === 'noodles') && f.calorie < 350)
        if (carbFoods.length > 0) {
          const food = carbFoods[Math.floor(Math.random() * carbFoods.length)]
          recommendations.push({
            ...food,
            calorie: Math.round(food.calorie * 100),
            isBalance: true
          })
        }
      }

      // 如果缺少蛋白质，推荐蛋白质类
      if (nutrients.protein < 30) {
        const proteinFoods = foods.filter(f => (f.category === 'meat' || f.category === 'seafood' || f.category === 'egg') && f.protein > 12)
        if (proteinFoods.length > 0) {
          const food = proteinFoods[Math.floor(Math.random() * proteinFoods.length)]
          recommendations.push({
            ...food,
            calorie: Math.round(food.calorie * 100),
            isProtein: true
          })
        }
      }

      // 如果缺少蔬菜，推荐蔬菜
      if (missingCategories.includes('vegetable')) {
        const vegFoods = foods.filter(f => f.category === 'vegetable' && f.calorie < 60)
        if (vegFoods.length > 0) {
          const food = vegFoods[Math.floor(Math.random() * vegFoods.length)]
          recommendations.push({
            ...food,
            calorie: Math.round(food.calorie * 100),
            isLight: true
          })
        }
      }
    }

    return recommendations.slice(0, 3)
  },

  generateHelperText(nutrients, settings) {
    const tips = []
    
    if (nutrients.protein < settings.dailyProteinGoal * 0.3) {
      tips.push('蛋白质摄入偏少，建议补充优质蛋白')
    }
    
    if (nutrients.carbs < settings.dailyCarbsGoal * 0.3) {
      tips.push('碳水摄入不足，适量补充主食')
    }
    
    if (nutrients.fat > settings.dailyFatGoal * 0.8) {
      tips.push('脂肪摄入偏高，减少高脂肪食品')
    }
    
    if (tips.length === 0) {
      tips.push('营养摄入较为均衡，继续保持')
    }
    
    return tips.join('；') + '。'
  },

  quickAdd(e) {
    const food = e.currentTarget.dataset.food
    wx.navigateTo({
      url: `/pages/add-food/add-food?mode=record&foodId=${food.id}`
    })
  }
})

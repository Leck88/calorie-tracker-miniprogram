const app = getApp()

Page({
  data: {
    mode: 'add',
    categories: [],
    mealTypes: [
      { id: 'breakfast', name: '早餐', icon: '🌅', timeRange: '6:00-9:00' },
      { id: 'lunch', name: '午餐', icon: '☀️', timeRange: '11:00-13:00' },
      { id: 'dinner', name: '晚餐', icon: '🌙', timeRange: '17:00-19:00' },
      { id: 'snack', name: '加餐', icon: '🍪', timeRange: '其他时间' }
    ],
    selectedMealType: 'lunch',
    iconList: ['🍚', '🍜', '🍝', '🍛', '🍔', '🍕', '🌮', '🌯', '🥗', '🍖', '🍗', '🥩', '🐟', '🦐', '🥚', '🥛', '🧀', '🍳', '🥬', '🥦', '🥕', '🍅', '🥒', '🌽', '🍎', '🍌', '🍊', '🍇', '🍓', '🫐', '🍍', '🥝', '🥤', '☕', '🧋', '🍪', '🍫', '🍿', '🍩', '🍰', '🍱', '🍘', '🍙', '🍚'],
    formData: {
      icon: '🍚',
      name: '',
      category: 'staple',
      calorie: '',
      protein: '',
      carbs: '',
      fat: ''
    },
    searchKey: '',
    selectedCategory: '',
    filteredFoods: [],
    selectedFood: null,
    weight: '',
    quickWeights: [50, 100, 150, 200, 250, 300]
  },

  onLoad(options) {
    // 获取当前推荐餐次
    const hour = new Date().getHours()
    let defaultMealType = 'lunch'
    if (hour >= 5 && hour < 10) defaultMealType = 'breakfast'
    else if (hour >= 10 && hour < 14) defaultMealType = 'lunch'
    else if (hour >= 17 && hour < 21) defaultMealType = 'dinner'
    else defaultMealType = 'snack'
    
    this.setData({
      mode: options.mode || 'add',
      categories: app.globalData.categories,
      selectedMealType: options.mealType || defaultMealType
    })
    
    if (options.foodId) {
      this.setData({ selectedFoodId: options.foodId })
      this.loadFood(options.foodId)
    }
    
    this.loadFoods()
  },

  loadFoods() {
    const foods = wx.getStorageSync('foods') || []
    this.setData({
      allFoods: foods,
      filteredFoods: foods
    })
  },

  loadFood(foodId) {
    const foods = wx.getStorageSync('foods') || []
    const food = foods.find(f => f.id === foodId)
    if (food) {
      this.setData({
        selectedFood: food,
        formData: {
          icon: food.icon,
          name: food.name,
          category: food.category,
          calorie: String(food.calorie),
          protein: String(food.protein),
          carbs: String(food.carbs),
          fat: String(food.fat)
        }
      })
    }
  },

  onSearchFood(e) {
    this.setData({ searchKey: e.detail.value })
    this.filterFoods()
  },

  filterByCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ selectedCategory: category })
    this.filterFoods()
  },

  filterFoods() {
    let foods = this.data.allFoods
    
    if (this.data.selectedCategory) {
      foods = foods.filter(f => f.category === this.data.selectedCategory)
    }
    
    if (this.data.searchKey) {
      const key = this.data.searchKey.toLowerCase()
      foods = foods.filter(f => f.name.toLowerCase().includes(key))
    }
    
    this.setData({ filteredFoods: foods })
  },

  selectFood(e) {
    const food = e.currentTarget.dataset.food
    this.setData({ 
      selectedFood: food,
      calculatedCalorie: Math.round(food.calorie * this.data.weight / 100) || 0
    })
  },

  onWeightInput(e) {
    const weight = e.detail.value
    this.setData({ weight })
    if (this.data.selectedFood && weight) {
      this.setData({
        calculatedCalorie: Math.round(this.data.selectedFood.calorie * weight / 100)
      })
    }
  },

  selectMealType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({ selectedMealType: type })
  },

  setWeight(e) {
    const weight = e.currentTarget.dataset.weight
    this.setData({ weight: String(weight) })
    if (this.data.selectedFood) {
      this.setData({
        calculatedCalorie: Math.round(this.data.selectedFood.calorie * weight / 100)
      })
    }
  },

  selectIcon(e) {
    const icon = e.currentTarget.dataset.icon
    this.setData({
      'formData.icon': icon
    })
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      'formData.category': category
    })
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  submit() {
    const { mode } = this.data

    if (mode === 'record') {
      this.addRecord()
    } else {
      this.saveFood()
    }
  },

  addRecord() {
    if (!this.data.selectedFood) {
      wx.showToast({ title: '请选择食品', icon: 'none' })
      return
    }
    
    const weight = parseInt(this.data.weight)
    if (!weight || weight <= 0) {
      wx.showToast({ title: '请输入有效重量', icon: 'none' })
      return
    }

    const today = this.getTodayStr()
    const records = wx.getStorageSync('records') || []
    
    records.push({
      id: 'record_' + Date.now(),
      foodId: this.data.selectedFood.id,
      mealType: this.data.selectedMealType,
      weight,
      date: today,
      createdAt: Date.now()
    })

    wx.setStorageSync('records', records)
    
    wx.showToast({ title: '添加成功', icon: 'success' })
    
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  saveFood() {
    const { formData } = this.data
    
    if (!formData.name) {
      wx.showToast({ title: '请输入食品名称', icon: 'none' })
      return
    }
    
    if (!formData.calorie || parseFloat(formData.calorie) < 0) {
      wx.showToast({ title: '请输入有效卡路里', icon: 'none' })
      return
    }

    const foods = wx.getStorageSync('foods') || []
    
    if (this.data.mode === 'edit' && this.data.selectedFoodId) {
      // 编辑模式
      const index = foods.findIndex(f => f.id === this.data.selectedFoodId)
      if (index !== -1) {
        foods[index] = {
          ...foods[index],
          icon: formData.icon,
          name: formData.name,
          category: formData.category,
          calorie: parseFloat(formData.calorie),
          protein: parseFloat(formData.protein) || 0,
          carbs: parseFloat(formData.carbs) || 0,
          fat: parseFloat(formData.fat) || 0
        }
      }
    } else {
      // 新增模式
      foods.push({
        id: 'food_' + Date.now(),
        icon: formData.icon,
        name: formData.name,
        category: formData.category,
        calorie: parseFloat(formData.calorie),
        protein: parseFloat(formData.protein) || 0,
        carbs: parseFloat(formData.carbs) || 0,
        fat: parseFloat(formData.fat) || 0,
        createdAt: Date.now()
      })
    }

    wx.setStorageSync('foods', foods)
    
    wx.showToast({ 
      title: this.data.mode === 'edit' ? '保存成功' : '添加成功', 
      icon: 'success' 
    })
    
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  getTodayStr() {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  }
})

const app = getApp()

Page({
  data: {
    categories: [],
    selectedCategory: '',
    searchKey: '',
    filteredFoods: [],
    allFoods: []
  },

  onShow() {
    this.loadCategories()
    this.loadFoods()
  },

  loadCategories() {
    this.setData({
      categories: app.globalData.categories
    })
  },

  loadFoods() {
    const foods = wx.getStorageSync('foods') || []
    this.setData({
      allFoods: foods,
      filteredFoods: foods
    })
    this.filterFoods()
  },

  onSearch(e) {
    this.setData({
      searchKey: e.detail.value
    })
    this.filterFoods()
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      selectedCategory: category
    })
    this.filterFoods()
  },

  filterFoods() {
    let foods = this.data.allFoods
    
    // 按分类筛选
    if (this.data.selectedCategory) {
      foods = foods.filter(f => f.category === this.data.selectedCategory)
    }
    
    // 按关键词筛选
    if (this.data.searchKey) {
      const key = this.data.searchKey.toLowerCase()
      foods = foods.filter(f => 
        f.name.toLowerCase().includes(key) ||
        f.category.toLowerCase().includes(key)
      )
    }
    
    this.setData({
      filteredFoods: foods
    })
  },

  getCategoryName(categoryId) {
    const category = this.data.categories.find(c => c.id === categoryId)
    return category ? `${category.icon} ${category.name}` : '其他'
  },

  selectFood(e) {
    const food = e.currentTarget.dataset.food
    wx.showModal({
      title: food.name,
      content: `热量: ${food.calorie}千卡/100g\n蛋白质: ${food.protein}g\n碳水: ${food.carbs}g\n脂肪: ${food.fat}g`,
      showCancel: true,
      confirmText: '添加记录',
      cancelText: '关闭',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: `/pages/add-food/add-food?mode=record&foodId=${food.id}`
          })
        }
      }
    })
  },

  editFood(e) {
    const food = e.currentTarget.dataset.food
    wx.navigateTo({
      url: `/pages/add-food/add-food?mode=edit&foodId=${food.id}`
    })
  },

  deleteFood(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除食品',
      content: '确定要删除这个食品吗？',
      success: (res) => {
        if (res.confirm) {
          let foods = wx.getStorageSync('foods') || []
          foods = foods.filter(f => f.id !== id)
          wx.setStorageSync('foods', foods)
          this.loadFoods()
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  goToAddFood() {
    wx.navigateTo({
      url: '/pages/add-food/add-food?mode=add'
    })
  }
})

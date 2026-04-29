# 吃喝卡路里 - 微信小程序规格文档

## 1. 项目概述

- **项目名称**: 吃喝卡路里
- **项目类型**: 自用卡路里记录与食品管理微信小程序
- **核心功能**: 记录个人常吃食品的卡路里，管理每日饮食，提供食品搭配建议
- **目标用户**: 关注健康饮食、需要进行卡路里控制的用户

## 2. 功能清单

### 2.1 食品管理
- 添加自定义食品（名称、卡路里/100g、分类、图片）
- 编辑和删除已有食品
- 食品分类管理（主食、面食、蔬果、肉类、水产、蛋奶、饮品、零食、汤类等10+分类）
- 搜索和筛选食品
- **180+种预置常见食品数据**

### 2.2 饮食记录
- **按餐次分类记录**（早餐、午餐、晚餐、加餐）
- 记录每日饮食（选择食品 + 输入克数）
- 查看今日各餐次摄入卡路里
- 早/中/晚/加餐热量占比统计
- 历史饮食记录查询
- 删除饮食记录

### 2.3 食品搭配
- 根据今日已摄入食品，智能推荐搭配
- 营养均衡提示（蛋白质、碳水、脂肪占比）
- 热量缺口/盈余提示

### 2.4 减脂餐导购
- 减脂食品推荐（低卡、低脂、高蛋白）
- 减脂餐搭配方案
- 热量预警提示

### 2.5 外卖入口
- 常用外卖平台快捷入口
- 低卡外卖选择建议
- 外卖点餐小贴士

### 2.6 数据统计
- 今日/本周/本月卡路里趋势图
- 各餐次摄入占比饼图
- 各分类食品摄入占比
- 热量目标设置与达成率

## 3. 页面结构

```
pages/
├── index/          # 首页（今日饮食概览）
├── food/           # 食品库管理
├── add-food/       # 添加/编辑食品
├── record/         # 饮食记录
├── combine/        # 食品搭配推荐
├── stats/          # 数据统计
├── diet/           # 减脂餐导购
└── takeaway/       # 外卖入口
```

## 4. 数据模型

### 食品 Food
```json
{
  "id": "string",
  "name": "string",
  "calorie": "number",      // 卡路里/100g
  "category": "string",     // 分类
  "protein": "number",       // 蛋白质/g
  "carbs": "number",        // 碳水/g
  "fat": "number",          // 脂肪/g
  "icon": "string",          // 图标/emoji
  "createdAt": "timestamp"
}
```

### 饮食记录 Record
```json
{
  "id": "string",
  "foodId": "string",
  "mealType": "string",     // 餐次：breakfast/lunch/dinner/snack
  "weight": "number",       // 克数
  "date": "string",         // YYYY-MM-DD
  "createdAt": "timestamp"
}
```

### 餐次类型 MealType
```json
{
  "breakfast": {"name": "早餐", "icon": "🌅", "timeRange": "5:00-10:00"},
  "lunch": {"name": "午餐", "icon": "☀️", "timeRange": "11:00-13:00"},
  "dinner": {"name": "晚餐", "icon": "🌙", "timeRange": "17:00-19:00"},
  "snack": {"name": "加餐", "icon": "🍪", "timeRange": "其他时间"}
}
```

### 用户设置 Settings
```json
{
  "dailyCalorieGoal": "number",  // 每日目标卡路里
  "dailyProteinGoal": "number",   // 蛋白质目标
  "dailyCarbsGoal": "number",     // 碳水目标
  "dailyFatGoal": "number"        // 脂肪目标
}
```

## 5. 技术方案

- **前端框架**: 微信小程序原生框架
- **数据存储**: 本地存储 (wx.setStorage/wx.getStorage)
- **UI组件**: 原生组件 + 自定义组件
- **图标方案**: Emoji + 自定义图标

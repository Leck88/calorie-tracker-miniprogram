App({
  globalData: {
    // 默认每日目标
    defaultSettings: {
      dailyCalorieGoal: 2000,
      dailyProteinGoal: 60,
      dailyCarbsGoal: 250,
      dailyFatGoal: 65
    },
    // 食品分类
    categories: [
      { id: 'staple', name: '主食', icon: '🍚' },
      { id: 'noodles', name: '面食', icon: '🍜' },
      { id: 'vegetable', name: '蔬果', icon: '🥬' },
      { id: 'meat', name: '肉类', icon: '🍖' },
      { id: 'seafood', name: '水产', icon: '🦐' },
      { id: 'egg', name: '蛋奶', icon: '🥚' },
      { id: 'drink', name: '饮品', icon: '🥤' },
      { id: 'snack', name: '零食', icon: '🍪' },
      { id: 'soup', name: '汤类', icon: '🍲' },
      { id: 'other', name: '其他', icon: '🍽️' }
    ],
    // 预置食品数据（180+种常见食品）
    presetFoods: [
      // ===== 主食类 =====
      { name: '白米饭', calorie: 116, category: 'staple', protein: 2.6, carbs: 25.9, fat: 0.3, icon: '🍚' },
      { name: '糙米饭', calorie: 111, category: 'staple', protein: 2.5, carbs: 23.0, fat: 0.9, icon: '🍚' },
      { name: '小米粥', calorie: 46, category: 'staple', protein: 1.2, carbs: 9.3, fat: 0.4, icon: '🥣' },
      { name: '八宝粥', calorie: 65, category: 'staple', protein: 1.5, carbs: 13.5, fat: 0.3, icon: '🥣' },
      { name: '红豆粥', calorie: 52, category: 'staple', protein: 1.8, carbs: 10.5, fat: 0.2, icon: '🥣' },
      { name: '红薯', calorie: 99, category: 'staple', protein: 1.1, carbs: 23.6, fat: 0.1, icon: '🍠' },
      { name: '紫薯', calorie: 74, category: 'staple', protein: 1.4, carbs: 17.3, fat: 0.1, icon: '🍠' },
      { name: '土豆', calorie: 76, category: 'staple', protein: 2.0, carbs: 17.0, fat: 0.1, icon: '🥔' },
      { name: '玉米', calorie: 112, category: 'staple', protein: 4.0, carbs: 22.8, fat: 1.2, icon: '🌽' },
      { name: '燕麦', calorie: 389, category: 'staple', protein: 16.9, carbs: 66.3, fat: 6.9, icon: '🌾' },
      { name: '莲藕', calorie: 73, category: 'staple', protein: 1.9, carbs: 17.0, fat: 0.2, icon: '🥔' },
      { name: '山药', calorie: 64, category: 'staple', protein: 1.9, carbs: 14.1, fat: 0.2, icon: '🥔' },
      { name: '芋头', calorie: 81, category: 'staple', protein: 2.2, carbs: 18.6, fat: 0.2, icon: '🥔' },
      { name: '荸荠', calorie: 59, category: 'staple', protein: 1.2, carbs: 14.0, fat: 0.2, icon: '🥔' },
      { name: '南瓜', calorie: 26, category: 'staple', protein: 0.7, carbs: 6.5, fat: 0.1, icon: '🎃' },

      // ===== 面食类 =====
      { name: '挂面', calorie: 284, category: 'noodles', protein: 8.3, carbs: 59.5, fat: 0.8, icon: '🍜' },
      { name: '方便面', calorie: 436, category: 'noodles', protein: 9.5, carbs: 60.0, fat: 17.0, icon: '🍜' },
      { name: '手擀面', calorie: 290, category: 'noodles', protein: 9.0, carbs: 58.0, fat: 1.5, icon: '🍝' },
      { name: '刀削面', calorie: 286, category: 'noodles', protein: 8.5, carbs: 58.0, fat: 1.2, icon: '🍝' },
      { name: '饺子皮', calorie: 253, category: 'noodles', protein: 7.3, carbs: 51.8, fat: 0.8, icon: '🥟' },
      { name: '包子皮', calorie: 267, category: 'noodles', protein: 7.5, carbs: 55.0, fat: 1.0, icon: '🥟' },
      { name: '馒头', calorie: 223, category: 'noodles', protein: 7.0, carbs: 47.0, fat: 1.1, icon: '🥖' },
      { name: '花卷', calorie: 214, category: 'noodles', protein: 6.4, carbs: 44.0, fat: 1.5, icon: '🥖' },
      { name: '烧饼', calorie: 297, category: 'noodles', protein: 8.0, carbs: 55.0, fat: 5.0, icon: '🫓' },
      { name: '烙饼', calorie: 225, category: 'noodles', protein: 5.0, carbs: 45.0, fat: 3.5, icon: '🫓' },
      { name: '油条', calorie: 386, category: 'noodles', protein: 6.9, carbs: 51.0, fat: 17.6, icon: '🥖' },
      { name: '煎饼', calorie: 269, category: 'noodles', protein: 7.0, carbs: 48.0, fat: 5.5, icon: '🫔' },
      { name: '手抓饼', calorie: 306, category: 'noodles', protein: 7.0, carbs: 42.0, fat: 12.0, icon: '🫔' },
      { name: '全麦面包', calorie: 246, category: 'noodles', protein: 8.5, carbs: 41.0, fat: 3.4, icon: '🍞' },
      { name: '白面包', calorie: 265, category: 'noodles', protein: 8.0, carbs: 50.0, fat: 3.0, icon: '🍞' },
      { name: '法棍', calorie: 274, category: 'noodles', protein: 9.5, carbs: 55.0, fat: 1.5, icon: '🥖' },
      { name: '披萨', calorie: 266, category: 'noodles', protein: 11.0, carbs: 33.0, fat: 10.0, icon: '🍕' },

      // ===== 蔬菜类 =====
      { name: '西兰花', calorie: 34, category: 'vegetable', protein: 2.8, carbs: 6.6, fat: 0.4, icon: '🥦' },
      { name: '菠菜', calorie: 23, category: 'vegetable', protein: 2.9, carbs: 3.6, fat: 0.4, icon: '🥬' },
      { name: '白菜', calorie: 17, category: 'vegetable', protein: 1.5, carbs: 3.2, fat: 0.1, icon: '🥬' },
      { name: '生菜', calorie: 15, category: 'vegetable', protein: 1.4, carbs: 2.9, fat: 0.2, icon: '🥬' },
      { name: '油菜', calorie: 23, category: 'vegetable', protein: 1.9, carbs: 3.8, fat: 0.5, icon: '🥬' },
      { name: '韭菜', calorie: 29, category: 'vegetable', protein: 2.4, carbs: 4.6, fat: 0.4, icon: '🥬' },
      { name: '芹菜', calorie: 14, category: 'vegetable', protein: 0.6, carbs: 3.0, fat: 0.1, icon: '🥬' },
      { name: '娃娃菜', calorie: 13, category: 'vegetable', protein: 1.0, carbs: 2.0, fat: 0.1, icon: '🥬' },
      { name: '西红柿', calorie: 19, category: 'vegetable', protein: 0.9, carbs: 4.0, fat: 0.2, icon: '🍅' },
      { name: '黄瓜', calorie: 15, category: 'vegetable', protein: 0.8, carbs: 3.0, fat: 0.1, icon: '🥒' },
      { name: '茄子', calorie: 21, category: 'vegetable', protein: 1.0, carbs: 4.9, fat: 0.2, icon: '🍆' },
      { name: '青椒', calorie: 22, category: 'vegetable', protein: 1.0, carbs: 5.4, fat: 0.2, icon: '🫑' },
      { name: '胡萝卜', calorie: 35, category: 'vegetable', protein: 0.9, carbs: 8.1, fat: 0.2, icon: '🥕' },
      { name: '白萝卜', calorie: 21, category: 'vegetable', protein: 0.9, carbs: 5.0, fat: 0.1, icon: '🥕' },
      { name: '洋葱', calorie: 39, category: 'vegetable', protein: 1.1, carbs: 9.3, fat: 0.1, icon: '🧅' },
      { name: '蒜苔', calorie: 66, category: 'vegetable', protein: 3.0, carbs: 14.0, fat: 0.5, icon: '🌿' },
      { name: '荷兰豆', calorie: 27, category: 'vegetable', protein: 2.5, carbs: 4.0, fat: 0.3, icon: '🫛' },
      { name: '四季豆', calorie: 28, category: 'vegetable', protein: 2.0, carbs: 5.0, fat: 0.1, icon: '🫛' },
      { name: '菜花', calorie: 24, category: 'vegetable', protein: 1.9, carbs: 4.6, fat: 0.2, icon: '🥦' },
      { name: '莴笋', calorie: 14, category: 'vegetable', protein: 0.6, carbs: 2.8, fat: 0.1, icon: '🥬' },
      { name: '竹笋', calorie: 25, category: 'vegetable', protein: 2.6, carbs: 4.0, fat: 0.2, icon: '🎋' },
      { name: '木耳', calorie: 21, category: 'vegetable', protein: 1.5, carbs: 4.5, fat: 0.2, icon: '🍄' },
      { name: '香菇', calorie: 26, category: 'vegetable', protein: 2.2, carbs: 5.0, fat: 0.3, icon: '🍄' },
      { name: '金针菇', calorie: 32, category: 'vegetable', protein: 2.4, carbs: 6.0, fat: 0.4, icon: '🍄' },
      { name: '杏鲍菇', calorie: 31, category: 'vegetable', protein: 3.0, carbs: 5.0, fat: 0.1, icon: '🍄' },

      // ===== 蔬果类 =====
      { name: '苹果', calorie: 52, category: 'vegetable', protein: 0.3, carbs: 13.8, fat: 0.2, icon: '🍎' },
      { name: '香蕉', calorie: 93, category: 'vegetable', protein: 1.4, carbs: 22.8, fat: 0.2, icon: '🍌' },
      { name: '橙子', calorie: 47, category: 'vegetable', protein: 0.9, carbs: 11.8, fat: 0.1, icon: '🍊' },
      { name: '橘子', calorie: 44, category: 'vegetable', protein: 0.7, carbs: 10.9, fat: 0.1, icon: '🍊' },
      { name: '柚子', calorie: 41, category: 'vegetable', protein: 0.8, carbs: 10.5, fat: 0.2, icon: '🍊' },
      { name: '葡萄', calorie: 43, category: 'vegetable', protein: 0.5, carbs: 10.3, fat: 0.2, icon: '🍇' },
      { name: '草莓', calorie: 30, category: 'vegetable', protein: 1.0, carbs: 7.1, fat: 0.3, icon: '🍓' },
      { name: '西瓜', calorie: 30, category: 'vegetable', protein: 0.6, carbs: 7.6, fat: 0.1, icon: '🍉' },
      { name: '哈密瓜', calorie: 34, category: 'vegetable', protein: 0.5, carbs: 8.8, fat: 0.1, icon: '🍈' },
      { name: '火龙果', calorie: 51, category: 'vegetable', protein: 1.1, carbs: 13.0, fat: 0.2, icon: '🐉' },
      { name: '猕猴桃', calorie: 61, category: 'vegetable', protein: 0.8, carbs: 14.5, fat: 0.6, icon: '🥝' },
      { name: '芒果', calorie: 35, category: 'vegetable', protein: 0.6, carbs: 8.3, fat: 0.3, icon: '🥭' },
      { name: '菠萝', calorie: 41, category: 'vegetable', protein: 0.5, carbs: 10.8, fat: 0.1, icon: '🍍' },
      { name: '梨', calorie: 51, category: 'vegetable', protein: 0.4, carbs: 13.3, fat: 0.2, icon: '🍐' },
      { name: '桃子', calorie: 42, category: 'vegetable', protein: 0.9, carbs: 10.9, fat: 0.3, icon: '🍑' },
      { name: '樱桃', calorie: 46, category: 'vegetable', protein: 1.1, carbs: 11.0, fat: 0.2, icon: '🍒' },
      { name: '蓝莓', calorie: 57, category: 'vegetable', protein: 0.7, carbs: 14.5, fat: 0.3, icon: '🫐' },
      { name: '枇杷', calorie: 39, category: 'vegetable', protein: 0.4, carbs: 9.5, fat: 0.2, icon: '🍊' },
      { name: '石榴', calorie: 63, category: 'vegetable', protein: 1.4, carbs: 16.0, fat: 0.2, icon: '🍎' },
      { name: '椰子', calorie: 231, category: 'vegetable', protein: 2.3, carbs: 26.0, fat: 12.0, icon: '🥥' },
      { name: '牛油果', calorie: 160, category: 'vegetable', protein: 2.0, carbs: 9.0, fat: 15.0, icon: '🥑' },

      // ===== 肉类 =====
      { name: '鸡胸肉', calorie: 133, category: 'meat', protein: 31.0, carbs: 0.0, fat: 1.2, icon: '🍗' },
      { name: '鸡腿肉', calorie: 181, category: 'meat', protein: 27.0, carbs: 0.0, fat: 8.0, icon: '🍗' },
      { name: '鸡翅', calorie: 194, category: 'meat', protein: 26.0, carbs: 0.0, fat: 10.0, icon: '🍗' },
      { name: '鸡爪', calorie: 254, category: 'meat', protein: 23.9, carbs: 2.7, fat: 16.4, icon: '🍗' },
      { name: '牛肉', calorie: 125, category: 'meat', protein: 26.0, carbs: 0.0, fat: 3.0, icon: '🥩' },
      { name: '牛腩', calorie: 177, category: 'meat', protein: 20.0, carbs: 0.0, fat: 10.0, icon: '🥩' },
      { name: '牛排', calorie: 271, category: 'meat', protein: 26.0, carbs: 0.0, fat: 18.0, icon: '🥩' },
      { name: '肥牛', calorie: 219, category: 'meat', protein: 18.0, carbs: 0.0, fat: 15.0, icon: '🥩' },
      { name: '猪肉', calorie: 143, category: 'meat', protein: 21.0, carbs: 0.0, fat: 6.2, icon: '🥓' },
      { name: '里脊肉', calorie: 155, category: 'meat', protein: 24.0, carbs: 0.0, fat: 6.0, icon: '🥓' },
      { name: '五花肉', calorie: 395, category: 'meat', protein: 14.0, carbs: 0.0, fat: 37.0, icon: '🥓' },
      { name: '排骨', calorie: 164, category: 'meat', protein: 22.0, carbs: 0.0, fat: 8.0, icon: '🍖' },
      { name: '猪蹄', calorie: 260, category: 'meat', protein: 22.0, carbs: 0.0, fat: 18.0, icon: '🥓' },
      { name: '猪肝', calorie: 129, category: 'meat', protein: 22.0, carbs: 3.0, fat: 3.5, icon: '🥩' },
      { name: '羊肉', calorie: 118, category: 'meat', protein: 20.0, carbs: 0.0, fat: 4.0, icon: '🥩' },
      { name: '羊排', calorie: 294, category: 'meat', protein: 20.0, carbs: 0.0, fat: 23.0, icon: '🥩' },
      { name: '腊肉', calorie: 349, category: 'meat', protein: 12.0, carbs: 2.0, fat: 33.0, icon: '🥓' },
      { name: '火腿', calorie: 312, category: 'meat', protein: 18.0, carbs: 1.0, fat: 26.0, icon: '🥓' },
      { name: '香肠', calorie: 290, category: 'meat', protein: 12.0, carbs: 4.0, fat: 26.0, icon: '🌭' },
      { name: '培根', calorie: 326, category: 'meat', protein: 15.0, carbs: 1.0, fat: 30.0, icon: '🥓' },

      // ===== 水产类 =====
      { name: '鱼肉', calorie: 90, category: 'seafood', protein: 20.0, carbs: 0.0, fat: 1.0, icon: '🐟' },
      { name: '鲫鱼', calorie: 93, category: 'seafood', protein: 18.0, carbs: 0.0, fat: 2.5, icon: '🐟' },
      { name: '草鱼', calorie: 113, category: 'seafood', protein: 16.0, carbs: 0.0, fat: 5.2, icon: '🐟' },
      { name: '鲈鱼', calorie: 105, category: 'seafood', protein: 19.0, carbs: 0.0, fat: 3.0, icon: '🐟' },
      { name: '三文鱼', calorie: 139, category: 'seafood', protein: 20.0, carbs: 0.0, fat: 6.5, icon: '🍣' },
      { name: '鳕鱼', calorie: 88, category: 'seafood', protein: 18.0, carbs: 0.0, fat: 2.0, icon: '🐟' },
      { name: '虾', calorie: 85, category: 'seafood', protein: 18.0, carbs: 0.5, fat: 0.5, icon: '🦐' },
      { name: '基围虾', calorie: 101, category: 'seafood', protein: 21.0, carbs: 0.0, fat: 2.0, icon: '🦐' },
      { name: '小龙虾', calorie: 93, category: 'seafood', protein: 18.0, carbs: 0.0, fat: 2.5, icon: '🦞' },
      { name: '大闸蟹', calorie: 102, category: 'seafood', protein: 17.0, carbs: 0.0, fat: 3.5, icon: '🦀' },
      { name: '螃蟹', calorie: 97, category: 'seafood', protein: 15.0, carbs: 0.0, fat: 4.0, icon: '🦀' },
      { name: '扇贝', calorie: 60, category: 'seafood', protein: 11.0, carbs: 2.0, fat: 1.0, icon: '🦪' },
      { name: '生蚝', calorie: 57, category: 'seafood', protein: 10.0, carbs: 3.0, fat: 1.5, icon: '🦪' },
      { name: '海参', calorie: 78, category: 'seafood', protein: 16.0, carbs: 2.0, fat: 0.2, icon: '🐙' },
      { name: '鱿鱼', calorie: 84, category: 'seafood', protein: 15.0, carbs: 2.0, fat: 1.5, icon: '🦑' },
      { name: '墨鱼', calorie: 83, category: 'seafood', protein: 15.0, carbs: 1.0, fat: 2.5, icon: '🐙' },
      { name: '田螺', calorie: 60, category: 'seafood', protein: 12.0, carbs: 2.0, fat: 1.0, icon: '🐚' },
      { name: '海带', calorie: 12, category: 'seafood', protein: 1.0, carbs: 2.1, fat: 0.1, icon: '🌿' },
      { name: '紫菜', calorie: 35, category: 'seafood', protein: 5.0, carbs: 5.0, fat: 0.5, icon: '🌿' },

      // ===== 蛋奶类 =====
      { name: '鸡蛋', calorie: 144, category: 'egg', protein: 13.3, carbs: 1.5, fat: 9.5, icon: '🥚' },
      { name: '蛋白', calorie: 60, category: 'egg', protein: 11.0, carbs: 1.0, fat: 0.2, icon: '🥚' },
      { name: '蛋黄', calorie: 322, category: 'egg', protein: 15.0, carbs: 3.0, fat: 27.0, icon: '🥚' },
      { name: '鸭蛋', calorie: 180, category: 'egg', protein: 13.0, carbs: 1.0, fat: 14.0, icon: '🥚' },
      { name: '鹅蛋', calorie: 196, category: 'egg', protein: 13.0, carbs: 2.0, fat: 15.0, icon: '🥚' },
      { name: '鹌鹑蛋', calorie: 160, category: 'egg', protein: 13.0, carbs: 1.0, fat: 12.0, icon: '🥚' },
      { name: '牛奶', calorie: 54, category: 'egg', protein: 3.0, carbs: 3.4, fat: 3.2, icon: '🥛' },
      { name: '脱脂牛奶', calorie: 33, category: 'egg', protein: 3.4, carbs: 5.0, fat: 0.1, icon: '🥛' },
      { name: '酸奶', calorie: 72, category: 'egg', protein: 2.9, carbs: 9.3, fat: 2.7, icon: '🍶' },
      { name: '奶酪', calorie: 328, category: 'egg', protein: 25.0, carbs: 2.0, fat: 25.0, icon: '🧀' },
      { name: '芝士', calorie: 303, category: 'egg', protein: 23.0, carbs: 3.0, fat: 23.0, icon: '🧀' },
      { name: '奶油', calorie: 340, category: 'egg', protein: 2.0, carbs: 3.0, fat: 37.0, icon: '🍰' },
      { name: '黄油', calorie: 888, category: 'egg', protein: 1.0, carbs: 0.0, fat: 99.0, icon: '🧈' },

      // ===== 饮品类 =====
      { name: '白开水', calorie: 0, category: 'drink', protein: 0, carbs: 0, fat: 0, icon: '💧' },
      { name: '矿泉水', calorie: 0, category: 'drink', protein: 0, carbs: 0, fat: 0, icon: '💧' },
      { name: '可乐', calorie: 42, category: 'drink', protein: 0.0, carbs: 11.0, fat: 0.0, icon: '🥤' },
      { name: '雪碧', calorie: 41, category: 'drink', protein: 0.0, carbs: 10.6, fat: 0.0, icon: '🥤' },
      { name: '橙汁', calorie: 45, category: 'drink', protein: 0.7, carbs: 10.4, fat: 0.2, icon: '🍊' },
      { name: '苹果汁', calorie: 46, category: 'drink', protein: 0.1, carbs: 11.0, fat: 0.1, icon: '🍎' },
      { name: '椰汁', calorie: 45, category: 'drink', protein: 0.5, carbs: 10.0, fat: 0.5, icon: '🥥' },
      { name: '豆浆', calorie: 33, category: 'drink', protein: 2.9, carbs: 1.8, fat: 1.6, icon: '🥛' },
      { name: '咖啡', calorie: 1, category: 'drink', protein: 0.1, carbs: 0.0, fat: 0.0, icon: '☕' },
      { name: '拿铁咖啡', calorie: 67, category: 'drink', protein: 3.4, carbs: 5.0, fat: 3.5, icon: '☕' },
      { name: '卡布奇诺', calorie: 75, category: 'drink', protein: 4.0, carbs: 6.0, fat: 4.0, icon: '☕' },
      { name: '奶茶', calorie: 78, category: 'drink', protein: 0.8, carbs: 14.0, fat: 2.0, icon: '🧋' },
      { name: '珍珠奶茶', calorie: 102, category: 'drink', protein: 1.0, carbs: 18.0, fat: 2.5, icon: '🧋' },
      { name: '柠檬水', calorie: 20, category: 'drink', protein: 0.0, carbs: 5.0, fat: 0.0, icon: '🍋' },
      { name: '蜂蜜水', calorie: 30, category: 'drink', protein: 0.0, carbs: 8.0, fat: 0.0, icon: '🍯' },
      { name: '红茶', calorie: 1, category: 'drink', protein: 0.1, carbs: 0.2, fat: 0.0, icon: '🍵' },
      { name: '绿茶', calorie: 1, category: 'drink', protein: 0.1, carbs: 0.2, fat: 0.0, icon: '🍵' },
      { name: '菊花茶', calorie: 1, category: 'drink', protein: 0.0, carbs: 0.2, fat: 0.0, icon: '🌼' },
      { name: '红牛', calorie: 45, category: 'drink', protein: 0.0, carbs: 11.0, fat: 0.0, icon: '🐂' },

      // ===== 零食类 =====
      { name: '饼干', calorie: 435, category: 'snack', protein: 5.4, carbs: 65.0, fat: 16.0, icon: '🍪' },
      { name: '奥利奥', calorie: 502, category: 'snack', protein: 5.0, carbs: 65.0, fat: 25.0, icon: '🍪' },
      { name: '苏打饼干', calorie: 408, category: 'snack', protein: 8.0, carbs: 65.0, fat: 13.0, icon: '🍪' },
      { name: '巧克力', calorie: 546, category: 'snack', protein: 5.0, carbs: 60.0, fat: 33.0, icon: '🍫' },
      { name: '士力架', calorie: 488, category: 'snack', protein: 9.0, carbs: 55.0, fat: 25.0, icon: '🥜' },
      { name: '薯片', calorie: 548, category: 'snack', protein: 7.0, carbs: 53.0, fat: 33.0, icon: '🍟' },
      { name: '薯条', calorie: 312, category: 'snack', protein: 3.0, carbs: 42.0, fat: 15.0, icon: '🍟' },
      { name: '爆米花', calorie: 387, category: 'snack', protein: 13.0, carbs: 55.0, fat: 15.0, icon: '🍿' },
      { name: '坚果', calorie: 607, category: 'snack', protein: 20.0, carbs: 15.0, fat: 54.0, icon: '🥜' },
      { name: '花生', calorie: 567, category: 'snack', protein: 25.0, carbs: 13.0, fat: 45.0, icon: '🥜' },
      { name: '瓜子', calorie: 597, category: 'snack', protein: 23.0, carbs: 17.0, fat: 53.0, icon: '🌻' },
      { name: '核桃', calorie: 654, category: 'snack', protein: 15.0, carbs: 14.0, fat: 65.0, icon: '🥜' },
      { name: '杏仁', calorie: 578, category: 'snack', protein: 21.0, carbs: 19.0, fat: 50.0, icon: '🥜' },
      { name: '腰果', calorie: 560, category: 'snack', protein: 18.0, carbs: 30.0, fat: 44.0, icon: '🥜' },
      { name: '蛋糕', calorie: 347, category: 'snack', protein: 6.0, carbs: 45.0, fat: 17.0, icon: '🍰' },
      { name: '奶油蛋糕', calorie: 378, category: 'snack', protein: 5.0, carbs: 42.0, fat: 22.0, icon: '🎂' },
      { name: '面包', calorie: 265, category: 'snack', protein: 8.0, carbs: 50.0, fat: 3.0, icon: '🍞' },
      { name: '蛋挞', calorie: 246, category: 'snack', protein: 5.0, carbs: 30.0, fat: 12.0, icon: '🥐' },
      { name: '蛋黄酥', calorie: 386, category: 'snack', protein: 8.0, carbs: 40.0, fat: 22.0, icon: '🥚' },
      { name: '麻薯', calorie: 268, category: 'snack', protein: 4.0, carbs: 55.0, fat: 3.0, icon: '🍡' },
      { name: '棉花糖', calorie: 321, category: 'snack', protein: 0.0, carbs: 80.0, fat: 0.0, icon: '☁️' },
      { name: '果冻', calorie: 42, category: 'snack', protein: 0.0, carbs: 10.0, fat: 0.0, icon: '🍮' },
      { name: '海苔', calorie: 177, category: 'snack', protein: 5.0, carbs: 25.0, fat: 5.0, icon: '🍘' },
      { name: '海苔碎', calorie: 129, category: 'snack', protein: 12.0, carbs: 14.0, fat: 4.0, icon: '🍘' },

      // ===== 汤品类 =====
      { name: '紫菜蛋花汤', calorie: 25, category: 'soup', protein: 2.0, carbs: 2.0, fat: 1.0, icon: '🍲' },
      { name: '西红柿蛋汤', calorie: 30, category: 'soup', protein: 2.5, carbs: 3.0, fat: 1.0, icon: '🍲' },
      { name: '鸡蛋羹', calorie: 66, category: 'soup', protein: 6.0, carbs: 2.0, fat: 4.0, icon: '🍳' },
      { name: '豆腐汤', calorie: 28, category: 'soup', protein: 2.5, carbs: 2.0, fat: 1.0, icon: '🍲' },
      { name: '酸辣汤', calorie: 48, category: 'soup', protein: 2.0, carbs: 5.0, fat: 2.0, icon: '🍲' },
      { name: '疙瘩汤', calorie: 56, category: 'soup', protein: 3.0, carbs: 8.0, fat: 1.5, icon: '🍲' },
      { name: '玉米排骨汤', calorie: 85, category: 'soup', protein: 8.0, carbs: 5.0, fat: 4.0, icon: '🍲' },
      { name: '鸡汤', calorie: 44, category: 'soup', protein: 5.0, carbs: 1.0, fat: 2.0, icon: '🍗' },
      { name: '鱼汤', calorie: 38, category: 'soup', protein: 5.0, carbs: 1.0, fat: 1.5, icon: '🐟' },
      { name: '羊肉汤', calorie: 56, category: 'soup', protein: 6.0, carbs: 2.0, fat: 3.0, icon: '🍲' },
      { name: '米糊', calorie: 48, category: 'soup', protein: 1.0, carbs: 10.0, fat: 0.5, icon: '🥣' },

      // ===== 豆制品 =====
      { name: '豆腐', calorie: 81, category: 'other', protein: 8.0, carbs: 3.0, fat: 4.0, icon: '🧈' },
      { name: '嫩豆腐', calorie: 61, category: 'other', protein: 6.0, carbs: 2.0, fat: 3.0, icon: '🧈' },
      { name: '老豆腐', calorie: 100, category: 'other', protein: 10.0, carbs: 4.0, fat: 5.0, icon: '🧈' },
      { name: '豆腐皮', calorie: 302, category: 'other', protein: 44.0, carbs: 8.0, fat: 12.0, icon: '🧈' },
      { name: '豆腐干', calorie: 140, category: 'other', protein: 12.0, carbs: 4.0, fat: 8.0, icon: '🧈' },
      { name: '腐竹', calorie: 459, category: 'other', protein: 44.0, carbs: 22.0, fat: 27.0, icon: '🧈' },

      // ===== 调味料（低用量不计入热量）=====
      { name: '酱油', calorie: 63, category: 'other', protein: 8.0, carbs: 6.0, fat: 0.1, icon: '🧂' },
      { name: '醋', calorie: 11, category: 'other', protein: 0.0, carbs: 2.0, fat: 0.0, icon: '🧂' },
      { name: '盐', calorie: 0, category: 'other', protein: 0, carbs: 0, fat: 0, icon: '🧂' },
      { name: '白糖', calorie: 400, category: 'other', protein: 0.0, carbs: 100.0, fat: 0.0, icon: '🍬' },
      { name: '红糖', calorie: 389, category: 'other', protein: 0.5, carbs: 98.0, fat: 0.0, icon: '🍬' },
      { name: '蜂蜜', calorie: 321, category: 'other', protein: 0.3, carbs: 80.0, fat: 0.0, icon: '🍯' },
      { name: '芝麻酱', calorie: 618, category: 'other', protein: 22.0, carbs: 10.0, fat: 58.0, icon: '🥜' },
      { name: '番茄酱', calorie: 112, category: 'other', protein: 1.0, carbs: 26.0, fat: 0.5, icon: '🍅' },
      { name: '沙拉酱', calorie: 724, category: 'other', protein: 1.0, carbs: 4.0, fat: 79.0, icon: '🥗' }
    ]
  },

  onLaunch() {
    // 初始化数据
    this.initData()
  },

  initData() {
    const foods = wx.getStorageSync('foods')
    if (!foods || foods.length === 0) {
      // 导入预置食品
      const presetFoods = this.globalData.presetFoods.map((food, index) => ({
        ...food,
        id: 'preset_' + index,
        createdAt: Date.now()
      }))
      wx.setStorageSync('foods', presetFoods)
    }

    // 初始化设置
    const settings = wx.getStorageSync('settings')
    if (!settings) {
      wx.setStorageSync('settings', this.globalData.defaultSettings)
    }

    // 初始化饮食记录
    const records = wx.getStorageSync('records')
    if (!records) {
      wx.setStorageSync('records', [])
    }
  }
})

const API = {
  OPERACTION_SUCCESS: '/mock/success.json',
  // Dictionary
  DICT_LIST: '/mock/dict/list.json',
  // Three
  THREE_LIST: '/mock/three/list.json',

  LOGIN_URL: '/mock/success.json', // 登录
  USER_INFO: '/mock/success.json', // 登录后查询用户信息

  // -- SYSTEM --
  // User
  USER_PAGE: '/mock/user/page.json',
  // Role
  ROLE_PAGE: '/mock/role/page.json',
  // Menu
  MENU_LIST: '/mock/menus.json',

  // -- PROJECT --
  PROJECT_PAGE: '/mock/project/page.json',

  // -- Dashboard --
  DASHBOARD_ANTV_G2: '/mock/dashboard/antv-g2.json',
  /// ********************** 个人中心 **********************
  PERSONAL_OVERVIEW: '/mock/personal/overview.json', // 个人中心-总览数据
  PERSONAL_MONTH_EVENTS: function (month) { // 个人中心-月度待办/事件
    return `/mock/personal/month_events_${month}.json`
  },
  PERSONAL_MESSAGES: '/mock/personal/top_messages.json', // 个人前5项消息
  PERSONAL_NOTIFICATIONS: '/mock/personal/top_notifications.json', // 个人前5项通知
  PERSONAL_TASKS: '/mock/personal/top_tasks.json', // 个人前5项待办/任务
  /// ********************** 电商模块 **********************
  ECOMMERCE_SHOP: '/mock/e-commerce/shop/page.json', // 店铺分页列表
  ECOMMERCE_SHOP_LIST: '/mock/e-commerce/shop/list.json', // 店铺全量查询
  ECOMMERCE_PRODUCT: '/mock/e-commerce/product/page.json', // 商品分页列表
  ECOMMERCE_PRODUCT_INFO: function (id) { // 商品详情
    return `/mock/e-commerce/product/info_${id}.json`
  },
  ECOMMERCE_PRODUCT_CODE_NUMBER: function (code) { // 查询商品编号序号
    return `/mock/e-commerce/product/code_num_${code}.json`
  },
  ECOMMERCE_BRAND: '/mock/e-commerce/brand/page.json', // 品牌分页列表
  ECOMMERCE_BRAND_LIST: '/mock/e-commerce/brand/list.json', // 品牌全量查询
  ECOMMERCE_CATEGORY: '/mock/e-commerce/category/page.json', // 分类分页列表
  ECOMMERCE_CATEGORY_LIST: '/mock/e-commerce/category/list.json', // 分类全量数据，属全局数据
  ECOMMERCE_CATEGORY_CHILDREN: function (id) {
    return `/mock/e-commerce/category/list_${id}.json` // 子分类全量查询
  },
  ECOMMERCE_STANDARD: '/mock/e-commerce/standard/page.json', // 规格标准分页列表
  ECOMMERCE_STANDARD_LIST: '/mock/e-commerce/standard/list.json', // 查询全量规格标准数据，属全局数据
  ECOMMERCE_ATTRIBUTE: function (standardId, i) { // standardId: 规格标准ID  商品SKU/SPU分页列表 i: 0->SKU / 1->SPU
    return `/mock/e-commerce/attribute/page_${standardId}_${i}.json`
  },
  ECOMMERCE_ATTRIBUTE_LIST: function (standardId) { // 获取指定标准的SKU及SPU信息
    return `/mock/e-commerce/attribute/list_${standardId}.json`
  },
  ECOMMERCE_ATTRIBUTE_INFO: function (i, attributeId) { // i: 0->SKU / 1->SPU  attributeId: 属性ID
    return `/mock/e-commerce/attribute/info_${i}_${attributeId}.json`
  }
}

export default API
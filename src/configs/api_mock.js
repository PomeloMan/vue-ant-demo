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



  /// ********************** 电商模块 **********************
  ECOMMERCE_SHOP: '/mock/e-commerce/shop/page.json', // 店铺分页列表
  ECOMMERCE_PRODUCT: '/mock/e-commerce/product/page.json', // 商品分页列表
  ECOMMERCE_BRAND: '/mock/e-commerce/brand/page.json', // 品牌分页列表
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
  ECOMMERCE_ATTRIBUTE_INFO: function (i, attributeId) { // i: 0->SKU / 1->SPU  attributeId: 属性ID
    return `/mock/e-commerce/attribute/info_${i}_${attributeId}.json`
  }
}

export default API
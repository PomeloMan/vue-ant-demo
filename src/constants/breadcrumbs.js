export default {
  'main': [{ 'name': 'home' }],
  'dashboard-antv-g2': [
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.dashboard', 'url': '/main/dashboard' },
    { 'name': 'breadcrumb.antvg2' }
  ],
  'project': [
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.project' }
  ],
  /// ********************** 系统模块 **********************
  'system': [],
  // 用户管理
  'system-user': [
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.system', 'url': '/main/system' },
    { 'name': 'breadcrumb.user' }
  ],
  // 角色管理
  'system-role': [
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.system', 'url': '/main/system' },
    { 'name': 'breadcrumb.role' }
  ],
  // 权限管理
  'system-auth': [
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.system', 'url': '/main/system' },
    { 'name': 'breadcrumb.auth' }
  ],
  // 菜单管理
  'system-menu': [
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.system', 'url': '/main/system' },
    { 'name': 'breadcrumb.menu' }
  ],
  /// ********************** 电商模块 **********************
  'ec-shop': [ // 商户
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.e-commerce' },
    { 'name': 'breadcrumb.ec-shop', 'url': '/main/e-commerce/shop' }
  ],
  'ec-shop-info': [ // 商户详情
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.e-commerce' },
    { 'name': 'breadcrumb.ec-shop', 'url': '/main/e-commerce/shop' },
    {
      'info': (isnew) => {
        if (isnew) {
          return 'breadcrumb.add'
        } else {
          return 'breadcrumb.detail'
        }
      }, 'url': '/main/e-commerce/shop/{1}'
    }
  ],
  'ec-brand': [ // 品牌
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.e-commerce' },
    { 'name': 'breadcrumb.ec-brand', 'url': '/main/e-commerce/brand' }
  ],
  'ec-category': [ // 分类
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.e-commerce' },
    { 'name': 'breadcrumb.ec-category', 'url': '/main/e-commerce/category' }
  ],
  'ec-standard': [ // 规格标准
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.e-commerce' },
    { 'name': 'breadcrumb.ec-standard', 'url': '/main/e-commerce/standard' }
  ],
  'ec-attribute': [ // 属性/参数 SKU/SPU
    { 'name': 'breadcrumb.home', 'url': '/' },
    { 'name': 'breadcrumb.e-commerce' },
    { 'name': 'breadcrumb.ec-standard', 'url': '/main/e-commerce/standard' },
    { 'name': 'breadcrumb.ec-attribute', 'url': '/main/e-commerce/attribute' }
  ]
}

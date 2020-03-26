import Mock_API from './api_mock'

const API = {
  MENU_LIST: '/menus',

  // -- 权限管理 --
  // SYS_MENU_PAGE: `${process.env.VUE_APP_USER_URL}/auth/page`,
  SYS_MENU_LIST: `${process.env.VUE_APP_USER_URL}/auth/list`,
  SYS_MENU: `${process.env.VUE_APP_USER_URL}/auth`,
  SYS_ROLE_PAGE: `${process.env.VUE_APP_USER_URL}/role/page`,
  SYS_ROLE: `${process.env.VUE_APP_USER_URL}/role`
}

let api
const mode = process.env.VUE_APP_CURRENT_MODE
if (mode === 'mock') {
  api = { ...API, ...Mock_API }
} else {
  api = { ...Mock_API, ...API }
}

export default api
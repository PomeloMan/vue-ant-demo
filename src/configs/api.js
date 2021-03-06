import Mock_API from './api_mock'

const API = {
  MENU_LIST: '/menus',

  // -- OAuth2 --
  OAUTH_TOKEN: `${process.env.VUE_APP_USER_SERVER_URL}/oauth/token`,
  // -- 权限管理 --
  // SYS_MENU_PAGE: `${process.env.VUE_APP_USER_URL}/auth/page`,
  SYS_MENU_LIST: `${process.env.VUE_APP_USER_SERVER_URL}/auth/list`,
  SYS_MENU: `${process.env.VUE_APP_USER_SERVER_URL}/auth`,
  SYS_ROLE_PAGE: `${process.env.VUE_APP_USER_SERVER_URL}/role/page`,
  SYS_ROLE_LIST: `${process.env.VUE_APP_USER_SERVER_URL}/role/list`,
  SYS_ROLE: `${process.env.VUE_APP_USER_SERVER_URL}/role`,
  SYS_USER_PAGE: `${process.env.VUE_APP_USER_SERVER_URL}/user/page`,
  SYS_USER: `${process.env.VUE_APP_USER_SERVER_URL}/user`,

  FILE_USER_AVATAR_UPLOAD: `${process.env.VUE_APP_FILE_SERVER_URL}/file/user/avatar/upload`
}

let api
const mode = process.env.VUE_APP_CURRENT_MODE
if (mode === 'mock') {
  api = { ...API, ...Mock_API }
} else {
  api = { ...Mock_API, ...API }
}

export default api
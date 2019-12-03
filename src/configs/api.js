import Mock_API from './api_mock'

const API = {
  MENU_LIST: '/menus'
}

let api
const mode = process.env.VUE_APP_CURRENT_MODE
if (mode === 'mock') {
  api = Mock_API
} else {
  api = API
}

export default api
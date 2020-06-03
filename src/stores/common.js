import { OAuthToken } from '../models/oauth_token'
import CONSTS from '../constants'
import { storage } from '../configs/storage'
import { User } from '../models/user'
import CONSTANTS from '@/constants'

export default {
  namespaced: true,
  state: {
    locale: CONSTANTS.DEFAULT_LOCALE, // 国际化
    collapsed: false, // 侧边栏展开/收缩
    dicts: [], // 字典数据
    mapOfDict: {}, // 字典数据
    oauthToken: new OAuthToken(), // OAuth Token
    user: new User()
  },
  mutations: {
    updateLocale(state, locale) {
      state.locale = locale
      this.commit('common/updateDicts', { dicts: state.dicts, locale: locale.locale.slice(0, 2) })
    },
    updateCollapsed(state, collapsed) {
      state.collapsed = collapsed
    },
    updateDicts(state, { dicts, locale }) {
      state.dicts = dicts
      const mapOfDict = new Object()
      dicts.forEach(dict => {
        const key = dict.code
        mapOfDict[key] = dict[`value_${locale}`]
      });
      state.mapOfDict = mapOfDict
    },
    updateOauthToken(state, oauthToken) {
      state.oauthToken = oauthToken
      storage.setItem(CONSTS.STORAGE_OAUTH2_TOKEN_INFO, oauthToken)
      storage.setItem(CONSTS.OAUTH2_ACCESS_TOKEN, oauthToken.access_token)
    },
    updateUser(state, user) {
      state.user = user
      storage.setItem(CONSTS.STORAGE_USER, user, true)
    }
  },
  actions: {
    updateLocale(context, locale) {
      context.commit('updateLocale', locale)
    },
    updateCollapsed(context, collapsed) {
      context.commit('updateCollapsed', collapsed)
    },
    updateDicts(context, { val, locale }) {
      context.commit('updateDicts', { dicts: val, locale })
    },
    updateOauthToken(context, oauthToken) {
      context.commit('updateOauthToken', oauthToken)
    },
    updateUser(context, user) {
      context.commit('updateUser', user)
    }
  }
}

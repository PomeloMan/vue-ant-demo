import lightVars from '../styles/light.json';
import darkVars from '../styles/dark.json';

export default {
  namespaced: true,
  state: {
    // 设置-个性化-颜色
    colors: [
      // 主色
      {
        key: '@primary-color',
        label: 'settings.primary-color',
        description: 'settings.primary-color-extra'
      },
    ],
    // 主题
    themes: [
      {
        key: 1,
        label: 'settings.light-theme',
        mode: 'light',
        vars: lightVars,
        colors: ['#001529', '#fff', '#f0f2f5'] // [侧边栏背景色，头部背景色，主内容背景色]
      },
      { key: 2, label: 'settings.dark-theme', mode: 'dark', vars: darkVars, colors: ['#1f1f1f', '#1f1f1f', '#000'] },
    ]
  }
}

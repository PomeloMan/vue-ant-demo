# vue-ant-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 项目结构
```
├── dist
├── node_modules
├── public
│   ├── icons // 图标
│   ├── mock // 模拟数据
│   ├── tinymce // 富文本编辑器
├── src
│   ├── animations
│   │   ├── ani.vue // mojs动画组件库
│   │   ├── burst.js // mojs动画组件库
│   ├── assets
│   │   ├── css
│   │   │   ├── ant.custom.css // Ant Design组件覆盖样式(>>>)
│   │   │   ├── ant.custom.scss // Ant Design组件覆盖样式
│   │   │   ├── common.scss // 项目通用样式
│   │   │   ├── constant.scss // 项目样式常量文件
│   │   ├── logo.png
│   │   ├── style.scss // 样式主入口
│   ├── components
│   │   ├── layouts
│   │   │   ├── footer.vue // 页脚组件（分页）
│   │   │   ├── header.vue // 页眉组件（路由导航）
│   │   │   ├── index.js
│   │   ├── mixins
│   │   │   ├── area.js // 中国省市区县数据
│   │   │   ├── base-info.js // 详情共用方法数据
│   │   │   ├── base-table.js // 表格共用方法数据
│   │   │   ├── keep-alive.js // 组件缓存
│   │   │   ├── perfect-scrollbar.js // 滚动条组件
│   │   │   ├── validator.js // 表单验证
│   │   ├── plugins
│   │   │   ├── editable-cell.vue // 表格单元格编辑组件
│   │   │   ├── image-carousel-modal.vue // 图片走马灯模态框
│   │   │   ├── image-upload.vue // 图片上传组件
│   │   │   ├── lottie-web.vue //
│   │   │   ├── tinymce-editor.vue // 富文本编辑器
│   │   ├── index.js
│   │   ├── store.component.vue
│   ├── configs
│   │   ├── api_mock.js // 模拟API
│   │   ├── api.js // API
│   │   ├── http.js // axios
│   │   ├── nprogress.js // 进度条组件
│   │   ├── router.js // 路由
│   │   ├── storage.js
│   │   ├── store.js // 状态管理
│   ├── constants
│   │   ├── area.js // 中国省市区县数据
│   │   ├── breadcrumbs.js // 页签导航栏数据
│   │   ├── i18n.js // 国际化
│   │   ├── index.js
│   ├── icons // 自定义svg配置
│   ├── locales // 国际化
│   ├── models
│   ├── pages
│   ├── pipes
│   ├── stores
│   ├── utils
│   ├── App.vue
│   ├── i18n.js
│   ├── main.js
├── .dockerignore
├── .env
├── .env.dev
├── .env.gh
├── .env.prod
├── .env.test
├── .gitignore
├── .prettierrc.json
├── babel.config.js
├── deploy.bat
├── deploy.js
├── Dockerfile
├── nginx.conf
├── package.json
├── README.md
├── vue.config.js
```
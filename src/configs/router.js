import Vue from 'vue'
import VueRouter from 'vue-router'
import BREADCRUMB from '@/constants/breadcrumbs'
import LoginComponent from '@/pages/login'
import NotFoundComponent from '@/pages/error/404'

import NProgress from 'nprogress'
// 添加页面进度条
import './nprogress'

// 解决Vue-router3.1后$router.push()方法改为Promise后，控制台报[NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}]的错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/main'
}, {
  name: 'login',
  path: '/login',
  component: LoginComponent
}, {
  name: 'main',
  path: '/main',
  meta: {
    breadcrumbs: BREADCRUMB['main']
  },
  component: () => import(/* webpackChunkName: "group-main" */ '../pages/main'),
  children: [
    // 403
    {
      name: '403',
      path: '/forbidden',
      component: () => import(/* webpackChunkName: "group-main" */ '../pages/error/403')
    },
    // 500
    {
      name: '500',
      path: '/server-error',
      component: () => import(/* webpackChunkName: "group-main" */ '../pages/error/500')
    },
    // Three Module
    {
      name: 'three',
      path: 'three',
      component: () => import(/* webpackChunkName: "group-three" */ '../pages/three')
    },
    // Dashboard Module
    {
      name: 'dashboard',
      path: 'dashboard',
      meta: {
        breadcrumbs: BREADCRUMB['dashboard']
      },
      component: () => import(/* webpackChunkName: "group-dashboard" */ '../pages/dashboard/dashboard')
    }, {
      name: 'dashboard-antv-g2',
      path: 'dashboard/antv-g2',
      meta: {
        breadcrumbs: BREADCRUMB['dashboard-antv-g2']
      },
      component: () => import(/* webpackChunkName: "group-dashboard" */ '../pages/dashboard/antv-g2')
    }, {
      name: 'dashboard-echarts',
      path: 'dashboard/echarts',
      meta: {
        breadcrumbs: BREADCRUMB['dashboard-echarts']
      },
      component: () => import(/* webpackChunkName: "group-dashboard" */ '../pages/dashboard/echarts')
    },
    // Project Module
    {
      name: 'project',
      path: 'project',
      meta: {
        breadcrumbs: BREADCRUMB['project']
      },
      component: () => import(/* webpackChunkName: "group-project" */ '../pages/project')
    },
    // System Module
    {
      path: 'system',
      component: () => import(/* webpackChunkName: "group-system" */ '../pages/dashboard/dashboard')
    }, {
      name: 'system-user',
      path: 'system/user',
      meta: {
        breadcrumbs: BREADCRUMB['system-user']
      },
      component: () => import(/* webpackChunkName: "group-system" */ '../pages/system/user/index.vue')
    }, {
      name: 'system-role',
      path: 'system/role',
      meta: {
        breadcrumbs: BREADCRUMB['system-role']
      },
      component: () => import(/* webpackChunkName: "group-system" */ '../pages/system/role/index.vue')
    }, {
      name: 'system-menu',
      path: 'system/menu',
      meta: {
        breadcrumbs: BREADCRUMB['system-menu']
      },
      component: () => import(/* webpackChunkName: "group-system" */ '../pages/system/menu/index.vue')
    },

    /// ********************** 电商模块 **********************
    // 商户
    { name: 'ec-shop', path: 'e-commerce/shop', meta: { breadcrumbs: BREADCRUMB['ec-shop'] }, component: () => import(/* webpackChunkName: "e-commerce" */ '../pages/e-commerce/shop/tabs.vue') },
    { name: 'ec-shop-info', path: 'e-commerce/shop/:id', meta: { breadcrumbs: BREADCRUMB['ec-shop-info'] }, component: () => import(/* webpackChunkName: "e-commerce" */ '../pages/e-commerce/shop/info.vue') },
    // 品牌
    { name: 'ec-brand', path: 'e-commerce/brand', meta: { breadcrumbs: BREADCRUMB['ec-brand'] }, component: () => import(/* webpackChunkName: "e-commerce" */ '../pages/e-commerce/brand/index.vue') },
    // 分类
    { name: 'ec-category', path: 'e-commerce/category', meta: { breadcrumbs: BREADCRUMB['ec-category'] }, component: () => import(/* webpackChunkName: "e-commerce" */ '../pages/e-commerce/category/index.vue') },
    // 规格标准
    { name: 'ec-standard', path: 'e-commerce/standard', meta: { breadcrumbs: BREADCRUMB['ec-standard'] }, component: () => import(/* webpackChunkName: "e-commerce" */ '../pages/e-commerce/standard/index.vue') },
    // SKU/SPU
    { name: 'ec-attribute', path: 'e-commerce/attribute/:standardId', meta: { breadcrumbs: BREADCRUMB['ec-attribute'] }, component: () => import(/* webpackChunkName: "e-commerce" */ '../pages/e-commerce/attribute/tabs.vue') },
    // 商品
    { name: 'ec-product', path: 'e-commerce/product', meta: { breadcrumbs: BREADCRUMB['ec-product'] }, component: () => import(/* webpackChunkName: "e-commerce" */ '../pages/e-commerce/product/tabs.vue') },
    { name: 'ec-product-info', path: 'e-commerce/product/:id', meta: { breadcrumbs: BREADCRUMB['ec-product-info'] }, component: () => import(/* webpackChunkName: "e-commerce" */ '../pages/e-commerce/product/info.vue') }
  ]
}, {
  name: '404',
  path: '*',
  component: NotFoundComponent
}]

const router = new VueRouter({
  mode: process.env.VUE_APP_ENV === 'gh' ? 'hash' : 'history',
  routes: routes
})

// 当路由进入前
router.beforeEach((to, from, next) => {
  //console.log(to, from, next)
  NProgress.start();
  next()
})
// 当路由进入后：关闭进度条
router.afterEach(() => {
  NProgress.done()
})

export default router
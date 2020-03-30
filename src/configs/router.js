import Vue from 'vue'
import VueRouter from 'vue-router'
import BREADCRUMB from '@/constants/breadcrumbs'
import LoginComponent from '@/pages/login'

import NProgress from 'nprogress'
// 添加页面进度条
import './nprogress'
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
      component: () => import(/* webpackChunkName: "group-system" */ '../pages/system/user')
    }, {
      name: 'system-role',
      path: 'system/role',
      meta: {
        breadcrumbs: BREADCRUMB['system-role']
      },
      component: () => import(/* webpackChunkName: "group-system" */ '../pages/system/role')
    }, {
      name: 'system-menu',
      path: 'system/menu',
      meta: {
        breadcrumbs: BREADCRUMB['system-menu']
      },
      component: () => import(/* webpackChunkName: "group-system" */ '../pages/system/menu')
    }
  ]
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
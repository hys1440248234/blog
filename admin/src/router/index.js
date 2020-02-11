import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: () => import(/* webpackChunkName: "group-noIndex" */'@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import(/* webpackChunkName: "group-noIndex" */'@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '面板' }
    }]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '文章管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'addArticle',
        component: () => import(/* webpackChunkName: "group-noIndex" */'@/views/article/AddArticle'),
        name: 'addArticle',
        meta: {
          title: '新增文章'
        }
      },
      {
        path: 'articleList',
        component: () => import(/* webpackChunkName: "group-noIndex" */'@/views/article/ArticleList'),
        name: 'articleList',
        meta: { title: '文章列表' }
      },
      {
        hidden: true,
        path: 'updateArticle/:id',
        component: () => import(/* webpackChunkName: "group-noIndex" */'@/views/article/UpdateArticle'),
        name: 'updateArticle',
        meta: {
          title: '修改文章'
        }
      }
    ]
  },
  {
    path: '我的个人博客',
    component: Layout,
    children: [
      {
        path: 'https://mainhou.com',
        meta: { title: '我的个人博客', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  base: '/admin/', //  基路由, 不会对静态文件的引用产生影响
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

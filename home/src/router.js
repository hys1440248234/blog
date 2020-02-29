import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [{
        path: '/',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          title: '主页·Main、侯的个人博客'
        }
      }]
    },
    {
      path: '/about',
      component: Layout,
      children: [{
        path: '/',
        component: () => import(/* webpackChunkName: "About" */'@/views/About.vue'),
        name: 'about',
        meta: {
          title: '关于我·Main、侯的个人博客'
        }
      }]
    },
    {
      path: '/article/:id',
      component: Layout,
      children: [{
        path: '/',
        component: () => import(/* webpackChunkName: "MyArticle" */'@/views/MyArticle.vue'),
        name: 'article',
        meta: {
          title: '文章·Main、侯的个人博客'
        }
      }]
    },
    {
      name: '404',
      path: '/404',
      meta: {
        title: '页面没找到·Main、侯的个人博客'
      },
      component: () => import(/* webpackChunkName: "404" */'./views/404.vue')
    },
    {
      path: '*',
      meta: {
        title: '页面没找到·Main、侯的个人博客'
      },
      redirect: '/404'
    }
  ]
})

import Vue from 'vue'
import {
  Card, Col, Row, Container, Header, Footer, Main, Menu, MenuItem, Tag, Pagination
} from 'element-ui'
import message from './plugins/message'
import Highlight from './plugins/hightlight'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.component(Card.name, Card)
Vue.component(Col.name, Col)
Vue.component(Row.name, Row)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Footer.name, Footer)
Vue.component(Main.name, Main)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Menu.name, Menu)
Vue.component(Tag.name, Tag)
Vue.component(Pagination.name, Pagination)

Vue.use(message)
Vue.use(Highlight)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import {
  Breadcrumb, BreadcrumbItem, Row, FormItem, Form, Input, Tag, Button, Table, TableColumn
  , Menu, MenuItem, Submenu, Dropdown, DropdownItem, DropdownMenu, Upload, Dialog
} from 'element-ui'
import message from './plugins/message'
import '@/styles/index.scss' // 全局 css
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限控制

Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Row.name, Row)
Vue.component(FormItem.name, FormItem)
Vue.component(Form.name, Form)
Vue.component(Input.name, Input)
Vue.component(Tag.name, Tag)
Vue.component(Button.name, Button)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Submenu.name, Submenu)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(Upload.name, Upload)
Vue.component(Dialog.name, Dialog)

Vue.use(message)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

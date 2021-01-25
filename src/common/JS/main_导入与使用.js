/*
 * @Description: 本文件将介绍：如何导入和使用JS文件夹内的各个方法、插件或库
 * @From: https://github.com/Michael-lzg/vue-cli4-vant.git
 * @Author: Colin
 * @Date: 2021-01-25 22:51:03
 */
import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import './JS/plugin'
import './JS/FastClick'
import filters from './JS/filter'
import utils from './JS/utils'

Vue.use(utils)

// 注入全局过滤器
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const userInfo = sessionStorage.getItem('userInfo') || null
  if (!userInfo && to.meta.auth) {
    next('/login')
  } else {
    next()
  }
})

export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

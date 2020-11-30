// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // vuex状态管理器
import plugin from './plugins' // 插件合集
import 'lib-flexible/flexible'

Vue.config.productionTip = false

// 使用mockjs模拟接口数据
if (process.env.NODE_ENV !== 'production') {
  require('@/mock/index')
}

/* eslint-disable no-new */
// var vm = new Vue({
new Vue({
  el: '#app',
  router,
  store,
  plugin,
  components: { App },
  template: '<App/>'
})

// console.log('vm', vm)
// console.log('vm', vm.$axios)
// console.log('vm', vm.$http);

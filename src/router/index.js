import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    { // import方式加载组件
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, { // vue异步组件（按需加载）
      path: '/demo',
      name: 'demo',
      component: resolve => require(['@/pages/demo'], resolve)
    }
  ]
})

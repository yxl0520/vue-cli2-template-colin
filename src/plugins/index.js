import Vue from 'vue'
import loading from './Loading'
import ajax from './axios/index'

Vue.use(loading, {hideDelay: 300})
Vue.use(ajax)
/**
 * @description: 修改接口加载菊花的文本
 * @param {Object} {text: '加载中'}
 */
// Vue.$loading.show({text: '请稍等'})

export default [
  // 'Ajax',
  // 'Loading'
]

import Vue from 'vue'
import http from './axios/index'
import config from '@/api/apiConfig'

/**
 * @description: 1.注册Vue.prototype.$axios（$axios同原生axios，但添加了拦截器功能，添加有“加载菊花”功能），加载菊花可配置关闭；
 * @description: 2.注册Vue.prototype.$http，请求方法封装
 * @param {Object} config {baseUrl, timeout}
 */
Vue.use(http, config)

/**
 * @description: 修改接口加载菊花的提示文本
 * @param {Object} {text: '加载中'}
 */
// Vue.$loading.show({text: '请稍等'})

export default [
  // 'Ajax',
  // 'Loading'
]

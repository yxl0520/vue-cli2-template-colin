import Vue from 'vue'
// import loading from './Loading'
// import ajax from './axios/index'
// import { http } from './http'

// #region
/**
 * @description: 这是http的另一种注册方式【项目中，推荐这样配置】
 * @param {baseUrl: '', Header: ''} 这里填写axios有关的所以配置
 */
import { config } from '@/api';
import http from './http/httpPlus'
Vue.use(http, config)

// #endregion

// Vue.use(loading, { hideDelay: 300 })
// Vue.use(ajax); // 注册Vue.prototype.$axios（$axios同原生axios，但添加了拦截器功能，添加有“加载菊花”功能）
// Vue.use(http); // 注册Vue.prototype.$http（$http是有经过自己封装axios方法的，HTTP类）

/**
 * @description: 修改接口加载菊花的提示文本
 * @param {Object} {text: '加载中'}
 */
// Vue.$loading.show({text: '请稍等'})

export default [
  // 'Ajax',
  // 'Loading'
]

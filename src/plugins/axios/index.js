import axios from 'axios'
import jsonp from './jsonp/index'

export default {
  install (Vue) {
    let $loading = Vue.$loading
    // console.log('$loading', $loading)
    if (!$loading) {
      console.error('Cannot load loading Plugin')
      return
    }

    axios.interceptors.request.use(function (config) {
      // console.log(config)

      // 如果存在“hideLoading”配置项，则不显示加载提示动画
      let isShowLoading = !config.hideLoading
      if (isShowLoading) {
        $loading.show((config && config.loading) || {});
        // console.log('request success: show loading...')
      }

      // 全局自定义配置请求头的Authorization示例：
      // config.headers.Authorization = 'token--demo'
      return Promise.resolve(config)
    }, function (error) {
      // console.log('request fail: hide loading...')
      console.log(error)
      $loading.hide({}, error, $loading.ajaxFeedbackType.REQ_FAIL)
      return Promise.reject(error)
    })
    axios.interceptors.response.use(function (response) {
      // console.log('response success: hide loading...')
      // console.log(response)
      $loading.hide({}, response, $loading.ajaxFeedbackType.RES_SUCC)
      return Promise.resolve(response)
    }, function (error) {
      // console.log('response fail: hide loading...')
      console.log(error)
      $loading.hide({}, error, $loading.ajaxFeedbackType.RES_FAIL)
      return Promise.reject(error)
    })
    axios.jsonp = function (url, config) {
      return jsonp(axios, url, config)
    }
    Vue.prototype.$axios = axios
  },
  $axios: axios
}

export const $axios = axios

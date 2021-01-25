/*
 * @Description: 封装axios：增加加载动画、baseUrl配置等
 * @example：http.getData(HTTP_PATH.actionGetBuildingByLandName, params, { handleHideLoading: true }); 关闭加载动画
 * @example：http.getData(HTTP_PATH.contractSignName, params, { method: 'post' }); 使用post方式
 * @Author: Colin
 * @Date: 2020-05-12 13:57:53
 */
import axios from 'axios'
import loading from '../Loading'
// import jsonp from './jsonp/index'

export default {
  install (Vue, config) {
    let $loading = Vue.$loading
    if (!$loading) {
      // 注册Loading组件
      Vue.use(loading, { hideDelay: 300 })
      if (Vue.$loading) {
        $loading = Vue.$loading
        console.log('Vue.$loading is Ready!!!')
      } else {
        console.error('Cannot load loading Plugin')
        return
      }
    }
    if (!axios) {
      console.error('Cannot load axios Plugin')
    }

    /**
     * @description: axios请求拦截器
     */
    axios.interceptors.request.use(
      function (config) {
        console.log('axios-request-config', config)
        /**
         * @description: 如果存在“hideLoading”配置项，则不显示加载提示动画
         * @param {Boolean} hideLoading 是否开启加载动画
         * @param {Object} {} 其他配置项
         */
        let isShowLoading = !config.hideLoading
        if (isShowLoading) {
          $loading.show((config && config.loading) || {})
          // console.log('request success: show loading...')
        }

        // 全局自定义配置请求头的Authorization示例：
        // config.headers.Authorization = 'token--demo'
        return Promise.resolve(config)
      },
      function (error) {
        // console.log('request fail: hide loading...')
        console.log(error)
        $loading.hide({}, error, $loading.ajaxFeedbackType.REQ_FAIL)
        return Promise.reject(error)
      }
    )
    axios.interceptors.response.use(
      function (response) {
        // console.log('response success: hide loading...', response)
        $loading.hide({}, response, $loading.ajaxFeedbackType.RES_SUCC)
        return Promise.resolve(response)
      },
      function (error) {
        // console.log('response fail: hide loading...', error)
        $loading.hide({}, error, $loading.ajaxFeedbackType.RES_FAIL)
        return Promise.reject(error)
      }
    )

    // #region 是否扩展Axios支持jsonp
    /**
     * @description: 扩展Axios的jsonp请求
     * @example https://xx.map.yy.com/ss/location/v1/ip?callback=jsonCallBack&key=[KEY]&output=jsonp&_=[NUMBER])
     * @param {String} url 请求地址
     * @param {Object} config
     * @return
     */
    // axios.jsonp = function (url, config) {
    //   return jsonp(axios, url, config)
    // }
    // #endregion

    Vue.prototype.$axios = axios
    Vue.prototype.$http = HTTP.getInstance().config(config)
  }
}

/**
 * @description: HTTP通用调用类
 * @class HTTP
 */
export class HTTP {
  static getInstance () {
    if (!HTTP.__instance) {
      HTTP.__instance = new HTTP()
    }
    return HTTP.__instance
  }

  /**
   * @description: 配置输入
   * @param {Object} { baseUrl, method, code, token, tokenKey } baseUrl：接口根地址；method：默认调用方法，默认get；code：默认restful代码；token：访问令牌；tokenKey：访问令牌的key
   * @return {HTTP}
   * @memberof HTTP
   */
  config ({ baseUrl, method, timeout, code, token, tokenKey }) {
    this.baseUrl = baseUrl
    this.method = method
    this.timeout = timeout
    // this.code = code
    // this.token = token
    // this.tokenKey = tokenKey
    return this
  }

  /**
   * @description: 通用请求接口
   * @param {String} url 接口地址
   * @param {Object} params 参数
   * @param {Object} options 配置 {baseUrl：指定根地址； method：指定调用方法; hideLoading: true 关闭加载}
   * @return {Promise} Axios
   * @memberof MAS
   */
  getData (url, params, options = {}) {
    let baseUrl = (options && options.baseUrl) || this.baseUrl
    let method = (options && options.method) || this.method || 'get'
    let timeout = (options && options.timeout) || this.timeout

    /**
     * @description: Axios通用配置
     * @param {*}
     * @return {*}
     */
    if (timeout) axios.defaults.timeout = timeout // 请求超时时间，默认为0 ms

    // 第一种处理方法
    let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
    return axios({
      baseURL: baseUrl,
      url: url,
      // url: `${baseUrl}/${url}`,
      method,
      [data]: params,
      ...options
    }).then(result => this.responser(result))

    // #region 第二种处理方法
    // let tempParams = null
    // if (method.toLocaleLowerCase() === 'get') {
    //   tempParams = params
    // }
    // return axios({
    //   url: `${baseUrl}/${url}`,
    //   method,
    //   params: tempParams,
    //   data: method === 'post' && params,
    //   ...options
    // }).then(result => this.responser(result))
    // #endregion
  }

  /**
   * 回答器，包含结果认证，只限mas请求接口
   * @param {{}} result 请求结果
   * @returns {{}} 返回处理的结果
   * @memberof HTTP
   */
  responser (result) {
    if (result.status === 200) {
      let data = result.data
      // #region 需要时再开启
      /**
       * @description: 统一处理状态值：返回错误状态码所代表的含义
       * @param { errorCode }
       * @return { Promise }
       */
      // if (data instanceof Object) {
      //   if (HTTP.ERROR_CODE[data.code]) {
      //     console.log('http', errorCode[data.code])
      //     return Promise.reject(Object.assign(data, errorCode[data.code]))
      //     // return Object.assign(data, errorCode[data.code])
      //   }
      // }
      // #endregion
      // data.request = result.request
      return data
    } else {
      throw new Error(result.statusText)
    }
  }

  /**
   * @description: 配置根地址
   * @param {String} 'http://xxx'
   * @memberof HTTP
   */
  get baseUrl () {
    return this._baseUrl
  }
  set baseUrl (baseUrl) {
    this._baseUrl = baseUrl
  }

  /**
   * @description: 配置调用方法
   * @param {String} method 'get' 'post'
   * @memberof HTTP
   */
  get method () {
    return this._method
  }
  set method (method) {
    this._method = method
  }

  get timeout () {
    return this._timeout
  }
  set timeout (timeout) {
    this._timeout = timeout
  }
}

export const http = HTTP.getInstance()

const errorCode = {
  40001: {
    errCode: '40001',
    errMsg: '找不到Map校验accessToken!',
    isReportErr: 'false'
  },
  40002: { errCode: '40002', errMsg: 'MAP校验不通过!', isReportErr: 'false' },
  40003: { errCode: '40003', errMsg: 'MAP校验出错!', isReportErr: 'false' }
}

/**
 * @description 向HTTP类中添加错误代码含义
 * @type {{}}
 */
HTTP.ERROR_CODE = errorCode

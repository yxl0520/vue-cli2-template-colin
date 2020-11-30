import axios from 'axios'

export default {
  install (Vue, config) {
    if (!axios) {
      console.error('Cannot load axios Plugin')
    }

    Vue.prototype.$http = HTTP.getInstance().config(config)
    console.log('Vue.prototype.$http', HTTP.getInstance().config(config));
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
  config ({ baseUrl, method, code, token, tokenKey }) {
    this.baseUrl = baseUrl
    this.method = method
    // this.code = code
    // this.token = token
    // this.tokenKey = tokenKey
    return this
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
    // 第一种处理方法
    let data = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
    return axios({
      url: `${baseUrl}/${url}`,
      method,
      [data]: params,
      ...options
    }).then(result => this.responser(result))

    // 第二种处理方法
    // let tempParams = null
    // if (method.toLocaleLowerCase() === 'get') {
    //   tempParams = params
    // } else {

    // }
    // return axios({
    //   url: `${baseUrl}/${url}`,
    //   method,
    //   params: tempParams,
    //   data: method === 'post' && params,
    //   ...options
    // }).then(result => this.responser(result))
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

      if (data instanceof Object) {
        // if (HTTP.ERROR_CODE[data.code]) {
        //   // return Promise.reject(Object.assign(data, errorCode[data.code]))
        //   console.log('http', errorCode[data.code])
        //   return Object.assign(data, errorCode[data.code])
        // }
      }
      data.request = result.request
      return data
    } else {
      throw new Error(result.statusText)
    }
  }
}

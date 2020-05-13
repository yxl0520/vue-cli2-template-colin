import axios from 'axios'

export default {
  install (Vue, config) {
    if (!axios) {
      console.error('Cannot load axios Plugin')
      return
    }

    Vue.prototype.$mas = MAS.getInstance().config(config)
  }
}

/**
 * MAS通用调用类
 * @class MAS
 */
export class MAS {
  static getInstance () {
    if (!MAS.__instance) {
      MAS.__instance = new MAS()
    }
    return MAS.__instance
  }

  /**
   * 接口类型
   * @readonly
   * @static
   * @memberof MAS
   */
  static get TYPE () {
    return {
      PROXY: 'mas-api/proxy?alias=',
      RESTFUL: 'mas-api/restful/'
    }
  }

  /**
   * 默认token的key
   * @readonly
   * @static
   * @memberof MAS
   */
  static get TOKEN_KEY () {
    return 'access_token'
  }

  /**
   * 回答器，包含结果认证，只限mas请求接口
   * @param {{}} result 请求结果
   * @returns {{}} 返回处理的结果
   * @memberof MAS
   */
  responser (result) {
    if (result.status === 200) {
      let data = result.data

      if (data instanceof Object) {
        if (MAS.ERROR_CODE[data.code]) {
          // return Promise.reject(Object.assign(data, errorCode[data.code]))
          console.log('mas', errorCode[data.code])
          return Object.assign(data, errorCode[data.code])
        }
      }
      data.request = result.request
      return data
    } else {
      throw new Error(result.statusText)
    }
  }

  /**
   * 通用请求接口
   * @param {String} url 接口地址
   * @param {{}} params 参数
   * @param {{}} options 配置 {baseUrl: 指定根地址, method: 指定调用方法}
   * @returns {Promise} Axios
   * @memberof MAS
   */
  getData (url, params, options) {
    let method = (options && options.method) || this.method || 'get'
    let baseUrl = (options && options.baseUrl) || this.baseUrl
    // let tokenParams = {[this.tokenKey]: this.token}
    let tempParams = null
    if (method === 'get') {
      tempParams = params
    } else {
      // tempParams = tokenParams
    }
    return axios({
      url: `${baseUrl}/${url}`,
      method,
      params: tempParams,
      data: method === 'post' && params,
      ...options
    }).then(result => this.responser(result))
  }
  /**
   * FormData提交
   */
  upload (url, params, options) {
    let baseUrl = (options && options.baseUrl) || this.baseUrl
    return axios({
      method: 'post',
      url: `${baseUrl}/${url}`,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      },
      data: params
    }).then(result => this.responser(result))
  }
  /**
   * FormData提交
   */
  download (url, params, options) {
    let baseUrl = (options && options.baseUrl) || this.baseUrl
    let href = `${baseUrl}/${url}`
    return href
  }

  transformation (url, params, options) {
    let baseUrl = (options && options.baseUrl) || this.baseUrl
    return axios({
      method: 'post',
      url: `${baseUrl}/${url}`,
      headers: {
        'Accept': 'text/html'
      }
    })
  }

  transformation1 (url, params, options) {
    let baseUrl = (options && options.baseUrl) || this.baseUrl
    let data = {}
    data.url = `${baseUrl}/${url}`
    data.title = params.title
    data.identifier = params.title
    data.type = 'txt'
    return [data]
  }
  /**
   * Proxy方式调用，MAS配置接口 (FormData提交)
   */
  proxy3 (alias, params, options) {
    return this.download(`${MAS.TYPE.PROXY}${alias}&token=${this.token}&id=${params}`, params, options)
  }

  proxy4 (alias, params, options) {
    // eslint-disable-next-line eqeqeq
    if (params.type == 'txt') {
      return this.transformation1(`${MAS.TYPE.PROXY}${alias}&tocken=${this.token}&docType=${params.type}&quality=${params.qutype}&fdType=oa&exParam=${encodeURI(params.id)}`, params, options)
    } else {
      return this.transformation(`${MAS.TYPE.PROXY}${alias}&tocken=${this.token}&docType=${params.type}&quality=${params.qutype}&fdType=oa&exParam=${encodeURI(params.id)}`, params, options)
    }
  }
  /**
   * Proxy方式调用，MAS配置接口 (FormData提交)
   */
  proxy2 (alias, params, options) {
    return this.upload(`${MAS.TYPE.PROXY}${alias}&accessToken=${this.token}`, params, options)
  }

  /**
   * Proxy方式调用，MAS配置接口
   * @param {String} alias MAS配置接口代码
   * @param {{}} params 参数
   * @param {{}} options 配置 {baseUrl: 指定根地址, method: 指定调用方法}
   * @returns {Promise} Axios
   * @memberof MAS
   */
  proxy (alias, params, options) {
    params = Object.assign({
      // [this.tokenKey]: this.token  // token 不放入post数据
    }, params, options && options.params)
    return this.getData(`${MAS.TYPE.PROXY}${alias}&${this.tokenKey}=${this.token}`, params, options)
  }

  /**
   * Restful方式调用，MAS配置接口，如果是Restful方式，必须在初始化时指定restful code，否则必须每次在option只指定
   * @param {String} url 请求地址，restful配置的后段
   * @param {{}} params 参数
   * @param {{}} options 配置 {code: restful code，baseUrl: 指定根地址, method: 指定调用方法}
   * @returns {Promise} Axios
   * @memberof MAS
   */
  restful (url, params, options) {
    let code = (options && options.code) || this.code
    params = Object.assign({
      [this.tokenKey]: this.token
    }, params, options && options.params)
    return this.getData(`${MAS.TYPE.RESTFUL}${code}/${url}`, params, options)
  }

  /**
   * 附件转换服务
   * @param {any} alias
   * @param {any} {exParam, docType, fdType, quality, tokenKey}
   * @param {any} options
   * @returns {Promise}
   * @memberof MAS
   */
  attach (alias, {exParam, docType, fdType, quality, tokenKey}, options) {
    let params = Object.assign({
      exParam,
      fdType,
      docType,
      quality,
      [tokenKey || this.tokenKey]: this.token
    }, options && options.params)
    return this.getData(`${MAS.TYPE.PROXY}${alias}`, params, options)
  }

  /**
   * 配置
   * @param {Object} { baseUrl, method, code, token, tokenKey } baseUrl-接口根地址，method：默认调用方法，默认get，code：默认restful代码，token：访问令牌，tokenKey：访问令牌的key
   * @returns {MAS}
   * @memberof MAS
   */
  config ({ baseUrl, method, code, token, tokenKey }) {
    this.baseUrl = baseUrl
    this.method = method
    this.code = code
    this.token = token
    this.tokenKey = tokenKey

    return this
  }

  /**
   * 根地址
   * @memberof MAS
   */
  get baseUrl () {
    return this._baseUrl
  }

  /**
   * 根地址
   * @memberof MAS
   */
  set baseUrl (baseUrl) {
    this._baseUrl = baseUrl
  }

  /**
   * 调用方法
   * @memberof MAS
   */
  get method () {
    return this._method
  }

  /**
   * 调用方法
   * @memberof MAS
   */
  set method (method) {
    this._method = method
  }

  /**
   * restful代码
   * @memberof MAS
   */
  get code () {
    return this._code
  }

  /**
   * restful代码
   * @memberof MAS
   */
  set code (code) {
    this._code = code
  }

  /**
   * 访问令牌
   * @memberof MAS
   */
  get token () {
    return this._token
  }

  /**
   * 访问令牌
   * @memberof MAS
   */
  set token (token) {
    this._token = token
  }

  /**
   * 访问令牌key
   * @memberof MAS
   */
  get tokenKey () {
    return this._tokenKey || MAS.TOKEN_KEY
  }

  /**
   * 访问令牌key
   * @memberof MAS
   */
  set tokenKey (tokenKey) {
    this._tokenKey = tokenKey
  }

  get TYPE_PROXY () {
    return MAS.TYPE.PROXY
  }

  get TYPE_RESTFUL () {
    return MAS.TYPE.RESTFUL
  }
}

const errorCode = {'40001': {'errCode': '40001', 'errMsg': '找不到Map校验accessToken!', 'isReportErr': 'false'}, '40002': {'errCode': '40002', 'msg': '您的账号登录已失效，请重新登录!', 'errMsg': 'MAP校验不通过!', 'isReportErr': 'false'}, '40003': {'errCode': '40003', 'errMsg': 'MAP校验出错!', 'isReportErr': 'false'}, '40011': {'errCode': '40011', 'errMsg': 'MAS中对应的alias参数没有提供', 'isReportErr': 'false'}, '40021': {'errCode': '40021', 'errMsg': 'MAS转接超时!', 'isReportErr': 'true'}, '40031': {'errCode': '40031', 'errMsg': '后台服务器连接异常!', 'isReportErr': 'true'}, '40041': {'errCode': '40041', 'errMsg': '请求参数错误!', 'isReportErr': 'false'}, '40101': {'errCode': '40101', 'errMsg': 'MAS端没找到token值', 'isReportErr': 'false'}, '40102': {'errCode': '40102', 'errMsg': 'MAS Token校验不通过!', 'isReportErr': 'false'}, '40110': {'errCode': '40110', 'errMsg': 'MAS系统处理异常，请联系MAS管理员。', 'isReportErr': 'true'}, '40112': {'errCode': '40112', 'errMsg': 'MAS服务器没有对应配置，请联系MAS管理员', 'isReportErr': 'false'}, '40113': {'errCode': '40113', 'errMsg': 'MAS SOAP配置错误', 'isReportErr': 'true'}, '40120': {'errCode': '40120', 'errMsg': 'MAS图片转换配置错误(图片替换表达式没填)', 'isReportErr': 'true'}, '40600': {'errCode': '40600', 'errMsg': 'MAS调用返回错误', 'isReportErr': 'false'}, '40601': {'errCode': '40601', 'errMsg': 'MAS调用URL错误', 'isReportErr': 'false'}, '40610': {'errCode': '40610', 'errMsg': 'MAS调用数据库脚本失败', 'isReportErr': 'true'}, '40620': {'errCode': '40620', 'errMsg': 'MAS调用流下载失败', 'isReportErr': 'true'}, '40631': {'errCode': '40631', 'errMsg': 'MAS调用Webservice失败', 'isReportErr': 'true'}, '40640': {'errCode': '40640', 'errMsg': 'MAS调用通用表单失败', 'isReportErr': 'true'}, '40650': {'errCode': '40650', 'errMsg': 'MAS调用HTTP GET失败', 'isReportErr': 'true'}, '40670': {'errCode': '40670', 'errMsg': 'MAS调用HTTP POST失败', 'isReportErr': 'true'}, '40690': {'errCode': '40690', 'errMsg': 'MAS调用HTTP AUTO失败', 'isReportErr': 'true'}, '40691': {'errCode': '40691', 'errMsg': 'MAS调用HTTP DELETE失败', 'isReportErr': 'true'}, '40692': {'errCode': '40692', 'errMsg': 'MAS调用HTTP PUT失败', 'isReportErr': 'true'}, '40699': {'errCode': '40699', 'errMsg': 'MAS转发失败', 'isReportErr': 'true'}, '40700': {'errCode': '40700', 'errMsg': 'MAS不支持该配置服务', 'isReportErr': 'true'}, '40701': {'errCode': '40701', 'errMsg': 'MAS接口配置错误', 'isReportErr': 'true'}, '40800': {'errCode': '40800', 'errMsg': 'MAS全局配置参数没设置', 'isReportErr': 'true'}, '40801': {'errCode': '40801', 'errMsg': 'MAS全局配置参数类型错误', 'isReportErr': 'true'}, '40810': {'errCode': '40810', 'errMsg': 'MAS没找到相应的RESTFul配置', 'isReportErr': 'false'}, '40900': {'errCode': '40900', 'errMsg': '账号映射出错', 'isReportErr': 'true'}, '41000': {'errCode': '41000', 'errMsg': '清除缓存失败', 'isReportErr': 'true'}, '42000': {'errCode': '42000', 'errMsg': '通用表单模板配置不存在', 'isReportErr': 'false'}, '42001': {'errCode': '42001', 'errMsg': '通用表单服务不存在', 'isReportErr': 'false'}, '42002': {'errCode': '42002', 'errMsg': '通用表单系统模块配置不存在', 'isReportErr': 'false'}, '42010': {'errCode': '42010', 'errMsg': '通用表单调用返回错误', 'isReportErr': 'true'}}
/**
 * 错误代码
 * @type {{}}
 */
MAS.ERROR_CODE = errorCode

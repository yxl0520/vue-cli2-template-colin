/*
  封装 定义 连接方法、返回数据格式
 */
// import qs from 'qs';
import axios from 'axios'

// 全局axios默认配置
// axios.defaults.baseURL = APIPath.HOST

const fetchPath = (options) => {
  let {
    method,
    data,
    header,
    url
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios({
        method,
        url,
        headers: { 'Authorization': header },
        params: data
      })
    case 'post':
      return axios({
        method,
        url,
        headers: { 'Authorization': header },
        data
      })
    default:
      return axios(options)
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (options) {
  return fetchPath(options).then((response) => {
    const { data } = response
    const { status, msg } = data
    return {
      statusMsg: msg,
      statusCode: status,
      ...data
    }
  }).catch((error) => {
    const { message } = error
    return {
      statusMsg: message,
      statusCode: -1000
    }
  })
}

/**
 * Get请求
 * @param {String} url 请求URL
 * @param {Object} params 请求参数
 * @param {Object} header 请求头信息
 */
export function get (url, params, header) {
  return request({
    method: 'GET',
    url,
    data: params,
    header
  })
}

/**
 * Post请求
 * @param {String} url 请求URL
 * @param {Object} params 请求参数
 * @param {Object} header 请求头信息
 */
export function post (url, params, header) {
  return request({
    method: 'POST',
    url,
    data: params,
    header
  })
}

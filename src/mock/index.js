import {
  personEntryList,
  reviewDistributeInfo
} from './data'
const Mock = require('mockjs')

/**
 * 模拟接口成功返回数据
 * @param {Object|Array} data 返回的数据
 */
function success (data) {
  return {
    status: 200,
    msg: '',
    data
  }
}

/**
 * 模拟接口失败返回
 * @param {Number} errorCode 错误码
 * @param {String} errorMsg 错误信息
 */
function fail (errorCode, errorMsg) {
  return {
    status: errorCode,
    msg: errorMsg
  }
}

Mock.setup({
  timeout: '1200-2600'
})

console.log('Now mock-2020.05.14')
/* example */
Mock.mock('http://text.com', 'get', success(reviewDistributeInfo))

/* 考察组成员接口 */
Mock.mock(/\/mockapi\/demo\/PersonEntry/, 'get', success(personEntryList))

/* 获取供方考察评审分发表信息接口 */
Mock.mock(/\/mockapi\/supply\/actionGetInfo\/123/, 'get', fail(-1, '参数错误：123'))
Mock.mock(/\/mockapi\/supply\/actionGetInfo\/*/, 'get', success(reviewDistributeInfo))

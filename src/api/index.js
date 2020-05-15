/*
 * @Description: 在这设置测试环境/正式环境的切换等(例如：axios的baseUrl、Authorization等；)
 * @Author: Colin
 * @Date: 2020-03-24 22:51:18
 */
import Vue from 'vue'
import { HTTP } from './http'
import config from '@/config'

// console.log('configObj', config)

const http = HTTP.getInstance().config(config)

Vue.prototype.$http = http

export {
  config,
  http
}

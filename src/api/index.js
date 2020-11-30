/*
 * @Description: 在config导入 测试环境/正式环境 的baseUrl等切换参数 等(例如：axios的baseUrl、Authorization等；)
 * @Description: 在apiPath导入 接口路径、固定请求参数 等
 * @Author: Colin
 * @Date: 2020-03-24 22:51:18
 */
import config, { TestAccount } from './apiConfig';
import { HTTP_PATH, CONST_PARAM } from './apiPath';

// console.log('configObj', config)

export {
  config,
  TestAccount,
  HTTP_PATH,
  CONST_PARAM
};

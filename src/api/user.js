import { HTTP_PATH, CONST_PARAM } from '@/api/index'
import { http } from '@/plugins/http';
import DesUtils from '@/common/DesUtils'

/**
 * 登录
 * @param {String} userName 用户名称
 * @param {String} password DES加密后的
 * @param {String} appClientId 10001
 */
export async function login ({ userName, password }) {
  let params = { userName }
  params.password = DesUtils.encrypt(password, userName)
  params.appClientId = CONST_PARAM.appClientId
  return http.getData(HTTP_PATH.loginAction, params)
}

/**
 * 退出登录
 * @param {String} userName 用户名称
 */
export async function logout (params) {
  params.appClientId = CONST_PARAM.appClientId
  return http.getData(HTTP_PATH.logoutAction, params)
}

/**
 * @description: 获取用户权限和信息
 * @param {String} userName
 */
export async function getUserPermission (params) {
  return http.getData(HTTP_PATH.getUserPermissionInfo, params);
}

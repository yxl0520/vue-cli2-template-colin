export const HTTP_PATH = {
  // loginAction: 'mobile/login.action', // 用户登录接口-无需验证码（废弃）
  loginAction: 'mobile/hs/login.action', // 用户登录接口-需验证码
  logoutAction: 'mobile/mobile/logout.action' // 退出登录
}

// 请求固定值参数
export const CONST_PARAM = {
  appClientId: 10001,
  captchaSekey: 'jffc'
}

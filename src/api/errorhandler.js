import { Dialog } from 'vant'

/**
 * 弹窗显示接口错误信息
 * @param {String|Object} message 错误信息
 */
export function showError (message) {
  Dialog({
    title: '提示',
    message
  })
}

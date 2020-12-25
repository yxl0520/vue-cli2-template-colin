import { showError } from '@/plugins/axios/errorhandler';

export default {
  // 更新加载状态
  showLoading (state, payload) {
    state.loading = payload
  },
  // 弹窗提示网络接口错误信息
  networkError (state, payload) {
    showError(payload)
  }
};

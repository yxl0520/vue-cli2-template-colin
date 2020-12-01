// import Something from 'xxx'
import {
  login
  // getReviewGrpInfo,
  // getReviewGrpList
} from '@/api/user'

export default {
  /**
   * 定义命名空间，防止多个模块同名共享，使用时需要带上命名空间
   */
  namespaced: true,
  state: {
    modulesUser: 'Vuex-module-DemoUser',
    modulesUser2: 'Vuex-module-DemoUser-2'
  },
  getters: {
    user: state => state.modulesUser
  },
  actions: {
    async fetchBillThatMonth ({ commit }, payload) {
      const response = await login(payload);
      // console.log('response', response);
      if (response.success && response.code == 200) {
        commit('updateComprehensiveData', { billThatMonth: response.data });
      } else {
        commit('networkError', response.message, { root: true });
      }
    },
    /**
     * @description: Promise.all同步请求
     */
    async fetchInspect ({ commit, getters }, payload) {
      let reviewGrpId = '';
      let arr = [];
      arr.push(
        // getReviewGrpInfo({
        //   billId: reviewGrpId,
        //   entryName: 'PersonEntry'
        // })
      );
      arr.push(
        // getReviewGrpList({
        //   billId: reviewGrpId,
        //   entryName: 'ProjectEntry'
        // })
      );
      Promise.all(arr)
        .then(resultArr => {
          // 考察组成员
          if (resultArr[0].code === 200) {
            commit('updateInspectPersionInfo', resultArr[0].data);
          }
          // 考察项目
          if (resultArr[1].code === 200) {
            commit('updateInspectProjectInfo', resultArr[1].data);
          }
        })
        .catch(error => {
          commit('networkError', error.msg, { root: true });
        });
    }
  },
  mutations: {
    updateComprehensiveData (state, payload) {
      state.billThatMonth = payload || 0;
    }
  }
};

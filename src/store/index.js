/*
 * @Description: Vuex状态管理,并按照模块化分隔处理
 * @Author: Colin
 * @Date: 2020-05-11 15:07:20
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import state from './state'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
Vue.config.debug = debug

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  modules
})

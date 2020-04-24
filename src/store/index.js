import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    /**
     * @管理员
     */
    // 账号登录
    async POST_LOGIN ({ commit }, data = {}) {
      const { data: res } = await axios.post(`/adminLogin?username=${data.phone}&password=${data.password}`)
      return res
    },
    // 验证码登录
    async POST_CODE_LOGIN ({ commit }, data = {}) {
      const { data: res } = await axios.post(`/adminLoginCode?username=${data.phone}&code=${data.code}`)
      return res
    },
    // 获取验证码
    async GET_CODE ({ commit }, phone) {
      const { data: res } = await axios.get(`/login/code?phone=${phone}`)
      return res
    },
    // 队伍列表
    async GET_TEAM_LIST ({ commit }, data = {}) {
      const { data: res } = await axios.get(`/admin/team/page?pageNo=${data.pageNo}&pageSize=${data.pageSize}&teamProgress=${data.teamProgress}`)
      return res
    }
  },
  modules: {
  }
})

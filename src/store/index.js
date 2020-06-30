import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { BASE_URL } from '@/utils/http'
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
    // 评委账号登录
    async POST_JUDGE_LOGIN ({ commit }, data = {}) {
      const { data: res } = await axios.post(`/judgeLogin?username=${data.phone}&password=${data.password}`)
      return res
    },
    // 验证码登录
    async POST_CODE_LOGIN ({ commit }, data = {}) {
      const { data: res } = await axios.post(`/adminLoginCode?username=${data.phone}&code=${data.code}`)
      return res
    },
    // 验证码登录
    async POST_JUDGE_CODE_LOGIN ({ commit }, data = {}) {
      const { data: res } = await axios.post(`/judgeLoginCode?username=${data.phone}&code=${data.code}`)
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
    },
    // 评委修改密码
    async PUT_MOIDIFY_PASSWORD ({ commit }, data = {}) {
      const { data: res } = await axios.put(`/judge/password?password=${data.password}`)
      return res
    },
    // 管理员修改密码
    async PUT_ADMIN_MOIDIFY_PASSWORD ({ commit }, data = {}) {
      const { data: res } = await axios.put(`/admin/password?password=${data.password}`)
      return res
    },
    // 下载学生账号
    async GET_ACCOUNT_LIST ({ commit }, data = {}) {
      const { data: res } = await axios.get('/admin/account/dowload')
      return res
    },
    // 下载附件
    async GET_DOWN_FILE ({ commit }, attachmentId = 0) {
      const url = '/admin/team/dowload/attachment'
      window.open(`${BASE_URL}${url}?attachmentId=${attachmentId}`)
    },
    async GET_JUDGE_DOWN_FILE ({ commit }, attachmentId = 0) {
      const url = '/judge/team/dowload/attachment'
      window.open(`${BASE_URL}${url}?attachmentId=${attachmentId}`)
    },
    // 评委获取队伍列表
    async GET_JUDGE_TEAM_LIST ({ commit }, data = {}) {
      const { data: res } = await axios.get(`/judge/team/page?pageNo=${data.pageNo}&pageSize=${data.pageSize}&teamProgress=${data.teamProgress}`)
      return res
    },
    // 评委查询队伍评分详情
    async GET_JUDGE_TEAM_DETAIL ({ commit }, data = {}) {
      const { data: res } = await axios.get(`/judge/team/score?teamNo=${data.teamNo}&teamProgress=${data.teamProgress}`)
      return res
    },
    // 评委评分
    async POST_JUDGE_SCORE ({ commit }, data = {}) {
      const { data: res } = await axios.post(`/judge/team/score?comments=${data.comments}&teamNo=${data.teamNo}&totalScore=${data.totalScore}`, data.scoreDimensions)
      return res
    }
  },
  modules: {
  }
})

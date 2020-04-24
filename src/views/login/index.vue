<template>
  <div class="login_container">
    <div class="login_inner">
      <el-form :model="loginForm">
        <el-tabs v-model="activeType" @tab-click="handleClick">
          <el-tab-pane label="快捷登录" name="0"></el-tab-pane>
          <el-tab-pane label="密码登录" name="1"></el-tab-pane>
        </el-tabs>
        <div class="form_item">
          <div class="form_label">手机号</div>
          <div class="form_content">
            <el-input v-model="loginForm.phone"></el-input>
          </div>
        </div>
        <div class="form_item" v-if="activeType === '0'">
          <div class="form_label">验证码</div>
          <div class="form_content code_container">
            <div class="code_input_container">
              <el-input v-model="loginForm.verificationCode"></el-input>
            </div>
            <el-button class="code_btn"
              @click="sendLoginCode"
              :disabled="loginCode !== num">
              <span v-if="loginCode === num">发送验证码</span>
              <span v-else>{{loginCode}}</span>
            </el-button>
          </div>
        </div>
        <div class="form_item"  v-if="activeType === '1'">
          <div class="form_label">密码</div>
          <div class="form_content">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </div>
        </div>
      </el-form>
      <div class="login_btn_container">
        <el-button type="primary"
          @click="submitLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      // 登录类型 '0' 验证码 '1'账号密码
      activeType: '0',
      // 登录表单
      loginForm: {
        phone: '',
        verificationCode: '',
        password: ''
      },
      // 倒计时秒数
      num: 60,
      // 获取验证码倒计时
      loginCode: 60,
      timer: null
    }
  },
  methods: {
    ...mapActions(['login', 'POST_GET_CODE', 'POST_REGISTRY', 'LOGIN_CODE', 'CODE_LOGIN']),
    handleClick (e) {
      this.activeType = e.name
    },
    // 登录
    async submitLogin () {
      if (!this.validatePhone(this.loginForm.phone)) {
        this.$message.error('请输入正确的手机号码')
        return
      }
      if (this.activeType === '0') {
        if (!this.loginForm.verificationCode) {
          this.$message.error('请输入验证码')
          return
        }
      } else if (this.activeType === '1') {
        if (!this.loginForm.password) {
          this.$message.error('请输入密码')
          return
        }
      }
      const res = this.activeType === '1' ? await this.login(this.loginForm) : await this.CODE_LOGIN(this.loginForm)
      if (res.result === '0') {
        sessionStorage.setItem('userInfo', JSON.stringify(res.data))
        this.$router.push('/works/list')
      }
    },
    // 获取验证码
    async sendLoginCode () {
      if (this.loginCode === this.num && !this.timer) {
        if (!this.validatePhone(this.loginForm.phone)) {
          this.$message.error('请输入正确的手机号码')
          return
        }
        const res = await this.LOGIN_CODE({
          phone: this.loginForm.phone
        })
        if (res.result === '0' && res.data) {
          this.$message.success('发送成功')
          this.timer = setInterval(() => {
            if (this.loginCode === 0) {
              clearInterval(this.timer)
              this.loginCode = this.num
              return
            }
            this.loginCode--
            console.log(this.loginCode)
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  .login_inner {
    position: fixed;
    top: 50%;
    left: 50%;

    padding: 50px 60px;
    transform: translate(-50%,-50%);
    width: 500px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .1);
    .form_item {
      margin-bottom: 20px;
      display: flex;
      .form_label {
        width: 100px;
      }
      .form_content {
        flex-grow: 1;
        // 获取验证码的框
        &.code_container {
          display: flex;
          .code_input_container {
            flex-grow: 1;
          }
          // 获取验证码按钮
          .code_btn {
            margin-left: 10px;
            min-width: 100px;
          }
        }
      }
    }
    .login_btn_container {
      text-align: center;
    }
  }
}
</style>

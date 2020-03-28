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
              <el-input v-model="loginForm.phone"></el-input>
            </div>
            <el-button class="code_btn">获取验证码</el-button>
          </div>
        </div>
        <div class="form_item"  v-if="activeType === '1'">
          <div class="form_label">密码</div>
          <div class="form_content">
            <el-input v-model="loginForm.phone"></el-input>
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
export default {
  data () {
    return {
      // 登录类型 '0' 验证码 '1'账号密码
      activeType: '0',
      // 登录表单
      loginForm: {
        phone: '',
        code: '',
        password: ''
      }
    }
  },
  methods: {
    handleClick (e) {
      this.activeType = e.name
    },
    submitLogin () {
      this.$router.push('/works/list')
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

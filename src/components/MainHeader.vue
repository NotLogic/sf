<template>
  <div class="main_header_container">
    <div class="left_txt">“顺丰杯”物流创新设计大赛</div>
    <div class="right">
      <span>张三</span>
      <div class="exit_btn"
        @click="exitLogin">退出</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    exitLogin () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.main_header_container {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .left_txt {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
  .right {
    display: flex;
    align-items: center;
    color: #fff;
    .exit_btn {
      cursor: pointer;
      margin: 0 20px;
      font-size: 12px;
    }
  }
}
</style>

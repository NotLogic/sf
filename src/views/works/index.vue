<template>
  <el-container class="works_container">
    <el-header class="main_header">
      <MainHeader></MainHeader>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideMenu />
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import SideMenu from '@/components/SideMenu.vue'
export default {
  components: {
    MainHeader,
    SideMenu
  },
  created () {
    const isLogin = '1'
    // 未登录跳转至登录页
    if (!isLogin) this.$router.replace('/')
  }
}
</script>

<style lang="scss" scoped>
.works_container {
  height: 100vh;
  .main_header {
    background-color: $bg_color;
  }
}
</style>

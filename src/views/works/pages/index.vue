<template>
  <div class="works_list_container">
    <!-- <div class="page_title">评委审核功能</div> -->
    <div class="filter_container">
      <el-tabs v-model="activeType" @tab-click="handleClick">
        <el-tab-pane label="初筛" name="0"></el-tab-pane>
        <el-tab-pane label="半决赛" name="1"></el-tab-pane>
        <el-tab-pane label="决赛" name="2"></el-tab-pane>
      </el-tabs>
    </div>
    <el-table :data="tableData"
      border>
      <el-table-column
        prop=""
        label="#">
      </el-table-column>
      <el-table-column
        prop=""
        label="队伍名称">
      </el-table-column>
      <el-table-column
        prop=""
        label="作品名称">
      </el-table-column>
      <el-table-column
        prop=""
        label="方向">
      </el-table-column>
      <el-table-column
        prop=""
        label="命题">
      </el-table-column>
      <el-table-column
        prop=""
        label="赛区">
      </el-table-column>
      <el-table-column
        prop=""
        label="作品附件">
      </el-table-column>
      <el-table-column
        prop=""
        label="得分">
      </el-table-column>
      <el-table-column
        prop=""
        label="评审情况">
        <template slot-scope="scope">
          <PublicButton @clickHandle="setSource(scope.row)">评分</PublicButton>
          <PublicButton @clickHandle="pass(scope.row)">通过</PublicButton>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import PublicButton from '@/components/public_button.vue'
export default {
  components: {
    PublicButton
  },
  data () {
    return {
      activeType: '0',
      tableData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 切换赛事类型
    handleClick (e) {
      this.activeType = e.name
    },
    // 点击评分
    setSource (row) {
      console.log('row:', row)
      this.$router.push({
        path: '/works/desc',
        query: {}
      })
    },
    // 通过
    pass (row) {
      console.log('通过:', row)
    },
    // 获取页面数据
    getData () {
      const tableData = [
        {}
      ]
      this.tableData = tableData
    }
  }
}
</script>

<style lang="scss" scoped>
.works_list_container {}
</style>

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
        label="评审情况">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
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
    handleClick (e) {
      this.activeType = e.name
    },
    getData () {
      const tableData = []
      this.tableData = tableData
    }
  }
}
</script>

<style lang="scss" scoped>
.works_list_container {}
</style>

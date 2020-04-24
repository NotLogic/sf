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
        prop="teamNo"
        label="#">
      </el-table-column>
      <el-table-column
        label="队伍名称">
        <template slot-scope="scope">
          <el-popover width="200" trigger="hover" :content="scope.row.teamName" placement="top">
            <div>{{scope.row.teamName}}</div>
            <div slot="reference" class="name-wrapper">
              <div class="nowrap">{{ scope.row.teamName }}</div>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="作品名称">
      </el-table-column>
      <el-table-column
        prop="directionName"
        label="方向">
      </el-table-column>
      <el-table-column
        label="课题">
        <template slot-scope="scope">
          <el-popover width="200" trigger="hover" :content="scope.row.subjectName" placement="top">
            <div>{{scope.row.subjectName}}</div>
            <div slot="reference" class="name-wrapper">
              <div class="nowrap">{{ scope.row.subjectName }}</div>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="赛区">
        <template slot-scope="scope">
          <span>{{getZone(scope.row.matchZone)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="作品附件">
      </el-table-column>
      <el-table-column
        label="得分">
        <template slot-scope="scope">
          <span>{{scope.row.totalScore || '---'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="评审情况">
        <template slot-scope="scope">
          <PublicButton @clickHandle="pass(scope.row)">通过</PublicButton>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      :page-size="pageData.pageSize"
      @current-change="pageChange"
      layout="prev, pager, next"
      :total="pageData.recordNumber">
    </el-pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicButton from '@/components/public_button.vue'
export default {
  components: {
    PublicButton
  },
  data () {
    return {
      activeType: '0',
      pageForm: {
        pageSize: 10,
        pageNo: 1,
        teamProgress: 0
      },
      pageData: {},
      tableData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    ...mapActions(['GET_TEAM_LIST']),
    // 切换分页
    pageChange (data) {
      this.pageForm.pageNo = data
      this.getData()
    },
    // 切换赛事类型
    handleClick (e) {
      this.pageForm = {
        pageSize: 10,
        pageNo: 1,
        teamProgress: e.name
      }
      this.activeType = e.name
      this.getData()
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
    async getData () {
      const params = this.pageForm
      const res = await this.GET_TEAM_LIST(params)
      if (res.result === '0' && res.data) {
        this.pageData = res.data
        this.tableData = res.data.records
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.works_list_container {}
</style>

<style lang="scss">
  .nowrap {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table .cell {
    white-space: nowrap;
  }
</style>

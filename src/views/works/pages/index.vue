<template>
  <div class="works_list_container">
    <!-- <div class="page_title">评委审核功能</div> -->
    <div v-if="userInfo.superAdmin === 1" class="down_list">
      <el-button @click="downloadAccount" type="primary">下载注册列表<i class="el-icon-download el-icon--right"></i></el-button>
      <el-button @click="downloadTeamList" type="primary">下载队伍列表<i class="el-icon-download el-icon--right"></i></el-button>
    </div>
    <div class="filter_contain">
      <p>
        <span>编号：</span>
        <el-input v-model="pageForm.teamNo" size="mini"></el-input>
      </p>
      <p>
        <span>方向：</span>
        <el-select size="mini" v-model="pageForm.directionId" placeholder="请选择">
          <el-option
            v-for="item in directArr"
            :key="item.directionName + '1'"
            :label="item.directionName"
            :value="item.directionId">
          </el-option>
        </el-select>
      </p>
      <p>
        <span>课题：</span>
        <el-select size="mini" v-model="pageForm.subjectId" placeholder="请选择">
          <el-option
            v-for="item in subjectArr"
            :key="item.subjectName"
            :label="item.subjectName"
            :value="item.subjectId">
          </el-option>
        </el-select>
      </p>
      <p>
        <span>赛区：</span>
        <el-select size="mini" v-model="pageForm.matchZone" placeholder="请选择">
          <el-option
            v-for="item in provinceData"
            :key="item.code"
            :label="item.matchZone"
            :value="item.code">
          </el-option>
        </el-select>
      </p>
      <el-button @click="resetFilter" class="res">重置</el-button>
      <el-button @click="filterSearch" type="primary">搜索</el-button>
    </div>
    <div class="process_banner">
      <el-tabs v-model="activeType" @tab-click="handleClick">
        <el-tab-pane label="初筛" name="0"></el-tab-pane>
        <el-tab-pane label="半决赛" name="1"></el-tab-pane>
        <el-tab-pane label="决赛" name="2"></el-tab-pane>
      </el-tabs>
    </div>
    <el-table
      width="100%"
      :data="tableData"
      stripe>
      <el-table-column
        min-width="5%"
        prop="teamNo"
        label="队伍编号">
      </el-table-column>
      <el-table-column
        min-width="10%"
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
        min-width="10%"
        label="作品名称">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.opusName" placement="top">
            <span style="color: #33394E">{{scope.row.opusName}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        min-width="7%"
        prop="directionName"
        label="方向">
      </el-table-column>
      <el-table-column
        min-width="10%"
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
        min-width="5%"
        label="赛区">
        <template slot-scope="scope">
          <span>{{getZone(scope.row.matchZone)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="20%"
        prop=""
        label="作品附件">
        <template slot-scope="scope">
          <div>
            <p v-for="(item, index) in scope.row.attachments" :key="index">
              <el-tooltip :content="item.attachmentFileName" placement="top">
                <span @click="getFileDown(item.attachmentId)"><i @click.stop="prevewFile(item.attachmentId)" class="el-icon-view"></i>{{item.attachmentFileName}}</span>
              </el-tooltip>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="10%"
        prop=""
        label="评分">
        <template slot-scope="scope">
          <span>{{scope.row.totalScore / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        min-width="10%"
        prop=""
        label="评审">
        <template slot-scope="scope">
          <PublicButton :class="[scope.row.judgeScoreState === 1 && 'gray_color']" @clickHandle="setSource(scope.row)">评审</PublicButton>
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
import { BASE_URL } from '@/utils/http.js'
import provinceData from '@/config/province.js'
export default {
  components: {
    PublicButton
  },
  data () {
    return {
      value: '',
      provinceData,
      activeType: '0',
      directArr: [],
      subjectArr: [],
      pageForm: {
        // todo
        pageSize: 10,
        pageNo: 1,
        teamProgress: 0,
        directionId: null,
        matchZone: null,
        subjectId: null,
        teamNo: null
      },
      pageData: {},
      tableData: [],
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage.getItem('adminInfo'))
    this.getData()
    this.getCategory()
  },
  methods: {
    ...mapActions(['PREVIEW_JUDGE_DOWN_FILE', 'GET_CATEGORYS', 'GET_JUDGE_TEAM_LIST', 'GET_ACCOUNT_LIST', 'GET_DOWN_FILE']),
    async prevewFile (attachmentId) {
      await this.PREVIEW_JUDGE_DOWN_FILE(attachmentId)
    },
    async getFileDown (attachmentId) {
      await this.GET_DOWN_FILE(attachmentId)
    },
    async downloadAccount () {
      window.open(`${BASE_URL}/admin/account/dowload`)
    },
    async downloadTeamList () {
      window.open(`${BASE_URL}/admin/team/dowload`)
    },
    // 获取类目
    async getCategory () {
      const res = await this.GET_CATEGORYS()
      if (res.result === '0' && res.data) {
        this.directArr = res.data
        res.data.map(item => {
          this.subjectArr = this.subjectArr.concat(item.subjects)
        })
      }
    },
    resetFilter () {
      this.pageForm.directionId = null
      this.pageForm.matchZone = null
      this.pageForm.subjectId = null
      this.pageForm.teamNo = null
    },
    // 搜索
    filterSearch () {
      // todo
      this.pageForm.pageNo = 1
      this.getData()
    },
    // 切换分页
    pageChange (data) {
      this.pageForm.pageNo = data
      this.getData()
    },
    // 切换赛事类型
    handleClick (e) {
      // todo
      this.pageForm = {
        pageSize: 10,
        pageNo: 1,
        teamProgress: e.name,
        directionId: null,
        matchZone: null,
        subjectId: null,
        teamNo: null
      }
      this.activeType = e.name
      this.getData()
    },
    // 点击评分
    setSource (row) {
      console.log('row:', row)
      this.$router.push({
        path: '/works/desc',
        query: {
          teamNo: row.teamNo,
          teamProgress: this.activeType
        }
      })
    },
    // 通过
    pass (row) {
      this.$router.push({
        path: 'desc'
      })
      console.log('通过:', row)
    },
    // 获取页面数据
    async getData () {
      const params = this.pageForm
      const res = await this.GET_JUDGE_TEAM_LIST(params)
      if (res.result === '0' && res.data) {
        this.pageData = res.data
        this.tableData = res.data.records
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.works_list_container {
  .el-icon-view {
    margin-right: 5px;

    color: #dc1e32;
   &:hover {
      color: #333;
}
  }
  .filter_contain{
    display: flex;
    p {
      width: 20%;
    }
  }
  .down_list {
    margin-bottom: 20px;
  }
  .gray_color {
    background-color: #4a3636;
  }
}
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
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
  span.el-tooltip {
    width: 100%;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    color: #409EFF;
  }
  .filter_contain {
    p {
      .el-input--mini, .el-select--mini {
        width: 70%;
        .el-input--mini {
          width: 100%;
        }
      }
    }
  }
</style>

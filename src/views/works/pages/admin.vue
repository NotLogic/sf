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
      <p>
        <span>队伍：</span>
        <el-select size="mini" v-model="pageForm.status" placeholder="请选择">
          <el-option
            v-for="item in workOption"
            :key="item.label"
            :label="item.label"
            :value="item.value">
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
      :data="tableData"
      stripe>
      <el-table-column
        prop="teamNo"
        label="队伍编号">
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
        label="作品名称">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.opusName" placement="top">
            <span style="color: #33394E">{{scope.row.opusName}}</span>
          </el-tooltip>
        </template>
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
        <template slot-scope="scope">
          <div>
            <p v-for="(item, index) in scope.row.attachments" :key="index">
              <el-tooltip :content="item.attachmentFileName" placement="top">
                <span @click="getFileDown(item.attachmentId)">{{item.attachmentFileName}}</span>
              </el-tooltip>
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="得分">
        <template slot-scope="scope">
          <span>{{scope.row.totalScore / 100 || '---'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="评审情况">
        <template slot-scope="scope">
          <PublicButton v-if="activeType !== '2'" @clickHandle="pass(scope.row)">通过</PublicButton>
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
      provinceData,
      activeType: '0',
      directArr: [],
      subjectArr: [],
      workOption: [
        {
          label: '有作品的队伍',
          value: 123
        },
        {
          label: '所有队伍',
          value: null
        }
      ],
      pageForm: {
        pageSize: 10,
        pageNo: 1,
        teamProgress: 0,
        directionId: null,
        matchZone: null,
        subjectId: null,
        teamNo: null,
        status: 123
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
    ...mapActions(['PUT_EDIT_PROCESS', 'GET_CATEGORYS', 'GET_TEAM_LIST', 'GET_ACCOUNT_LIST', 'GET_DOWN_FILE']),
    async getFileDown (attachmentId) {
      await this.GET_DOWN_FILE(attachmentId)
    },
    async downloadAccount () {
      window.open(`${BASE_URL}/admin/account/dowload`)
    },
    async downloadTeamList () {
      window.open(`${BASE_URL}/admin/team/dowload`)
    },
    // 搜索
    filterSearch () {
      // todo
      this.pageForm.pageNo = 1
      this.getData()
    },
    resetFilter () {
      this.pageForm.directionId = null
      this.pageForm.matchZone = null
      this.pageForm.subjectId = null
      this.pageForm.teamNo = null
      this.pageForm.status = 123
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
    // 切换分页
    pageChange (data) {
      this.pageForm.pageNo = data
      this.pageForm.status = 123
      this.getData()
    },
    // 切换赛事类型
    handleClick (e) {
      this.pageForm = {
        pageSize: 10,
        pageNo: 1,
        teamProgress: e.name,
        directionId: null,
        matchZone: null,
        subjectId: null,
        status: 123,
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
        query: {}
      })
    },
    // 通过
    async pass (row) {
      console.log('通过:', row)
      const res = await this.PUT_EDIT_PROCESS({
        teamProgress: Number(this.activeType) + 1,
        teamNo: row.teamNo
      })
      if (res.result === '0' && res.data) {
        this.getData()
        this.$message.success(res.msg)
      }
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
.works_list_container {
  .filter_contain{
    display: flex;
    p {
      width: 15%;
    }
  }
  .down_list {
    margin-bottom: 20px;
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

<template>
  <div class="works_desc_container">
    <!-- <div class="page_title">评委评分功能</div> -->
    <div class="content_container">
      <PublicTitle title="作品附件"></PublicTitle>
      <div class="content_main">
        <div class="content_item file_item">
          <p>作品说明书</p>
          <div v-show="item.attachmentType === 0" v-for="(item, index) in pageData.attachments" :key="index" class="work_name">
            <el-tooltip class="item" effect="dark" :content="item.attachmentFileName" placement="top-start">
              <span @click="getFileDown(item.attachmentId)" class="work_item">{{item.attachmentFileName}}</span>
            </el-tooltip>
          </div>
        </div>
        <div class="content_item file_item">
          <p>作品介绍</p>
          <div v-show="item.attachmentType === 1" v-for="(item, index) in pageData.attachments" :key="index" class="work_name">
            <el-tooltip class="item" effect="dark" :content="item.attachmentFileName" placement="top-start">
              <span @click="getFileDown(item.attachmentId)" class="work_item">{{item.attachmentFileName}}</span>
            </el-tooltip>
          </div>
        </div>
        <div class="content_item file_item">
          <p>附件</p>
          <div v-show="item.attachmentType === 2" v-for="(item, index) in pageData.attachments" :key="index" class="work_name">
            <el-tooltip class="item" effect="dark" :content="item.attachmentFileName" placement="top-start">
              <span @click="getFileDown(item.attachmentId)" class="work_item">{{item.attachmentFileName}}</span>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="content_container">
      <PublicTitle title="评分"></PublicTitle>
      <div class="score_main">
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">方案完整性:</span>
            <span class="source_sub_title">方案结构完整，切题准确，提供明确的方案解决思路，无明显错误<span class="red_color">(满分15分)</span></span>
          </div>
          <div class="source_right">
            <el-input @blur="calcScore" type="number" v-model="integrity" placeholder="方案完整性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">数据有效性:</span>
            <span class="source_sub_title">数据信息准确有效，对方案设计有支撑作用<span class="red_color">(满分15分)</span></span>
          </div>
          <div class="source_right">
            <el-input @blur="calcScore" type="number" v-model="effect" placeholder="数据有效性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">方案设计科学性:</span>
            <span class="source_sub_title">有明确、适用的设计方法，采用了定性和定量手段,设计方法科学、严谨<span class="red_color">(满分20分)</span></span>
          </div>
          <div class="source_right">
            <el-input @blur="calcScore" type="number" v-model="scientificity" placeholder="方案设计科学性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">方案实用性:</span>
            <span class="source_sub_title">方案依据充分，联系实际情况，可落地实施<span class="red_color">(满分25分)</span></span>
          </div>
          <div class="source_right">
            <el-input @blur="calcScore" type="number" v-model="practicability" placeholder="方案实用性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">方案创新性:</span>
            <span class="source_sub_title">方案存在创新理念，亮点突出<span class="red_color">(满分25分)</span></span>
          </div>
          <div class="source_right">
            <el-input v-model="innovation" @blur="calcScore" placeholder="方案创新性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">评语</div>
          <div class="source_right text_area">
            <el-input maxlength="200" @blur="calcScore" :rows="3" v-model="comments" type="textarea" placeholder="评语"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left"></div>
          <div class="source_right">
            <el-input v-model="score" placeholder="综合评分"></el-input>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐级别 -->
    <!-- <div class="content_container">
      <PublicTitle title="推荐级别"></PublicTitle>
      <div class="radio_Container">
        <el-radio-group v-model="submitForm.level">
          <div class="radio_item"><el-radio :label="0">否决</el-radio></div>
          <div class="radio_item"><el-radio :label="1">一般推荐</el-radio></div>
          <div class="radio_item"><el-radio :label="2">强烈推荐</el-radio></div>
          <div class="radio_item"><el-radio :label="3">取消推荐</el-radio></div>
        </el-radio-group>
      </div>
    </div> -->
    <!-- <div class="comment_container">
      <el-input placeholder="评语"
        type="textarea"
        :autosize="{
          minRows: 2,
          maxRows: 6
        }"></el-input>
    </div> -->
    <div class="submit_btn_container">
      <el-button @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PublicTitle from '@/components/public_title.vue'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      // 页面数据
      pageData: '',
      submitForm: {
        level: ''
      },
      // 创新性
      integrity: '',
      // 实用性
      effect: '',
      // 安全性
      scientificity: '',
      // 通用性
      practicability: '',
      // 价值
      innovation: '',
      // 评语
      comments: '',
      // 总分
      score: 0
    }
  },

  created () {
    this.getTeamDetail()
  },
  methods: {
    ...mapActions(['GET_JUDGE_TEAM_DETAIL', 'GET_JUDGE_DOWN_FILE', 'POST_JUDGE_SCORE']),
    calcScore () {
      let all = 0
      const reg = /(^[0-9]{1,3}$)|(^[0-9]{1,2}[.]{1}[0-9]{1,2}$)/
      reg.test(this.integrity) ? (all = this.integrity * 100) : all = 0
      reg.test(this.effect) && (all += (this.effect * 100))
      reg.test(this.scientificity) && (all += (this.scientificity * 100))
      reg.test(this.practicability) && (all += (this.practicability * 100))
      reg.test(this.innovation) && (all += (this.innovation * 100))
      this.score = all / 100
    },
    // 下载文件
    async getFileDown (attachmentId) {
      await this.GET_JUDGE_DOWN_FILE(attachmentId)
    },
    // 获取队伍详情
    async getTeamDetail () {
      const res = await this.GET_JUDGE_TEAM_DETAIL({
        teamNo: this.$route.query.teamNo,
        teamProgress: this.$route.query.teamProgress
      })
      if (res.result === '0' && res.data) {
        this.comments = res.data.comments
        this.score = res.data.totalScore / 100 || 0
        res.data.scoreDimensions.map(item => {
          this[item.dimensionCode] = item.score / 100
        })
        this.pageData = res.data
      }
      console.log(res, '队伍详情')
    },
    // 提交
    async submit () {
      if (!this.integrity) {
        this.$message.error('请填写创新性评分')
        return
      }
      if (!this.effect) {
        this.$message.error('请填写实用性评分')
        return
      }
      if (!this.scientificity) {
        this.$message.error('请填写安全性评分')
        return
      }
      if (!this.practicability) {
        this.$message.error('请填写通用性评分')
        return
      }
      if (!this.innovation) {
        this.$message.error('请填写潜在价值评分')
        return
      }
      const arr = ['integrity', 'effect', 'scientificity', 'practicability', 'innovation']
      const objArr = []
      let obj = {}
      for (let i = 0; i < arr.length; i++) {
        obj = {}
        obj.dimensionCode = arr[i]
        obj.score = this[arr[i]] * 100
        objArr.push(obj)
      }
      const params = {
        comments: this.comments,
        teamNo: this.$route.query.teamNo,
        totalScore: this.score * 100,
        scoreDimensions: objArr
      }
      const res = await this.POST_JUDGE_SCORE(params)
      if (res.result === '0' && res.data) {
        this.$message.success(res.msg)
        this.$router.push('list')
      }
      console.log(res, '评分结果')
      // this.$router.push('/works/list')
    },
    // 预览文件
    previewFile (file) {
      console.log('file:', file)
    }
  }
}
</script>

<style lang="scss" scoped>
.works_desc_container {
  .red_color {
    color: #dc1e32;
  }
  .title {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  .content_container {
    margin-bottom: 20px;
  }
  .content_main {
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    padding-top: 15px;
    .content_item {
      margin-bottom: 20px;
      width: 30%;
      &.file_item {
        color: #333;
      }
      .work_name {
        display: flex;
        align-items: center;
        color: #dc1e32;
        margin-top: 5px;
        .work_item {
          display: inline-block;
          width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          color: #dc1e32;
        }
        .el-icon-download {
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .score_main {
    padding-top: 15px;
    .score_item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .source_left {
        width: 70%;
      }
      .source_right {}
    }
  }
  .radio_Container {
    .radio_item {
      margin-bottom: 10px;
    }
  }
  .comment_container {
    margin: 20px 0;
  }
}
</style>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
}
.text_area {
  width: 300px;
}
</style>

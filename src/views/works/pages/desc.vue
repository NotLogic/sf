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
              <span @click="getFileDown(item.attachmentId)" class="work_item"><i @click.stop="prevewFile(item.attachmentId, item.attachmentFileName)" class="el-icon-view"></i>{{item.attachmentFileName}}</span>
            </el-tooltip>
          </div>
        </div>
        <div class="content_item file_item">
          <p>作品介绍</p>
          <div v-show="item.attachmentType === 1" v-for="(item, index) in pageData.attachments" :key="index" class="work_name">
            <el-tooltip class="item" effect="dark" :content="item.attachmentFileName" placement="top-start">
              <span @click="getFileDown(item.attachmentId)" class="work_item"><i @click.stop="prevewFile(item.attachmentId, item.attachmentFileName)" class="el-icon-view"></i>{{item.attachmentFileName}}</span>
            </el-tooltip>
          </div>
        </div>
        <div class="content_item file_item">
          <p>附件</p>
          <div v-show="item.attachmentType === 2" v-for="(item, index) in pageData.attachments" :key="index" class="work_name">
            <el-tooltip class="item" effect="dark" :content="item.attachmentFileName" placement="top-start">
              <span @click="getFileDown(item.attachmentId)" class="work_item"><i @click.stop="prevewFile(item.attachmentId, item.attachmentFileName)" class="el-icon-view"></i>{{item.attachmentFileName}}</span>
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
            <el-tooltip class="item" effect="dark" content="优秀（17-20） 通过实际调研收集的数据（或组委会提供）、数据完整，数据对方案有支撑作用
良好（13-16） 通过实际调研收集的数据（或组委会提供）、数据不完整、数据对方案有支撑作用
一般（9-12） 无实际的调研，组委会提供数据、数据对方案有支撑作用
较差（5-8） 无实际的调研，组委会提供数据+网上复制数据，数据对方案有支撑作用
差（1-4） 无实际的调研，组委会提供数据+网上复制数据，数据对方案无支撑作用" placement="top-start">
              <span class="source_title">数据采集与分析:</span>
            </el-tooltip>
            <!-- <span class="source_title">数据采集与分析:</span> -->
            <span class="source_sub_title">数据采集信息准确有效，对方案设计有支撑作用，数据完整<span class="red_color">(满分20分)</span></span>
          </div>
          <div class="source_right">
            <el-input @blur="calcScore" type="number" v-model="integrity" placeholder="数据采集与分析(请输入整数)"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <el-tooltip class="item" effect="dark" content="优秀（17-20） 切题准确，完整作品要包括：课题、摘要、关键词、目录、研究过程说明、创新点与价值说明+ PPT作品介绍
良好（13-16） 切题准确，少了（课题、摘要、关键词、目录、），但是有+研究过程说明、创新点与价值说明+PPT作品介绍
一般（9-12） 切题准确，少了（研究过程）但是有PPT作品介绍
较差（5-8） 切题不准，少了（研究过程）+无 PPT作品介绍
差（1-4） 切题不准，少了（研究过程、创新点与价值说明）+无 PPT作品介绍" placement="top-start">
            <span class="source_title">完整性:</span>
            </el-tooltip>
            <span class="source_sub_title">方案结构完整，切题准确，提供明确的方案解决思路，无明显错误<span class="red_color">(满分20分)</span></span>
          </div>
          <div class="source_right">
            <el-input @blur="calcScore" type="number" v-model="effect" placeholder="完整性(请输入整数)"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <el-tooltip class="item" effect="dark" content="优秀（17-20） 可以直接运用到业务场景
良好（13-16） 简单指导后可以运用到业务场景
一般（9-12） 方案依据充分，但没有联系实际情况，无法落地
较差（5-8） 方案无依据有逻辑，无法落地
差（1-4） 方案嗷毫无逻辑，无法落地" placement="top-start">
              <span class="source_title">实用性:</span>
            </el-tooltip>
            <!-- <span class="source_title">实用性:</span> -->
            <span class="source_sub_title">方案依据充分，联系实际情况，可落地实施<span class="red_color">(满分20分)</span></span>
          </div>
          <div class="source_right">
            <el-input @blur="calcScore" type="number" v-model="practicability" placeholder="实用性(请输入整数)"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <el-tooltip class="item" effect="dark" content="优秀（17-20） 创新理念，亮点突出
良好（13-16） 创新理念，亮点不突出
一般（9-12） 无创新，但是亮点突出
较差（5-8） 无创新，无亮点
差（1-4） 无创新，无亮点" placement="top-start">
              <span class="source_title">创新性:</span>
            </el-tooltip>
            <!-- <span class="source_title">创新性:</span> -->
            <span class="source_sub_title">方案存在创新理念，亮点突出<span class="red_color">(满分20分)</span></span>
          </div>
          <div class="source_right">
            <el-input v-model="innovation" type="number" @blur="calcScore" placeholder="创新性(请输入整数)"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <el-tooltip class="item" effect="dark" content="优秀（17-20） 潜在价值很高，有意向签订版权
良好（13-16） 潜在价值较高高，希望该组学生来顺丰实习，指导再探讨
一般（9-12） 潜在价值一般，有亮点
较差（5-8） 无价值，照搬其他人理念
差（1-4） 无价值，照搬其他人理念" placement="top-start">
              <span class="source_title">潜在价值:</span>
            </el-tooltip>
            <span class="source_title">潜在价值:</span>
            <span class="source_sub_title">方案的发展前景评估<span class="red_color">(满分20分)</span></span>
          </div>
          <div class="source_right">
            <el-input @blur="calcScore" type="number" v-model="scientificity" placeholder="潜在价值(请输入整数)"></el-input>
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
            <el-input :disabled="true" v-model="score" placeholder="综合评分"></el-input>
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
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
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
      // pageData: { teamNo: '0015', progress: null, comments: null, totalScore: null, scoreDimensions: [], attachments: [{ attachmentId: 2069, attachmentType: 2, attachmentFileName: '大四喜对0015-附件.zip' }, { attachmentId: 2070, attachmentType: 0, attachmentFileName: '大四喜对0015-队伍介绍.docx' }, { attachmentId: 2110, attachmentType: 1, attachmentFileName: '大四喜对0015 规划方案及PPT展示.zip' }] },
      pageData: {},
      submitForm: {
        level: ''
      },
      // 创新性
      integrity: null,
      // 实用性
      effect: null,
      // 安全性
      scientificity: null,
      // 通用性
      practicability: null,
      // 价值
      innovation: null,
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
    ...mapActions(['PREVIEW_JUDGE_DOWN_FILE', 'GET_JUDGE_TEAM_DETAIL', 'GET_JUDGE_DOWN_FILE', 'POST_JUDGE_SCORE']),
    calcScore () {
      let all = 0
      // const reg = /(^[0-9]{1,3}$)|(^[0-9]{1,2}[.]{1}[0-9]{1,2}$)/
      const reg = /^[0-9]*$/
      if (reg.test(this.integrity)) {
        all += Number(this.integrity)
      } else {
        this.integrity = 0
        all += 0
        this.score = all
        return
      }
      if (reg.test(this.effect)) {
        all += Number(this.effect)
      } else {
        this.effect = 0
        all += 0
        this.score = all
        return
      }
      if (reg.test(this.practicability)) {
        all += Number(this.practicability)
      } else {
        this.practicability = 0
        all += 0
        this.score = all
        return
      }
      if (reg.test(this.innovation)) {
        all += Number(this.innovation)
      } else {
        this.innovation = 0
        all += 0
        this.score = all
        return
      }
      if (reg.test(this.scientificity)) {
        all += Number(this.scientificity)
      } else {
        this.scientificity = 0
        all += 0
        this.score = all
        return
      }
      this.score = all
    },
    async prevewFile (attachmentId, file) {
      const patternFileExtension = /.([0-9a-z]+)(?:[?#]|$)/i
      const fileExtension = (file).match(patternFileExtension)
      attachmentId = attachmentId + fileExtension[0]
      await this.PREVIEW_JUDGE_DOWN_FILE(attachmentId)
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
      if (this.integrity === null || Number(this.integrity) > 20) {
        this.$message.error('请填写分数小于20的数据采集与分析')
        return
      }
      if (this.effect === null || Number(this.effect) > 20) {
        this.$message.error('请填写分数小于20的完整性')
        return
      }
      if (this.practicability === null || Number(this.practicability) > 20) {
        this.$message.error('请填写分数小于20的实用性')
        return
      }
      if (this.innovation === null || Number(this.innovation) > 20) {
        this.$message.error('请填写分数小于20的创新性')
        return
      }
      if (this.scientificity === null || Number(this.scientificity) > 20) {
        this.$message.error('请填写分数小于20的潜在价值')
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
  .el-icon-view {
    margin-right: 5px;

    color: #dc1e32;
   &:hover {
      color: #333;
}
  }
  .submit_btn_container {
    text-align: right;
  }
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
      .source_right {
        width: 20%;
      }
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
.el-tooltip__popper {
  width: 600px!important;
}
</style>

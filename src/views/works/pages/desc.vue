<template>
  <div class="works_desc_container">
    <!-- <div class="page_title">评委评分功能</div> -->
    <div class="content_container">
      <PublicTitle title="作品附件"></PublicTitle>
      <div class="content_main">
        <div class="content_item file_item"
          v-for="(item, index) in files"
          :key="index"
          @click="previewFile(item)">{{item.name}}</div>
      </div>
    </div>
    <div class="content_container">
      <PublicTitle title="评分"></PublicTitle>
      <div class="score_main">
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">创新性：</span>
            <span class="source_sub_title">作品新颖，亮点突出</span>
          </div>
          <div class="source_right">
            <el-input placeholder="创新性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">实用性：</span>
            <span class="source_sub_title">作品可实施，逻辑可实现</span>
          </div>
          <div class="source_right">
            <el-input placeholder="实用性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">安全性：</span>
            <span class="source_sub_title">保障物流安全</span>
          </div>
          <div class="source_right">
            <el-input placeholder="安全性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">通用性：</span>
            <span class="source_sub_title">符合大多数 场景应用</span>
          </div>
          <div class="source_right">
            <el-input placeholder="通用性"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left">
            <span class="source_title">潜在价值：</span>
            <span class="source_sub_title">发展前景</span>
          </div>
          <div class="source_right">
            <el-input placeholder="潜在价值"></el-input>
          </div>
        </div>
        <div class="score_item">
          <div class="source_left"></div>
          <div class="source_right">
            <el-input placeholder="综合评分"></el-input>
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
import PublicTitle from '@/components/public_title.vue'
export default {
  components: {
    PublicTitle
  },
  data () {
    return {
      // 页面数据
      pageData: {},
      submitForm: {
        level: ''
      }
    }
  },
  computed: {
    files () {
      return this.pageData.files || [
        {
          id: 1,
          name: '作品说明书'
        }, {
          id: 2,
          name: '作品介绍'
        }, {
          id: 3,
          name: '附件'
        }
      ]
    }
  },
  methods: {
    submit () {
      this.$router.push('/works/list')
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
        cursor: pointer;
        color: #409eff;
      }
    }
  }
  .score_main {
    padding-top: 15px;
    .score_item {
      display: flex;
      margin-bottom: 15px;
      .source_left {
        width: 250px;
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

<template>
  <div class="works_desc_container">
    <!-- <div class="page_title">评委评分功能</div> -->
    <div class="content_container">
      <div class="title">作品附件</div>
      <div class="content_main">
        <div class="content_item file_item"
          v-for="(item, index) in files"
          :key="index"
          @click="previewFile(item)">{{item.name}}</div>
      </div>
    </div>
    <div class="content_container">
      <div class="title">评分</div>
      <div class="content_main">
        <div class="content_item">
          <el-input placeholder="创新性"></el-input>
        </div>
        <div class="content_item">
          <el-input placeholder="安全性"></el-input>
        </div>
        <div class="content_item">
          <el-input placeholder="潜在价值"></el-input>
        </div>
        <div class="content_item">
          <el-input placeholder="实用性"></el-input>
        </div>
        <div class="content_item">
          <el-input placeholder="通用性"></el-input>
        </div>
        <div class="content_item">
          <el-input placeholder="综合评分"></el-input>
        </div>
      </div>
    </div>
    <div class="content_container">
      <div class="title">推荐级别</div>
      <div class="radio_Container">
        <el-radio-group v-model="submitForm.level">
          <div class="radio_item"><el-radio :label="0">否决</el-radio></div>
          <div class="radio_item"><el-radio :label="1">一般推荐</el-radio></div>
          <div class="radio_item"><el-radio :label="2">强烈推荐</el-radio></div>
          <div class="radio_item"><el-radio :label="3">取消推荐</el-radio></div>
        </el-radio-group>
      </div>
    </div>
    <div class="comment_container">
      <el-input placeholder="评语"
        type="textarea"
        :autosize="{
          minRows: 2,
          maxRows: 6
        }"></el-input>
    </div>
    <div class="submit_btn_container">
      <el-button @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
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
    .content_item {
      margin-bottom: 20px;
      width: 30%;
      &.file_item {
        cursor: pointer;
        color: #409eff;
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

<template>
  <div class="story-creation">
    <el-form class="story-form" label-width="auto" :rules="rules"
             :model="storyForm" ref="storyForm">
      <el-form-item prop="title">
        <el-input class="title" v-model="storyForm.title" placeholder="请输入文章标题"/>
        <span class="required">*</span>
      </el-form-item>
      <el-form-item prop="content" class="story-content">
        <editor v-model="storyForm.content" class="story-editor"
                @onEditorContentChange="updateStoryContent"/>
      </el-form-item>
      <el-form-item class="btn-group">
        <el-button type="primary" class="btn" @click="handlePostBtnClick">发布</el-button>
        <el-button class="btn">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '../components/Editor';

export default {
  name: 'StoryCreation',
  components: { Editor },
  data() {
    return {
      storyContentHtml: '',
      storyForm: {
        title: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入内容' },
        ],
      },
    };
  },
  methods: {
    updateStoryContent({ html, text }) {
      this.storyForm.content = text;
      this.storyContentHtml = html;
    },
    handlePostBtnClick() {
      this.$refs.storyForm.validate((validate) => {
        if (validate) {
          console.log(this.storyForm);
          console.log(this.storyContentHtml);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'src/common/styles/dimens';

  .flex {
    display: flex;
  }

  .story-creation {
    margin-top: $basic-margin * 2;
    height: inherit;
  }

  .required {
    color: red;
    margin-left: 2px;
    position: absolute;
    top: -20px;
    right: -10px;
  }

  .btn-group {
    text-align: right;
  }

  .btn {
    width: 120px;
  }
</style>

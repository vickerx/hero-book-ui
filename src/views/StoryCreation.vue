<template>
  <div>
    <el-alert v-if="message" :title="message"
              :type="isSuccess ? 'success' : 'error'"
              center show-icon :closable="false"></el-alert>

    <div v-if="isLogin" class="story-creation">
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
          <el-button type="primary" class="btn" @click="handlePostBtnClick"
                     :disabled="postBtnDisabled">发布</el-button>
          <el-button class="btn" @click="handleCancelBtnClick">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else class="login-hint">登录后可发布英雄事迹</div>

  </div>
</template>

<script>
import { trim, isEmpty } from 'lodash';
import { mapState } from 'vuex';
import Editor from '../components/Editor';
import { postStory } from '../common/network/api';

const abstractContentMaxLength = 300;

export default {
  name: 'StoryCreation',
  components: { Editor },
  data() {
    return {
      isSuccess: false,
      message: '',
      postBtnDisabled: false,
      storyContentHtml: '',
      storyForm: {
        title: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur', transform: trim },
          { min: 1, max: 200, message: '标题长度为 1 到 200 字符' },
        ],
        content: [
          { required: true, message: '请输入内容', transform: trim },
        ],
      },
    };
  },
  computed: { ...mapState({ isLogin: ({ userInfo }) => !isEmpty(userInfo) }) },
  methods: {
    isDirty() {
      const { title, content } = this.storyForm;
      return (title + content).trim() !== '';
    },
    updateStoryContent({ html, text }) {
      this.storyForm.content = text.replace(/&nbsp;/g, ' ');
      this.storyContentHtml = html;
    },
    handlePostBtnClick() {
      this.message = '';
      this.$refs.storyForm.validate((validate) => {
        if (validate) {
          const { title, content } = this.storyForm;
          const abstractContent = content.length > abstractContentMaxLength
            ? `${content.slice(0, abstractContentMaxLength)}...`
            : content;
          this.toPostStory({ title, content: this.storyContentHtml, abstractContent });
        }
      });
    },
    toPostStory(story) {
      this.postBtnDisabled = true;
      postStory(story)
        .then(() => this.handlePOstStorySuccess())
        .catch(() => {
          this.isSuccess = false;
          this.message = '发布失败，请稍后重试';
          this.postBtnDisabled = false;
        });
    },
    handlePOstStorySuccess() {
      this.isSuccess = true;
      this.message = '发布成功';
      setTimeout(() => {
        this.$refs.storyForm.resetFields();
        this.$router.back();
      }, 500);
    },
    handleCancelBtnClick() {
      this.$router.back();
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.isDirty()) {
      this.$alert('离开当页会丢失未保存数据', '确认离开？', { showCancelButton: true, closeOnHashChange: false })
        .then(() => next())
        .catch(() => next(false));
    } else {
      next();
    }
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  mounted() {
    window.onbeforeunload = (e) => {
      if (!this.isDirty()) {
        return null;
      }
      if (e) {
        e.returnValue = 'leave alert';
      }
      return 'leave alert';
    };
  },
};
</script>

<style scoped lang="scss">
  @import 'src/common/styles/dimens';
  @import 'src/common/styles/colors';

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

  .login-hint {
    color: $grey;
    font-size: 18px;
    margin-top: $basic-margin;
  }

  .story-content {
    margin-top: $basic-margin * 3;
  }
</style>

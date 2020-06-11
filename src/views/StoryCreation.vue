<template>
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
        <el-button type="primary" class="btn" @click="handlePostBtnClick">发布</el-button>
        <el-button class="btn" @click="handleCancelBtnClick">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div v-else class="login-hint">登录后可发布英雄事迹</div>
</template>

<script>
import { trim, noop, isEmpty } from 'lodash';
import { mapState } from 'vuex';
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
          { required: true, message: '请输入文章标题', trigger: 'blur', transform: trim },
        ],
        content: [
          { required: true, message: '请输入内容', transform: trim },
        ],
      },
    };
  },
  computed: { ...mapState({ isLogin: ({ userInfo }) => !isEmpty(userInfo) }) },
  methods: {
    updateStoryContent({ html, text }) {
      console.log(this.$refs.storyForm);
      this.storyForm.content = text.replace(/&nbsp;/g, '');
      this.storyContentHtml = html;
    },
    handlePostBtnClick() {
      this.$refs.storyForm.validate((validate) => {
        if (validate) {
        //  todo: to post story
        }
      });
    },
    handleCancelBtnClick() {
      const { title, content } = this.storyForm;
      const value = (title + content).trim();
      if (value === '') {
        this.$router.back();
      } else {
        this.$alert('离开当页会丢失未保存数据', '确认取消？', { showCancelButton: true })
          .then(() => this.$router.back())
          .catch(noop);
      }
    },
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
</style>

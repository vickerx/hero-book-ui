<template>
  <div class="story-list-menu">

    <div class="post-story-btn">
      <el-button :type="isLogin ? 'primary' : 'info'" :disabled="!isLogin"
                 @click="handlePostStoryBtnClick">
        发布英雄故事
      </el-button>
      <span v-if="!isLogin" class="hint">登录后可发布英雄事迹</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'StoryListMenu',
  data() {
    return { isLogin: true };
  },
  methods: {
    handlePostStoryBtnClick() {
      console.log(this.$router);
      console.log(this.$route);
      this.$router.push({ path: '/story/create' });
    },
  },
};
</script>

<style scoped lang="scss">
@import "src/common/styles/dimens";
@import "src/common/styles/colors";

  .story-list-menu {
    margin: $basic-margin 0;
    text-align: right;
  }

  .post-story-btn {
    display: inline-flex;
    flex-direction: column;
    width: 160px;
    text-align: center;

    .hint {
      font-size: 14px;
      color: $grey;
    }
  }

</style>

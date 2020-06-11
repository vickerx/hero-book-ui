<template>
  <div class="story-list column-flex" v-loading="isLoading">
    <el-alert v-if="error" :title="error" type="error" center show-icon>
    </el-alert>

    <div class="menu">
      <div class="post-story-btn">
        <el-button :type="isLogin ? 'primary' : 'info'" :disabled="!isLogin"
                   @click="handlePostStoryBtnClick">
          发布英雄故事</el-button>
        <span v-if="!isLogin" class="hint">登录后可发布英雄事迹</span>
      </div>
    </div>

    <div class="content column-flex">
      <div  v-if="stories.content && stories.content.length > 0" class="stories">
        <StoryCard v-for="story in stories.content" :key="story.id" :story="story"></StoryCard>
      </div>

      <div v-else class="empty">暂无数据</div>

      <div class="pagination">
        <el-pagination layout="prev, pager, next" hide-on-single-page
                       :current-page.sync="currentPage"
                       :page-count="stories.totalPages"
                       @current-change="onCurrentPageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import StoryCard from '../components/story-list/StoryCard';

export default {
  name: 'StoryList',
  components: { StoryCard },
  data() {
    return {
      isLogin: true,
      currentPage: 1,
      isLoading: true,
      error: '',
    };
  },
  computed: { ...mapState(['stories']) },
  methods: {
    ...mapActions(['getStories']),
    onCurrentPageChange() {
      this.redirectTo(`/stories/page/${this.currentPage}`);
    },
    resetState() {
      this.isLoading = true;
      this.error = '';
    },
    async fetchStories() {
      this.resetState();
      this.currentPage = Number(this.$route.params.page);
      await this.getStories(this.currentPage).catch((error) => {
        this.error = error;
      });
      this.isLoading = false;
    },
    handlePostStoryBtnClick() {
      this.redirectTo('/stories/create');
    },
    redirectTo(path) {
      this.$router.push({ path });
    },
  },
  created() {
    this.fetchStories();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.fetchStories();
  },
};
</script>

<style scoped lang="scss">
  @import "../common/styles/colors";
  @import "../common/styles/dimens";

  .column-flex {
    display: flex;
    flex-direction: column;
  }

  .story-list {
    min-height: 100%;
    max-height: fit-content;
    align-items: stretch;
  }

  .menu {
    margin: $basic-margin 0;
    text-align: right;
  }

  .content {
    justify-content: space-between;
    flex-grow: 1;
  }

  .pagination {
    margin: $basic-margin * 4 auto;
  }

  .empty {
    margin-top: $basic-margin * 2;
    color: $grey;
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

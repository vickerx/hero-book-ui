<template>
  <div class="story-list column-flex" v-loading="isLoading">
    <el-alert v-if="error" :title="error" type="error" center show-icon></el-alert>

    <story-list-menu></story-list-menu>

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
import StoryListMenu from '../components/story-list/StoryListMenu';

export default {
  name: 'StoryList',
  components: { StoryCard, StoryListMenu },
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
      this.$router.push({ path: `/stories/page/${this.currentPage}` });
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

</style>

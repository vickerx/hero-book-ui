<template>
  <div class="story-list" v-loading="stories.loading">
    <el-alert v-if="stories.error" :title="stories.error" type="error" center show-icon>
    </el-alert>

    <div  v-if="stories.content && stories.content.length > 0" class="content">
      <StoryCard v-for="story in stories.content" :key="story.id" :story="story"></StoryCard>
    </div>

    <div v-else class="empty">暂无数据</div>

    <div class="pagination">
      <el-pagination layout="prev, pager, next"
                     hide-on-single-page
                     :current-page.sync="currentPage"
                     :page-count="stories.totalPages"
                     @current-change="onCurrentPageChange">
      </el-pagination>
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
    return { currentPage: 1 };
  },
  computed: { ...mapState(['stories']) },
  methods: {
    ...mapActions(['getStories']),
    onCurrentPageChange() {
      this.$router.push({ path: `/stories/page/${this.currentPage}` });
    },
    fetchStories() {
      this.currentPage = Number(this.$route.params.page);
      this.getStories(this.currentPage);
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

  .story-list {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100%;
    max-height: fit-content;
    margin-top: $basic-margin;
    justify-content: space-between;
    width: 100%;
  }

  .content {
    width: 100%;
  }

  .pagination {
    margin: $basic-margin * 4 auto;
  }

  .empty {
    margin-top: $basic-margin * 2;
    color: $grey;
  }


</style>

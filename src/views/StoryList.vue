<template>
  <div class="story-list" v-loading.fullscreen="stories.loading">
    <el-alert v-if="stories.error" :title="stories.error" type="error" center show-icon>
    </el-alert>
    <div class="content">
      <StoryCard v-for="story in stories.content" :key="story.id" :story="story"></StoryCard>
    </div>
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
      this.getStories(this.currentPage);
    },
  },
  created() {
    this.currentPage = Number(this.$route.params.page);
    this.fetchStories();
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchStories();
    next();
  },
};
</script>

<style scoped lang="scss">
  @import "../common/styles/colors";

  .content {
    position: relative;
  }

  .pagination {
   margin: 32px auto;
  }

</style>

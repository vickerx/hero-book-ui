<template>
  <div class="story-list">
    <div class="content">
      <StoryCard v-for="story in stories.content" :key="story.id" :story="story"></StoryCard>
    </div>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" hide-on-single-page
                     :current-page="stories.currentPage" :page-count="stories.totalPages">
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
  computed: { ...mapState(['stories']) },
  methods: { ...mapActions(['getStories']) },
  created() {
    this.getStories(1, 20);
  },
};
</script>

<style scoped lang="scss">
  @import "../common/styles/colors";

  .story-list {
    height: 100%;

  }
  .content {
    position: relative;
  }

  .pagination {
   margin: 32px auto;
  }

</style>

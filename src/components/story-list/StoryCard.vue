<template>
  <el-card class="story-card">
    <div class="story-header">
       <span class="flex-item title">
         <router-link :to="`/story/${story.id}`" class="link">{{story.title}}</router-link>
       </span>
      <span class="flex-item author">发布人：{{story.author}}</span>
      <span class="flex-item update-time">更新时间：{{format(story.updatedTime)}}</span>
    </div>
    <p class="content">{{story.abstractContent}}</p>
  </el-card>
</template>

<script>
import { formatUpdatedTime } from '../../common/utils/timeFormatter';

export default {
  name: 'StoryCard',
  props: {
    story: {
      type: Object,
      default: () => ({
        id: 1,
        title: '',
        author: '',
        abstractContent: '',
        createdTime: '',
        updatedTime: '',
      }),
    },
  },
  methods: { format: (time) => formatUpdatedTime(time) },
};
</script>

<style scoped lang="scss">
  @import "../../common/styles/colors";
  @import "../../common/styles/dimens";

  .story-card {
    text-align: left;
    margin-bottom: $basic-margin;
  }

  .story-header {
    display: flex;
  }

  .flex-item {
    margin-right: $basic-margin * 2;

    &:last-child {
      margin-right: 0;
    }
  }

  .title {
    flex: 5;

    .link {
      color: $default-font-color;
      font-weight: bold;
      font-size: 18px;

      &:hover {
        color: $theme;
      }
    }
  }

  .update-time,.author {
    flex: 2;
  }
</style>

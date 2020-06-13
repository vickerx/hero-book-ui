<template>
  <div id="story-detail">
    <el-alert v-if="message" :title="message" type="error" center show-icon></el-alert>

    <div class="title">{{detail.title}}</div>
    <div class="story-info">
      <span class="author">发布人：{{detail.author}}</span>
      <span class="updatedTime">更新时间：{{detail.updatedTime}}</span>
    </div>
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script>
import { getStoryById } from '../common/network/api';
import { formatUpdatedTime } from '../common/utils/timeFormatter';
import { ERROR_MASSAGE } from '../common/network/errors';

export default {
  name: 'StoryDetail',
  data() {
    return {
      detail: {},
      message: '',
    };
  },
  methods: {
    loadStory() {
      getStoryById(this.$route.params.id)
        .then(({ data }) => {
          const updatedTime = formatUpdatedTime(data.updatedTime);
          this.detail = { ...data, updatedTime };
        })
        .catch(() => {
          this.message = ERROR_MASSAGE.SYSTEM_ERROR;
        });
    },
  },
  created() {
    this.loadStory();
  },
};
</script>

<style scoped lang="scss">
  @import "../common/styles/dimens";

  #story-detail {
    text-align: left;
  }

  .story-info {
    color: gray;

    .author {
      margin-right: $basic-margin * 4;
    }
  }

  .title {
    font-size: 28px;
    margin-bottom: $basic-margin;
    margin-top: $basic-margin * 2;
  }

  .content {
    margin-top: $basic-margin * 2;
    font-size: 18px;
  }
</style>

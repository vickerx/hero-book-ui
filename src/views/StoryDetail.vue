<template>
  <div id="story-detail">
    <h2>{{detail.title}}</h2>
    <div class="story-info">
      <span class="author">发布人：{{detail.author}}</span>
      <span class="updatedTime">更新时间：{{detail.updatedTime}}</span>
    </div>
    <pre class="content">
      {{detail.content}}
    </pre>
  </div>
</template>

<script>
const mockData = {
  id: 33,
  title: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  author: '宋水北水北宋水北水北宋水北水北宋水北水北',
  updatedTime: '2020年05月04日',
  content: '“休舱大吉！”3月10日下午，伴随一声高呼，位于武汉市洪山体育馆的武昌方舱医院最后49名患者康复出院。之后，这些患者将在集中隔离点进行为期14天的医学观察，所有医务人员将原地待命，具体安排视疫情发展而定。至此，武汉所有方舱医院均已休舱。\n'
    + '\n'
    + '    戴上眼罩，撑开双臂，在经过两次全身消杀后，马思宇（化名）从医护人员手中接过出院证明。他是武昌方舱医院最后出院的患者。“最大的愿望是能和家人团聚。”马思宇说。\n'
    + '\n'
    + '    “一定要好好照顾自己！”在出舱口，卫尹与马思宇紧紧拥抱。卫尹是复旦大学附属华山医院第三批支援武汉医疗队护理组组长，今天虽不当班，但特意来到医院。“就是给我负责照顾的患者送行。”卫尹说，在方舱医院，医患关系非常融洽，“就像一家人”。',
};

export default {
  name: 'StoryDetail',
  data() {
    return { detail: mockData };
  },
};
</script>

<style scoped lang="scss">
  @import "../common/styles/dimens";

  #story-detail {
  margin-top: $basic-margin * 2;
  }

  .story-info {
    display: flex;
    justify-content: center;
    color: gray;

    .author {
      margin-right: $basic-margin * 4;
    }
  }

  .content {
    text-align: left;
    white-space:pre-wrap;
    margin-top: $basic-margin * 2;
    font-size: 18px;
  }
</style>

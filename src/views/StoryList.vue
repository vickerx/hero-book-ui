<template>
  <div class="story-list">
    <div class="content">
      <StoryCard v-for="story in data.content" :key="story.id" :story="story"></StoryCard>
    </div>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" hide-on-single-page
                     :current-page="data.number" :page-count="data.totalPages">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import StoryCard from '../components/story-list/StoryCard';

const mockStories = [{
  id: 1,
  title: '全国60名公安民警和35名辅警牺牲在抗击疫情和维护安全稳定第一线全国60名公安民警和35名辅警牺牲在抗击疫情和维护安全稳定第一线',
  author: '嘻嘻嘻嘻李嘻嘻嘻嘻李嘻嘻嘻嘻李嘻嘻嘻嘻李',
  contentAbstract: '5月12日是国际护士节，吉林省举行支援湖北医疗队员代表座谈会，深入学习贯彻习近平总书记重要指示精神，转达习近平总书记对广大医务工作者的深切关怀和诚挚慰问。省委书记巴音朝鲁出席会议并讲话，代表省委、省政府，向全省15.7万医护人员致以节日问候和良好祝愿，向支援湖北医疗队和战斗在全省疫情防控第一线的白衣战士致以崇高的敬意、表示衷心的感谢。他强调，全省上下要深入学习抗疫英雄事迹，大力弘扬伟大抗疫精神，让广大医务工作者感受到温暖、享受到尊严，在全社会凝聚起决胜全面小康、加快吉林振兴的磅礴力量。省委副书记、省长景俊海主持会议。',
  createdTime: '2020-06-01T09:02:35.000+00:00',
  updatedTime: '2020-06-01T09:02:35.000+00:00',
},
{
  id: 2,
  title: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  author: '嘻嘻李',
  contentAbstract: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  createdTime: '2020-05-31T09:02:35.000+00:00',
  updatedTime: '2020-05-31T09:02:35.000+00:00',
},
{
  id: 3,
  title: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  author: '嘻嘻嘻嘻李嘻嘻嘻嘻李嘻嘻嘻嘻李嘻嘻嘻嘻李',
  contentAbstract: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  createdTime: '2020-05-29T09:02:35.000+00:00',
  updatedTime: '2020-05-29T09:02:35.000+00:00',
},
{
  id: 6,
  title: '全国60名公安民警和35名辅警牺牲在抗击疫情和维护安全稳定第一线全国60名公安民警和35名辅警牺牲在抗击疫情和维护安全稳定第一线',
  author: '嘻嘻嘻嘻李嘻嘻嘻嘻李嘻嘻嘻嘻李嘻嘻嘻嘻李',
  contentAbstract: '5月12日是国际护士节，吉林省举行支援湖北医疗队员代表座谈会，深入学习贯彻习近平总书记重要指示精神，转达习近平总书记对广大医务工作者的深切关怀和诚挚慰问。省委书记巴音朝鲁出席会议并讲话，代表省委、省政府，向全省15.7万医护人员致以节日问候和良好祝愿，向支援湖北医疗队和战斗在全省疫情防控第一线的白衣战士致以崇高的敬意、表示衷心的感谢。他强调，全省上下要深入学习抗疫英雄事迹，大力弘扬伟大抗疫精神，让广大医务工作者感受到温暖、享受到尊严，在全社会凝聚起决胜全面小康、加快吉林振兴的磅礴力量。省委副书记、省长景俊海主持会议。',
  createdTime: '2020-05-11T09:02:35.000+00:00',
  updatedTime: '2020-05-11T09:02:35.000+00:00',
},
{
  id: 4,
  title: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  author: '嘻嘻李',
  contentAbstract: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  createdTime: '2020-05-10T09:02:35.000+00:00',
  updatedTime: '2020-05-10T09:02:35.000+00:00',
},
{
  id: 5,
  title: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  author: '嘻嘻嘻嘻李嘻嘻嘻嘻李嘻嘻嘻嘻李嘻嘻嘻嘻李',
  contentAbstract: '全国60名公安民警和35名辅警牺牲在抗击疫情',
  createdTime: '2020-05-29T09:02:35.000+00:00',
  updatedTime: '2020-05-29T09:02:35.000+00:00',
},
];

const mockData = {
  number: 1,
  totalPages: 1,
  totalElements: 3,
  content: mockStories,
};
export default {
  name: 'StoryList',
  components: {
    StoryCard,
  },
  data() {
    return {
      data: mockData,
    };
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

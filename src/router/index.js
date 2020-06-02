import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import StoryList from '../views/StoryList';
import SignUpActivation from '../views/SignUpActivation';
import StoryDetail from '../views/StoryDetail';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/stories',
    redirect: '/stories/page/1',
  },
  {
    path: '/stories/page/:page',
    name: 'StoryList',
    component: StoryList,
  },
  {
    path: '/signup-active/:token',
    name: 'SignUpActivation',
    component: SignUpActivation,
  },
  {
    path: '/story/:id',
    name: 'StoryDetail',
    component: StoryDetail,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({ routes });

export default router;

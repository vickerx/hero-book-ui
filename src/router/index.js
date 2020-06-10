import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import StoryList from '../views/StoryList';
import SignUpActivation from '../views/SignUpActivation';
import StoryDetail from '../views/StoryDetail';
import StoryCreation from '../views/StoryCreation';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/story/creat',
    name: 'StoryCreation',
    component: StoryCreation,
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

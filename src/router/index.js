import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import StoryList from '../views/StoryList';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/stories',
    name: 'StoryList',
    component: StoryList,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

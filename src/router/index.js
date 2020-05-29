import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import StoryList from '../views/StoryList';
import SignUpActivation from '../views/SignUpActivation';

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
  {
    path: '/signup-active/:token',
    name: 'SignUpActivation',
    component: SignUpActivation,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;

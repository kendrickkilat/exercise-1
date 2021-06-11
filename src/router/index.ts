import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import PrimeVueComponent from '../views/PrimeVueComponents.vue';
import NewsFeed from '../views/Newsfeed.vue';
import PostDetails from '../views/PostDetails.vue';
import Error404 from '../views/Error404.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/prime-vue-test',
    name: 'PrimeVueComponents',
    component: PrimeVueComponent,
  },
  {
    path: '/newsfeed',
    name: 'NewsFeed',
    component: NewsFeed,
  },
  {
    path: '/newsfeed/:id',
    name: 'PostDetails',
    props: true,
    component: PostDetails,
  },
  {
    path: '/:catchAll(.*)*',
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

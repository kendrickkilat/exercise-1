import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/prime-vue-test',
    name: 'PrimeVueComponents',
    component: () => import('../views/PrimeVueComponents.vue'),
  },
  {
    path: '/newsfeed',
    name: 'NewsFeed',
    component: () => import('../views/Newsfeed.vue'),
  },
  {
    path: '/newsfeed/:id',
    name: 'PostDetails',
    props: true,
    component: () => import('../views/PostDetails.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/Error404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

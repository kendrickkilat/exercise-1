import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import RouteNames from '@/enums/routenames';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.Home,
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/prime-vue-test',
    name: RouteNames.PVC,
    component: () => import('../views/PrimeVueComponents.vue'),
  },
  {
    path: '/newsfeed',
    name: RouteNames.Newsfeed,
    component: () => import('../views/Newsfeed.vue'),
  },
  {
    path: '/newsfeed/:id',
    name: RouteNames.PDetails,
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

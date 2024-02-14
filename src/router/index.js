import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName : "home" */ '@/views/Home.vue'),
  },
  {
    path: '/tv1',
    name: 'tv1',
    props: { number: 1 },
    component: () =>
      import(/* webpackChunkName : "tv1" */ '../views/Television.vue'),
  },
  {
    path: '/tv2',
    name: 'tv2',
    props: { number: 2 },
    component: () =>
      import(/* webpackChunkName : "tv2" */ '@/views/Television.vue'),
  },
  {
    path: '/tv3',
    name: 'tv3',
    props: { number: 3 },
    component: () =>
      import(/* webpackChunkName : "tv3" */ '@/views/Television.vue'),
  },
  {
    path: '/tv4',
    name: 'tv4',
    props: { number: 4 },
    component: () =>
      import(/* webpackChunkName : "tv4" */ '@/views/Television.vue'),
  },
  {
    path: '/tv5',
    name: 'tv5',
    component: () =>
      import(/* webpackChunkName : "tv5" */ '@/views/HybridTelevision.vue'),
  },
  {
    path: '/resultsTV',
    name: 'resultsTV',
    component: () =>
      import(/* webpackChunkName : "tv6" */ '@/views/ResultsTV.vue'),
  },
];

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

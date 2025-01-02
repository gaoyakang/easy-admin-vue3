// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/loginIndex.vue'),
    name: 'login',
  },
  {
    path: '/',
    component: () => import('@/views/home/homeIndex.vue'),
    name: 'layout',
  },
  {
    path: '/404',
    component: () => import('@/views/404/notFound.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
  },
];

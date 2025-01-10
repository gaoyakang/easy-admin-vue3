import type { Component } from 'vue';

// 常量路由:
// hidden表示是否在左侧显示
// title表示在左侧显示的名称
// icon表示在左侧显示的图标
export type RouteType = {
  path: string;
  redirect?: string;
  name?: string;
  component?: () => Promise<Component>; // 使用 Promise<Component> 作为类型
  meta?: {
    title?: string;
    hidden?: boolean;
    icon?: string;
  };
  children?: RouteType[]; // 子路由
};

export const constantRoute: RouteType[] = [
  {
    path: '/login',
    component: () => import('../views/login/loginIndex.vue'),
    name: 'login',
    meta: {
      title: 'login',
      hidden: true,
    },
  },
  {
    path: '/',
    component: () => import('../layout/layoutIndex.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/home/homeIndex.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('../views/404/notFound.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
];

export const asyncRoute: RouteType[] = [
  {
    path: '/system',
    component: () => import('../layout/layoutIndex.vue'),
    name: 'Acl',
    meta: {
      title: '系统管理',
      hidden: false,
      icon: 'Lock',
    },
    redirect: '/system/user',
    children: [
      {
        path: '/system/user',
        component: () => import('../views/acl/user/userIndex.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/system/role',
        component: () => import('../views/acl/role/roleIndex.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Avatar',
        },
      },
      {
        path: '/system/permission',
        component: () => import('../views/acl/permission/permissionIndex.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'List',
        },
      },
    ],
  },
  {
    path: '/monitor',
    component: () => import('../layout/layoutIndex.vue'),
    name: 'Monitor',
    meta: {
      title: '系统监控',
      hidden: false,
      icon: 'Lock',
    },
    children: [],
  },
  {
    path: '/service',
    component: () => import('../layout/layoutIndex.vue'),
    name: 'Service',
    meta: {
      title: '系统服务',
      hidden: false,
      icon: 'Lock',
    },
    children: [],
  },
  {
    path: '/tool',
    component: () => import('../layout/layoutIndex.vue'),
    name: 'Tool',
    meta: {
      title: '系统工具',
      hidden: false,
      icon: 'Lock',
    },
    children: [],
  },
];

export const anyRoute: RouteType = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
  },
};

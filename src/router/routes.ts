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
          title: '权限管理',
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
      icon: 'Monitor',
    },
    redirect: '/monitor/loginlog',
    children: [
      {
        path: '/monitor/loginlog',
        component: () => import('../views/monitor/loginlog/loginLog.vue'),
        name: 'LoginLog',
        meta: {
          title: '登陆日志',
          hidden: false,
          icon: 'Histogram',
        },
      },
      {
        path: '/monitor/sourcelog',
        component: () => import('../views/monitor/sourcelog/sourceLog.vue'),
        name: 'SourceLog',
        meta: {
          title: '资源日志',
          hidden: false,
          icon: 'HelpFilled',
        },
      },
      {
        path: '/monitor/operatelog',
        component: () => import('../views/monitor/operatelog/operateLog.vue'),
        name: 'OperateLog',
        meta: {
          title: '操作日志',
          hidden: false,
          icon: 'Operation',
        },
      },
    ],
  },
  {
    path: '/service',
    component: () => import('../layout/layoutIndex.vue'),
    name: 'Service',
    meta: {
      title: '系统服务',
      hidden: false,
      icon: 'Operation',
    },
    redirect: '/service/file',
    children: [
      {
        path: '/service/file',
        component: () => import('../views/service/file/fileManage.vue'),
        name: 'File',
        meta: {
          title: '文件管理',
          hidden: false,
          icon: 'Files',
        },
      },
      {
        path: '/service/email',
        component: () => import('../views/service/email/emailManage.vue'),
        name: 'Email',
        meta: {
          title: '邮件管理',
          hidden: false,
          icon: 'Notification',
        },
      },
      {
        path: '/service/sms',
        component: () => import('../views/service/sms/smsManage.vue'),
        name: 'SMS',
        meta: {
          title: '短信管理',
          hidden: false,
          icon: 'ChatDotRound',
        },
      },
    ],
  },
  {
    path: '/tool',
    component: () => import('../layout/layoutIndex.vue'),
    name: 'Tool',
    meta: {
      title: '系统工具',
      hidden: false,
      icon: 'Tools',
    },
    redirect: '/tool/gencode',
    children: [
      {
        path: '/tool/gencode',
        component: () => import('../views/tool/gencode/geneCode.vue'),
        name: 'GenCode',
        meta: {
          title: '代码生成',
          hidden: false,
          icon: 'Discount',
        },
      },
    ],
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

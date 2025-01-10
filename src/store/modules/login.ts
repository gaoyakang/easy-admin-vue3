import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogOut } from '../../api/login/index';
import type {
  LoginFormData,
  LoginResponseData,
  LogoutResponseData,
  UserInfoResponseData,
} from '../../api/login/type';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token';
import {
  constantRoute,
  asyncRoute,
  anyRoute,
  type RouteType,
} from '../../router/routes';
import cloneDeep from 'lodash/cloneDeep';
import router from '../../router';
import type { RouteRecordRaw } from 'vue-router';

// 将用户路由和已有路由对比挑选出来
let dynamicRoutes: RouteType[] = [];
function filterAsyncRoute(asyncRoute: RouteType[], routes: string[]) {
  // routes是传来的
  // asyncRoute是代码写死的
  return asyncRoute.filter((item) => {
    if (routes.includes(item.path)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

const useUserStore = defineStore('User', {
  // 存储数据
  state: () => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    };
  },
  // 异步逻辑
  actions: {
    //用户登录方法✅
    async userLogin(data: LoginFormData) {
      const res: LoginResponseData = await reqLogin(data);
      if (res.code === 20308) {
        this.token = res.data?.token as string;
        // 持久化
        SET_TOKEN(res.data?.token as string);
        return res.message;
      } else {
        return Promise.reject(new Error(res.message as string));
      }
    },
    // 获取用户信息
    async userInfo() {
      const res: UserInfoResponseData = await reqUserInfo();
      if (res.code === 20226) {
        // 将用户名和头像保存到store供tab组件使用
        this.username = res.data?.username as string;
        this.avatar = res.data?.avatar as string;

        // 动态生成路由
        // 匹配路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data?.routes as string[],
        );
        // 生成菜单列表
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];

        // 合并默认路由和用户路由
        dynamicRoutes = [...userAsyncRoute, anyRoute];
        // 将所有路由添加到router
        dynamicRoutes.forEach((route) => {
          router.addRoute(route as RouteRecordRaw); // 动态添加路由
        });
        return res.message;
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 退出登陆
    async userLogout() {
      const res: LogoutResponseData = await reqLogOut();
      if (res.code === 20310) {
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
        dynamicRoutes.forEach((route) => {
          if (route.name) {
            router.removeRoute(route.name);
          }
        });
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;

import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/login/index';
import type { LoginFormData, LoginResponseData } from '@/api/login/type';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes';
import cloneDeep from 'lodash/cloneDeep';
import router from '@/router';

let dynamicRoutes = [];
function filterAsyncRoute(asyncRoute, routes) {
  return asyncRoute.filter((item) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

const useUserStore = defineStore('User', {
  // 存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    };
  },
  // 异步逻辑
  actions: {
    //用户登录方法
    async userLogin(data: LoginFormData) {
      const res: LoginResponseData = await reqLogin(data);
      if (res.code === 200) {
        this.token = res.data as string;
        // 持久化
        SET_TOKEN(res.data as string);
        return 'ok';
      } else {
        return Promise.reject(new Error(res.data as string));
      }
    },
    // 获取用户信息
    async userInfo() {
      const res: userInfoResponseData = await reqUserInfo();
      if (res.code === 200) {
        this.username = res.data.name as string;
        this.avatar = res.data.avatar as string;

        // 动态生成路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes,
        );
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];

        dynamicRoutes = [...userAsyncRoute, anyRoute]; // 记录动态添加的路由
        dynamicRoutes.forEach((route) => {
          router.addRoute(route); // 动态添加路由
        });
        return 'ok';
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    // 退出登陆
    async userLogout() {
      const res = await reqLogOut();
      if (res.code === 200) {
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

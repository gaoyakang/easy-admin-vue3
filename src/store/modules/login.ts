import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogOut } from '../../api/login/index';
import type { LoginFormData, LoginResponseData } from '../../api/login/type';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token';
// import { constantRoute, asyncRoute, anyRoute } from '@/router/routes';
import { constantRoute, asyncRoute, anyRoute } from '../../router/routes';
import cloneDeep from 'lodash/cloneDeep';
import router from '../../router';

// 将用户路由和已有路由对比挑选出来
let dynamicRoutes = [];
function filterAsyncRoute(asyncRoute, routes) {
  // console.log(routes);
  // console.log(asyncRoute);
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
      if (res.code === 20308) {
        this.token = res.data.token as string;
        // 持久化
        SET_TOKEN(res.data.token as string);
        return 'ok';
      } else {
        return Promise.reject(new Error(res.data.message as string));
      }
    },
    // 获取用户信息
    async userInfo() {
      const res: userInfoResponseData = await reqUserInfo();
      if (res.code === 20226) {
        this.username = res.data.username as string;
        this.avatar = res.data.avatar as string;

        // 动态生成路由
        // 匹配路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes,
        );
        // 生成菜单列表
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        // console.log(this.menuRoutes);
        // console.log(this.menuRoutes[0].children.length);
        // for (let i = 0; i < this.menuRoutes.length; i++) {
        //   console.log(this.menuRoutes[i].children.length);
        // }

        // 合并默认路由和用户路由
        dynamicRoutes = [...userAsyncRoute, anyRoute];
        // 将所有路由添加到router
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

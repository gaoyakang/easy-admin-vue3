import { defineStore } from 'pinia';
import { reqLogin } from '@/api/user';
import type { LoginFormData, LoginResponseData } from '@/api/user/type';
import { SET_TOKEN, GET_TOKEN } from '@/utils/token';

const useUserStore = defineStore('User', {
  // 存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
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
  },
  getters: {},
});

export default useUserStore;

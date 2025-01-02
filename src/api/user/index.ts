//统一管理项目用户相关的接口
import request from '@/utils/request';
import type { loginFormData, loginResponseData } from './type';

//用户相关的请求地址
enum API {
  LOGIN_URL = 'admin/acl/index/login',
}

//登录接口
export const reqLogin = (data: loginFormData) => {
  return request.post<loginResponseData>(API.LOGIN_URL, data);
};

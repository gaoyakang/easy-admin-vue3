//统一管理项目用户相关的接口
import request from '../../utils/request';
import type {
  LoginFormData,
  LoginResponseData,
  LogoutResponseData,
  UserInfoResponseData,
} from './type';

enum API {
  LOGIN_URL = '/auth/login',
  USERINFO_URL = '/auth/info',
  LOGOUT_URL = '/auth/logout',
}
// 登录接口✅
export const reqLogin = (data: LoginFormData): Promise<LoginResponseData> => {
  return request.post(API.LOGIN_URL, data);
};

// 获取用户信息✅
export const reqUserInfo = (): Promise<UserInfoResponseData> => {
  return request.get(API.USERINFO_URL);
};

// 退出登陆✅
export const reqLogOut = (): Promise<LogoutResponseData> => {
  return request.post(API.LOGOUT_URL);
};

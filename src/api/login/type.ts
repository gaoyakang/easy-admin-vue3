// 登录接口需要携带参数ts类型
export interface LoginFormData {
  username?: string;
  password?: string;
}

// 返回结果的类型
export interface ResponseData {
  code?: number;
  message?: string;
  success?: boolean;
}
// 登陆返回结果
export interface LoginResponseData extends ResponseData {
  data?: {
    token: string;
  };
}

// 获取用户信息返回结果
export interface UserInfoResponseData extends ResponseData {
  data?: {
    username: string;
    avatar: string;
    routes: string[];
    buttons: string[];
    roles: string[];
  };
}

// 登出返回结果
export interface LogoutResponseData extends ResponseData {
  data: [];
}

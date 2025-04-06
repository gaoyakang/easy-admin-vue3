export interface ResponseData {
  code: number;
  message: string;
  success: boolean;
}

// 登陆日志类型
export interface Loginlog {
  id?: number;
  ipaddr: string;
  userName: string;
  loginLocation: string;
  browser: string;
  os: string;
  msg: string;
  status: 1;
  loginTime: string;
}

// 分页查询登陆日志返回结果类型
export interface LoginlogQueryAllResponseData extends ResponseData {
  data: {
    loginlogs: Loginlog[];
    total: number;
  };
}

// 批量删除登陆日志返回结果类型
export interface DeleteLoginLogsResponseData extends ResponseData {
  data: [];
}

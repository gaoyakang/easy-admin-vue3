import request from '../../../utils/request';
import type {
  DeleteLoginLogsResponseData,
  LoginlogQueryAllResponseData,
} from './type';

const API = {
  ALLLOGINLOG_URL: '/monitor/loginlog/all/', // 分页获取登录日志
  BATCHDELETEALLLOGINLOG_URL: '/monitor/loginlog/delete/batch', // 批量删除登录日志
};

// 查询条件
type Keyword = {
  ipaddr: string;
  userName: string;
  status: string;
};

// 分页获取用户✅
export const reqAllLoginLog = (
  page: number,
  limit: number,
  keyword: Keyword,
): Promise<LoginlogQueryAllResponseData> => {
  const params = new URLSearchParams(
    Object.entries(keyword)
      .map(([key, value]) => [key, value || ''])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined),
  );
  return request.get(
    `${API.ALLLOGINLOG_URL}${page}/${limit}?${params.toString()}`,
  );
};

// 批量删除登录日志
export const reqRemoveLoginLogs = (
  ids: number[],
): Promise<DeleteLoginLogsResponseData> => {
  return request.delete(`${API.BATCHDELETEALLLOGINLOG_URL}`, {
    data: { ids: ids },
  });
};

//统一管理项目用户相关的接口
import request from '../../../utils/request';
import type { GetSourcelogResponseData } from './type';

enum API {
  GET_SOURCELOG_URL = '/monitor/sourcelog',
}

// 获取硬件信息
export const reqSourcelogInfo = (): Promise<GetSourcelogResponseData> => {
  return request.get(API.GET_SOURCELOG_URL);
};

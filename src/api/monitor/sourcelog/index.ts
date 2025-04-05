//统一管理项目登陆记录相关的接口
import request from '../../../utils/request';
import type { GetSourcelogResponseData } from './type';

enum API {
  GET_SOURCELOG_URL = '/monitor/sourcelog',
}

// 获取登陆记录
export const reqSourcelogInfo = (): Promise<GetSourcelogResponseData> => {
  return request.get(API.GET_SOURCELOG_URL);
};

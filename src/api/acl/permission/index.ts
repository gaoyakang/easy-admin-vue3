import request from '../../../utils/request';
import type {
  AddOrUpdatePermissionResponseData,
  GetAllPermissionResponseData,
  Permission,
} from './type';

const API = {
  ALLPERMISSION_URL: '/permission/1/999',
  ADDMENU_URL: '/permission',
  UPDATE_URL: '/permission/',
  DELETEMENU_URL: '/permission/',
};

// http://localhost:3000/api/v1/permission/1/40
// 获取所有权限
export const reqAllPermission = (): Promise<GetAllPermissionResponseData> => {
  return request.get(API.ALLPERMISSION_URL);
};

// 新增或更新权限
export const reqAddOrUpdateMenu = (
  data: Permission,
): Promise<AddOrUpdatePermissionResponseData> => {
  if (data.id) {
    return request.patch(API.UPDATE_URL + data.id, data);
  } else {
    return request.post(API.ADDMENU_URL, data);
  }
};

// 删除权限
export const reqRemoveMenu = (
  id: number,
): Promise<AddOrUpdatePermissionResponseData> => {
  return request.delete(API.DELETEMENU_URL + id);
};

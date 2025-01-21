import request from '../../../utils/request';
import type {
  UserQueryAllResponseData,
  User,
  SetRoleData,
  AddOrUpdateUserResponseData,
  DeleteUserResponseData,
  GetUserRoleResponseData,
  AssignUserRoleResponseData,
} from './type';

const API = {
  ALLUSER_URL: '/user/all/',
  ADDUSER_URL: '/user/add',
  UPDATEUSER_URL: '/user/update/',
  ALLROLEURL: '/user/getAssignRole/',
  SETROLE_url: '/user/assignRole/',
  DELETEUSER_URL: '/user/delete/one/',
  DELETEALLUSER_URL: '/user/delete/batch',
};

// 分页获取用户✅
export const reqAllUser = (
  page: number,
  limit: number,
  username: string,
): Promise<UserQueryAllResponseData> => {
  return request.get(API.ALLUSER_URL + `${page}/${limit}?keyword=${username}`);
};

// 新增或更新用户✅
export const reqAddOrUpdateUser = (
  data: User,
): Promise<AddOrUpdateUserResponseData> => {
  if (data.id) {
    return request.patch(API.UPDATEUSER_URL + data.id, data);
  } else {
    return request.post(API.ADDUSER_URL, data);
  }
};

// 删除用户：根据id✅
export const reqRemoveUser = (
  userId: number,
): Promise<DeleteUserResponseData> => {
  return request.delete(API.DELETEUSER_URL + userId);
};

// 批量删除用户✅
export const reqSelectUser = (
  ids: number[],
): Promise<DeleteUserResponseData> => {
  return request.delete(API.DELETEALLUSER_URL, { data: { ids: ids } });
};

// 获取某用户所有角色✅
export const reqAllRole = (id: number): Promise<GetUserRoleResponseData> => {
  return request.get(API.ALLROLEURL + id);
};

// 分配用户角色
export const reqSetUserRole = (
  id: number,
  data: SetRoleData,
): Promise<AssignUserRoleResponseData> => {
  return request.post(API.SETROLE_url + id, data);
};

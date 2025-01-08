import request from '../../../utils/request';
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type';

const API = {
  ALLUSER_URL: '/user/',
  ADDUSER_URL: '/user',
  UPDATEUSER_URL: '/user/',
  ALLROLEURL: '/user/toAssign/',
  SETROLE_url: '/user/doAssignRole',
  DELETEUSER_URL: '/user',
  DELETEALLUSER_URL: '/user',
};

// 新增或更新用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.patch(API.UPDATEUSER_URL + data.id, data);
  } else {
    return request.post(API.ADDUSER_URL, data);
  }
};

// 分配用户角色
export const reqSetUserRole = (data: SetRoleData) => {
  return request.post(API.SETROLE_url, data);
};

// 删除用户：根据id
export const reqRemoveUser = (userId: number) => {
  return request.delete(API.DELETEUSER_URL + userId);
};

// 批量删除用户
export const reqSelectUser = (ids: number[]) => {
  return request.delete(API.DELETEALLUSER_URL, { data: { ids: ids } });
};

// 分页获取用户
export const reqAllUser = (page: number, limit: number, username: string) => {
  return request.get<UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}?keyword=${username}`,
  );
};

// 获取某用户所有角色
export const reqAllRole = (userId: number) => {
  return request.get<AllRoleResponseData>(API.ALLROLEURL + userId);
};

import request from '@/utils/request';
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type';

enum API {
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ALLROLEURL = '/admin/acl/user/toAssign/',
  SETROLE_url = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove/',
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

// 新增或更新用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put(API.UPDATEUSER_URL, data);
  } else {
    return request.post(API.ADDUSER_URL, data);
  }
};

// 分配用户角色
export const reqSetUserRole = (data: SetRoleData) => {
  request.post(API.SETROLE_url, data);
};

// 删除用户：根据id
export const reqRemoveUser = (userId: number) => {
  request.delete(API.DELETEUSER_URL + userId);
};

// 批量删除用户
export const reqSelectUser = (idList: number[]) => {
  request.delete(API.DELETEALLUSER_URL, { data: idList });
};

// 分页获取用户
export const reqAllUser = (page: number, limit: number, username: string) => {
  request.get<UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  );
};

// 获取某用户所有角色
export const reqAllRole = (userId: number) => {
  request.get<AllRoleResponseData>(API.ALLROLEURL + userId);
};

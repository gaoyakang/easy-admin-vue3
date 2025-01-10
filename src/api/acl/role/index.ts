import request from '../../../utils/request';
import type {
  RoleData,
  GetRolePermissionResponseData,
  RoleQueryAllResponseData,
  AddOrUpdateRoleAllResponseData,
  DeleteRoleResponseData,
  RoleAssignPermissionResponseData,
} from './type';

const API = {
  ALLROLE_URL: '/role/',
  ADDROLE_URL: '/role/',
  UPDATEROLE_URL: '/role/',
  ALLPERMISSION_URL: '/role/getAssignPermission/',
  SETPERMISSION_URL: '/role/assignPermission/',
  REMOVEROLE_URL: '/role/',
  DELETEALLROLE_URL: '/role',
};

// 分页获取角色列表
export const reqAllRoleList = (
  page: number,
  limit: number,
  roleName: string,
): Promise<RoleQueryAllResponseData> => {
  return request.get(
    API.ALLROLE_URL + `${page}/${limit}/?rolename=${roleName}`,
  );
};

// 新增或更新角色
export const reqAddOrUpdateRole = (
  data: RoleData,
): Promise<AddOrUpdateRoleAllResponseData> => {
  if (data.id) {
    return request.patch(API.UPDATEROLE_URL + data.id, data);
  } else {
    return request.post(API.ADDROLE_URL, data);
  }
};

// 删除单个角色
export const reqRemoveRole = (
  roleId: number,
): Promise<DeleteRoleResponseData> => {
  return request.delete(API.REMOVEROLE_URL + roleId);
};

// 批量删除角色
export const reqSelectRole = (
  ids: number[],
): Promise<DeleteRoleResponseData> => {
  return request.delete(API.DELETEALLROLE_URL, { data: { ids: ids } });
};

// 获取角色权限
export const reqAllPermissionList = (
  roleId: number,
): Promise<GetRolePermissionResponseData> => {
  return request.get(API.ALLPERMISSION_URL + roleId);
};

// 角色分配权限
export const reqSetPermission = (
  roleId: number,
  permissionId: number[],
): Promise<RoleAssignPermissionResponseData> => {
  return request.post(API.SETPERMISSION_URL + roleId, { ids: permissionId });
};

export interface ResponseData {
  code: number;
  message: string;
  success: boolean;
}

// 权限类型
export interface Permission {
  id?: number;
  permissionName: string;
  pid: number;
  permissionCode: string;
  type: number;
  route: string;
  createTime?: string;
  updateTime?: string;
}

// 权限数组类型
export type PermissionList = Permission[];

// 获取所有权限结果类型
export interface GetAllPermissionResponseData extends ResponseData {
  data: {
    total: number;
    permissions: PermissionList;
  };
}
// 新增或更新权限返回结果类型
export interface AddOrUpdatePermissionResponseData extends ResponseData {
  data: [];
}

// 删除权限
export interface DeletePermissionResponseData extends ResponseData {
  data: [];
}

export interface MenuParams {
  id?: number;
  code: string;
  level: number;
  name: string;
  pid: number;
}

// ----------稍后看
export interface PermissionResponseData extends ResponseData {
  data: PermissionList;
}

export interface MenuParams {
  id?: number;
  code: string;
  level: number;
  name: string;
  pid: number;
}

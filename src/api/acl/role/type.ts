// 通用返回结果类型
export interface ResponseData {
  code: number;
  message: string;
  success: boolean;
}

// 角色类型
export interface RoleData {
  id?: number;
  rolename: string;
  label?: string;
  createTime?: string;
  updateTime?: string;
}

// 权限类型
export interface PermissionData {
  id: number;
  pid: number;
  permissionName: string;
  permissionCode: string;
  type: number;
  route: string;
  select: boolean; // 表明角色有这个权限
  children: PermissionData[]; // 生成树状结构
  createTime: string;
  updateTime: string;
}

export type Records = RoleData[];

// 分页获取角色列表返回结果类型
export interface RoleQueryAllResponseData extends ResponseData {
  data: {
    total: number;
    records: Records;
  };
}

// 新增或更新角色返回结果类型
export interface AddOrUpdateRoleAllResponseData extends ResponseData {
  data: [];
}

// 删除单个角色返回结果类型
export interface DeleteRoleResponseData extends ResponseData {
  data: [];
}

// 获取角色权限返回结果类型
export interface GetRolePermissionResponseData extends ResponseData {
  data: PermissionData[];
}

// 角色分配权限返回结果类型
export interface RoleAssignPermissionResponseData extends ResponseData {
  data: [];
}

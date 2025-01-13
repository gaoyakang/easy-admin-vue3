export interface ResponseData {
  code: number;
  message: string;
  success: boolean;
}

// 用户类型
export interface User {
  id?: number;
  username: string;
  nickname: string;
  phone: string;
  avatar: string;
  email: string;
  password?: string;
  createTime?: Date;
  updateTime?: Date;
  roleName: string;
}

// 角色类型
export interface RoleData {
  id?: number;
  rolename: string;
  label: string;
}

// 分页查询用户返回结果类型
export interface UserQueryAllResponseData extends ResponseData {
  data: {
    users: User[];
    total: number;
  };
}

// 新增或修改用户返回结果类型
export interface AddOrUpdateUserResponseData extends ResponseData {
  data: [];
}

// 删除单个用户返回结果类型
export interface DeleteUserResponseData extends ResponseData {
  data: [];
}

// 获取当前用户角色返回结果类型
export type AllRole = RoleData[];
export interface GetUserRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole; // 系统所有角色
    allRolesList: AllRole; // 当前用户拥有的角色
  };
}

// 分配当前用户角色返回结果类型
export interface AssignUserRoleResponseData extends ResponseData {
  data: [];
}

// 发送分配角色参数的类型
export interface SetRoleData {
  ids: number[];
}

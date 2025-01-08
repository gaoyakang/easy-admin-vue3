export interface ResponseData {
  code: number;
  message: string;
  success: boolean;
}

export interface User {
  id?: number;
  username?: string;
  password?: string;
  nickname?: string;
  phone?: string;
  email?: string;
  roleName?: string;
  avatar?: string;
}

export type Records = User[];

export interface UserResponseData extends ResponseData {
  data: {
    users: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}

export interface RoleData {
  id?: number;
  // createTime?: string;
  // updateTime?: string;
  roleName: string;
  remark: string;
}

export type AllRole = RoleData[];
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  };
}

export interface SetRoleData {
  roleIdList: number[];
  userId: number;
}

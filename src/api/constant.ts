// 返回结果码
export enum ResultCode {
  SUCCESS = 20000, // 通用操作成功
  ERROR = 20001, // 通用操作失败
  APPLICATION_HEALTH = 20002, // 应用健康检查
  INVALID_PASSWORD = 20003, // 无效的密码
  USER_NOT_FOUND = 20004, // 当前用户不存在
  USER_LOGIN_SUCCESS = 20005, // 用户登陆成功
  USER_LOGOUT_SUCCESS = 20006, // 退出登陆成功
  USER_INFO_SUCCESS = 20007, // 获取用户信息成功
  USER_ALREADY_EXIST = 20008, // 用户已存在
  USER_CREATED_SUCCESS = 20009, // 用户创建成功
  USER_DELETED_SUCCESS = 20010, // 用户删除成功
  USER_BATCH_DELETE_SUCCESS = 20011, // 批量删除用户成功
  USER_UPDATED_SUCCESS = 20012, // 用户更新成功
  USER_NICKNAME_ALREADY_EXIST = 20013, // 用户昵称已存在
  USER_USERNAME_ALREADY_EXIST = 20014, // 用户名称已存在
  USER_FINDONE_SUCCESS = 20015, // 获取单个用户成功
  USER_FINDALL_SUCCESS = 20016, // 获取所有用户成功
  USER_ASSIGN_ROLE_SUCCESS = 20017, // 为用户分配角色成功
  USER_GET_ASSIGN_ROLE_SUCCESS = 20018, // 获取用户角色成功

  ROLENAME_AND_LABEL_ALREADY_EXISTS = 20019, // 角色名称和角色标识已存在
  ROLENAME_ALREADY_EXISTS = 20020, // 角色名称已存在
  ROLELABEL_ALREADY_EXISTS = 20021, // 角色标识已存在
  ROLE_CREATED_SUCCESS = 20022, // 角色创建成功
  ROLE_NOT_FOUND = 20023, // 角色不存在
  ROLE_DELETED_SUCCESS = 20024, // 角色删除成功
  ROLE_UPDATED_SUCCESS = 20025, // 角色更新成功
  ROLE_FINDONE_SUCCESS = 20026, // 单个角色查询成功
  ROLE_FINDALL_SUCCESS = 20027, // 分页获取角色成功
  ROLE_ASSIGN_PERMISSION_SUCCESS = 20028, // 角色分配权限成功

  PERMISSION_ALREADY_EXISTS = 20029, // 权限已存在
  PERMISSION_CODE_ALREADY_EXISTS = 20030, // 权限码已存在
  ROUTE_ALREADY_EXISTS = 20031, // 权限路由已存在
  PERMISSION_CREATED_SUCCESS = 20032, // 权限创建成功
  PERMISSION_NOT_FOUND = 20033, // 权限不存在
  PERMISSION_DELETED_SUCCESS = 20034, // 权限删除成功
  PERMISSION_UPDATED_SUCCESS = 20035, // 权限更新成功
  PERMISSION_FINDONE_SUCCESS = 20036, // 查询单个权限成功
  PERMISSION_FINDALL_SUCCESS = 20037, // 查询权限成功
  GET_HARDWARE_SUCCESS = 20039, // 获取硬件信息成功
  LOGINLOG_FINDALL_SUCCESS = 20040, // 查询登陆日志成功
}

export const ResultMessages = {
  [ResultCode.SUCCESS]: '操作成功',
  [ResultCode.ERROR]: '操作失败',
  [ResultCode.APPLICATION_HEALTH]: '应用正常运行',
  [ResultCode.INVALID_PASSWORD]: '无效的密码',
  [ResultCode.USER_NOT_FOUND]: '当前用户不存在',
  [ResultCode.USER_LOGIN_SUCCESS]: '登陆成功',
  [ResultCode.USER_LOGOUT_SUCCESS]: '退出登陆成功',
  [ResultCode.USER_INFO_SUCCESS]: '获取用户信息成功',
  [ResultCode.USER_ALREADY_EXIST]: '当前用户已存在',
  [ResultCode.USER_CREATED_SUCCESS]: '用户创建成功',
  [ResultCode.USER_DELETED_SUCCESS]: '用户删除成功',
  [ResultCode.USER_BATCH_DELETE_SUCCESS]: '批量删除用户成功',
  [ResultCode.USER_UPDATED_SUCCESS]: '用户更新成功',
  [ResultCode.USER_NICKNAME_ALREADY_EXIST]: '用户昵称已存在',
  [ResultCode.USER_USERNAME_ALREADY_EXIST]: '用户名称已存在',
  [ResultCode.USER_FINDONE_SUCCESS]: '获取单个用户成功',
  [ResultCode.USER_FINDALL_SUCCESS]: '获取用户成功',
  [ResultCode.USER_ASSIGN_ROLE_SUCCESS]: '用户分配角色成功',
  [ResultCode.USER_GET_ASSIGN_ROLE_SUCCESS]: '获取用户角色成功',
  [ResultCode.ROLENAME_AND_LABEL_ALREADY_EXISTS]: '角色名称和角色标识已存在',
  [ResultCode.ROLENAME_ALREADY_EXISTS]: '角色名称已存在',
  [ResultCode.ROLELABEL_ALREADY_EXISTS]: '角色标识已存在',
  [ResultCode.ROLE_CREATED_SUCCESS]: '角色创建成功',
  [ResultCode.ROLE_NOT_FOUND]: '角色不存在',
  [ResultCode.ROLE_DELETED_SUCCESS]: '角色删除成功',
  [ResultCode.ROLE_UPDATED_SUCCESS]: '角色更新成功',
  [ResultCode.ROLE_FINDONE_SUCCESS]: '单个角色查询成功',
  [ResultCode.ROLE_FINDALL_SUCCESS]: '角色查询成功',
  [ResultCode.ROLE_ASSIGN_PERMISSION_SUCCESS]: '角色分配权限成功',
  [ResultCode.PERMISSION_ALREADY_EXISTS]: '权限已存在',
  [ResultCode.PERMISSION_CODE_ALREADY_EXISTS]: '权限码已存在',
  [ResultCode.ROUTE_ALREADY_EXISTS]: '权限路由已存在',
  [ResultCode.PERMISSION_CREATED_SUCCESS]: '权限创建成功',
  [ResultCode.PERMISSION_NOT_FOUND]: '权限不存在',
  [ResultCode.PERMISSION_DELETED_SUCCESS]: '权限删除成功',
  [ResultCode.PERMISSION_UPDATED_SUCCESS]: '权限更新成功',
  [ResultCode.PERMISSION_FINDONE_SUCCESS]: '查询单个权限成功',
  [ResultCode.PERMISSION_FINDALL_SUCCESS]: '查询权限成功',
  [ResultCode.GET_HARDWARE_SUCCESS]: '获取硬件信息成功',
  [ResultCode.LOGINLOG_FINDALL_SUCCESS]: '查询登陆日志成功',
};

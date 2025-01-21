<template>
  <div>
    <!-- 表格 -->
    <el-table
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :data="PermissionArr"
    >
      <el-table-column prop="permissionName" label="名称" />
      <el-table-column prop="permissionCode" label="权限值" width="190" />
      <el-table-column
        prop="type"
        label="类型"
        :formatter="formatRoute"
        width="80"
      />
      <el-table-column prop="route" label="路由" width="160" />
      <el-table-column
        prop="updateTime"
        label="修改时间"
        show-overflow-tooltip
      />
      <el-table-column label="操作" width="260px">
        <template #default="{ row }">
          <BtnAuthCheck
            type="default"
            size="small"
            :click="() => addPermission(row)"
            :permission="getPermissionsForRow(row, 'add')"
          >
            添加权限
          </BtnAuthCheck>

          <BtnAuthCheck
            type="primary"
            size="small"
            :click="() => updatePermission(row)"
            :permission="getPermissionsForRow(row, 'update')"
          >
            编辑
          </BtnAuthCheck>
          <el-popconfirm
            :title="`你确定要删除${row.permissionName}?`"
            width="260px"
            @confirm="removeMenu(row.id)"
          >
            <template #reference>
              <BtnAuthCheck
                type="danger"
                size="small"
                :permission="getPermissionsForRow(row, 'delete')"
              >
                删除
              </BtnAuthCheck>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="addOrUpdatePermissionData.id ? '更新权限' : '添加权限'"
    >
      <el-form :model="addOrUpdatePermissionData" :rules="rules" ref="form">
        <el-form-item label="名称" prop="permissionName">
          <el-input
            placeholder="请输入权限的名称"
            v-model="addOrUpdatePermissionData.permissionName"
          ></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="permissionCode">
          <el-input
            placeholder="请输入权限标识"
            v-model="addOrUpdatePermissionData.permissionCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="addOrUpdatePermissionData.type"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="路由" prop="route">
          <el-input
            placeholder="请输入权限路由"
            v-model="addOrUpdatePermissionData.route"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import {
  reqAllPermission,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from '../../../api/acl/permission/index';
import type {
  GetAllPermissionResponseData,
  PermissionList,
  Permission,
  AddOrUpdatePermissionResponseData,
  DeletePermissionResponseData,
} from '../../../api/acl/permission/type';
import { ElMessage } from 'element-plus';
import BtnAuthCheck from '../../../components/auth/BtnAuthCheck.vue';
import { ResultCode } from '../../../api/constant';

let PermissionArr = ref<PermissionList>([]); // 渲染的权限tree数据
let dialogVisible = ref<boolean>(false); // 新增或修改权限的弹窗是否显示
let addOrUpdatePermissionData = reactive<Permission>({
  // 新增或更新权限的数据结构
  id: 0,
  permissionCode: '',
  permissionName: '',
  pid: 0,
  type: 0,
  route: '',
});
let form = ref(); // 表单引用

// 权限类型下拉框
const typeOptions = [
  {
    value: 1,
    label: '目录',
  },
  {
    value: 2,
    label: '菜单',
  },
  {
    value: 3,
    label: '按钮',
  },
];

// 权限映射表
interface PermissionMap {
  [type: number]: {
    add: string[];
    update: string[];
    delete: string[];
  };
}

type ActionType = 'add' | 'update' | 'delete';
// 不同级别权限增删改时所需要的权限
const permissionMap: PermissionMap = {
  1: {
    add: ['btn.Permission.add', 'btn.Permission.addDirPermission'],
    update: ['btn.Permission.update', 'btn.Permission.updateDirPermission'],
    delete: ['btn.Permission.deleteOne', 'btn.Permission.deleteDirPermission'],
  },
  2: {
    add: ['btn.Permission.add', 'btn.Permission.addMenuPermission'],
    update: ['btn.Permission.update', 'btn.Permission.updateMenuPermission'],
    delete: ['btn.Permission.deleteOne', 'btn.Permission.deleteMenuPermission'],
  },
  3: {
    add: [],
    update: ['btn.Permission.update', 'btn.Permission.updateBtnPermission'],
    delete: ['btn.Permission.deleteOne', 'btn.Permission.deleteBtnPermission'],
  },
};
// 根据 row 的属性和操作类型返回相应的权限数组
const getPermissionsForRow = (
  row: Permission,
  action: ActionType,
): string[] => {
  // 如果 type 为 3，只允许查看，不允许添加、修改和删除
  if (row.type === 3) {
    return action === 'update' || action === 'delete'
      ? permissionMap[3][action]
      : [];
  }
  // 如果 pid 为 0，视为目录级别权限
  if (row.pid === 0) {
    return permissionMap[1][action] || [];
  }
  // 否则根据 row.type 获取权限
  return permissionMap[row.type][action] || ['btn.Permission.add'];
};

// 初始加载
onMounted(() => {
  getHasPermission();
});

// 获取所有权限
const getHasPermission = async () => {
  let res: GetAllPermissionResponseData = await reqAllPermission();
  if (res.code === ResultCode.PERMISSION_FINDALL_SUCCESS) {
    PermissionArr.value = res.data.permissions;
  }
};

// 判断不同路由类型
const formatRoute = (_row: any, _column: any, cellValue: any) => {
  if (cellValue === 1) {
    return '目录';
  } else if (cellValue === 2) {
    return '菜单';
  } else if (cellValue === 3) {
    return '按钮';
  } else {
    return cellValue; // 如果route不是1、2、3，直接返回原值
  }
};

// 打开新增权限弹窗
const addPermission = (row: Permission) => {
  Object.assign(addOrUpdatePermissionData, {
    id: 0,
    pid: 0,
    permissionName: '',
    permissionCode: '',
    type: 1,
    route: '',
  });
  dialogVisible.value = true;
  addOrUpdatePermissionData.pid = row.id as number;
};

// 打开更新权限弹窗
const updatePermission = (row: Permission) => {
  dialogVisible.value = true;
  Object.assign(addOrUpdatePermissionData, row);
};

//  发起请求添加或更新
const save = async () => {
  dialogVisible.value = false;
  // 校验参数
  await form.value.validate();
  let res: AddOrUpdatePermissionResponseData = await reqAddOrUpdateMenu(
    removeEmptyFields(addOrUpdatePermissionData),
  );
  if (
    res.code === ResultCode.PERMISSION_UPDATED_SUCCESS ||
    res.code === ResultCode.PERMISSION_CREATED_SUCCESS
  ) {
    dialogVisible.value = false;
    ElMessage({
      type: 'success',
      message: res.message,
    });
    getHasPermission();
  } else {
    ElMessage({
      type: 'error',
      message: res.message,
    });
  }
};

// 删除权限
const removeMenu = async (id: number) => {
  let res: DeletePermissionResponseData = await reqRemoveMenu(id);
  if (res.code === ResultCode.PERMISSION_DELETED_SUCCESS) {
    ElMessage({ type: 'success', message: res.message });
    getHasPermission();
  } else {
    ElMessage({ type: 'error', message: res.message });
  }
};

// 移除空字段
const removeEmptyFields = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (
      obj[key] === '' ||
      obj[key] === null ||
      obj[key] === undefined ||
      obj[key].length === 0 ||
      key === 'children'
    ) {
      delete obj[key];
    }
  });
  return obj;
};

// 验证权限名
const validatePermissionName = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2 && value.trim().length <= 25) {
    callBack();
  } else {
    callBack(new Error('权限名称2-25位'));
  }
};

// 验证权限标识
const validatePermissionCode = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2 && value.trim().length <= 25) {
    callBack();
  } else {
    callBack(new Error('权限标识2-25位'));
  }
};

// 字段验证规则
const rules = {
  permissionName: [
    { required: true, trigger: 'blur', validator: validatePermissionName },
  ],
  permissionCode: [
    { required: true, trigger: 'blur', validator: validatePermissionCode },
  ],
};
</script>

<style lang="scss" scoped></style>

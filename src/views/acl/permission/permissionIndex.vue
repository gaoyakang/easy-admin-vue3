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
      <el-table-column prop="permissionCode" label="权限值" />
      <el-table-column prop="type" label="类型" :formatter="formatRoute" />
      <el-table-column prop="route" label="路由" />
      <el-table-column
        prop="updateTime"
        label="修改时间"
        show-overflow-tooltip
      />
      <el-table-column label="操作" width="260px">
        <template #default="{ row }">
          <el-button
            size="small"
            :disabled="row.level === 4 ? true : false"
            @click="addPermission(row)"
          >
            {{ row.level === 3 ? '添加功能' : '添加权限' }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 1 ? true : false"
            @click="updatePermission(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.permissionName}?`"
            width="260px"
            @confirm="removeMenu(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                :disabled="row.level === 1 ? true : false"
              >
                删除
              </el-button>
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

// 初始加载
onMounted(() => {
  getHasPermission();
});

// 获取所有权限
const getHasPermission = async () => {
  let res: GetAllPermissionResponseData = await reqAllPermission();
  if (res.code === 20334) {
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
  if (res.code === 20328 || res.code === 20330) {
    dialogVisible.value = false;
    ElMessage({
      type: 'success',
      message: addOrUpdatePermissionData.id ? '更新成功' : '添加成功',
    });
    getHasPermission();
  }
};

// 删除权限
const removeMenu = async (id: number) => {
  let res: DeletePermissionResponseData = await reqRemoveMenu(id);
  if (res.code === 20332) {
    ElMessage({ type: 'success', message: '删除成功' });
    getHasPermission();
  }
};

// 移除空字段
const removeEmptyFields = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (
      obj[key] === '' ||
      obj[key] === null ||
      obj[key] === undefined ||
      obj[key].length === 0
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
  route: [{ required: true, trigger: 'blur' }],
};
</script>

<style lang="scss" scoped></style>

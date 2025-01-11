<template>
  <div>
    <!-- 搜索框 -->
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
          <el-input
            placeholder="请你输入搜索用户名"
            v-model="keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="keyword.length ? false : true"
            @click="search"
          >
            搜索
          </el-button>
          <el-button size="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button
        type="danger"
        size="default"
        :disabled="selectIdArr.length ? false : true"
        @click="deleteSelectUser"
      >
        批量删除
      </el-button>
      <!-- 本体 -->
      <el-table
        style="margin: 10px 0"
        :data="userArr"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="序号"
          align="center"
          width="60"
          type="index"
        ></el-table-column>
        <el-table-column
          label="用户id"
          align="center"
          prop="id"
        ></el-table-column>
        <el-table-column
          label="头像"
          align="center"
          prop="avatar"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <img
              v-if="row.avatar"
              :src="row.avatar"
              style="width: 50px; height: 50px; object-fit: cover"
              alt="用户头像"
            />
            <span v-else>无头像</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          align="center"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="昵称"
          align="center"
          prop="nickname"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
          align="center"
          prop="rolename"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="手机号"
          align="center"
          prop="phone"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="邮箱"
          align="center"
          prop="email"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template v-slot:default="{ row }">
            <el-button size="small" icon="User" @click="setRole(row)">
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定删除${row.username}`"
              width="260px"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="prev, pager, next, jumper, -> , sizes, total"
        :total="total"
        @current-change="getHasUser"
        @size-change="pageChangehandler"
      />
    </el-card>
    <!-- 新增/更新 -->
    <el-drawer v-model="addOrUpdateDrawer">
      <template #header>
        <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="请您输入用户姓名"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input
              placeholder="请您输入用户密码"
              v-model="userParams.password"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input
              placeholder="请您输入用户昵称"
              v-model="userParams.nickname"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              placeholder="请您输入手机号"
              v-model="userParams.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              placeholder="请您输入邮箱"
              v-model="userParams.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-input
              placeholder="请您输入头像地址"
              v-model="userParams.avatar"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 分配 -->
    <el-drawer v-model="assignDrawer">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              @change="handleCheckAllChange"
              v-model="checkAll"
              :indeterminate="isIndeterminate"
            >
              全选
            </el-checkbox>
            <!-- 显示角色的的复选框 -->
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedUsersChange"
            >
              <el-checkbox
                v-for="(role, index) in allRole"
                :key="index"
                :label="role"
              >
                {{ role.rolename }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="assignDrawer = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import {
  reqAllUser,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from '../../../api/acl/user/index';
import type {
  User,
  GetUserRoleResponseData,
  AllRole,
  SetRoleData,
} from '../../../api/acl/user/type';

import useLayOutSettingStore from '../../../store/modules/setting';
import { ElMessage } from 'element-plus';

let pageNo = ref<number>(1); // 分页请求的起始页
let pageSize = ref<number>(10); // 分页请求的长度
let total = ref<number>(0); // 总用户数
let userArr = ref<User[]>([]); // 表格数据
let addOrUpdateDrawer = ref<boolean>(false); // 新增或修改用户时抽屉是否显示的开关
let assignDrawer = ref<boolean>(false); // 分配角色时抽屉是否显示的开关
let allRole = reactive<AllRole>([]); // 所有角色
let userRole = reactive<AllRole>([]); // 用户角色

let selectIdArr = ref<User[]>([]); // 批量删除选中的id数组
let formRef = ref(); // 表单引用
let keyword = ref<string>(''); // 搜索关键词
let settingStore = useLayOutSettingStore(); //用于刷新页面
const checkAll = ref<boolean>(false); // 是否选中所有角色
const isIndeterminate = ref<boolean>(true); // 表示 checkbox 的不确定状态，true时显示-

// 获取用户所有角色
const setRole = async (row: User) => {
  // 每次打开抽屉时获取用户角色和所有角色
  Object.assign(userParams, row);
  let res: GetUserRoleResponseData = await reqAllRole(row.id as number);

  if (res.code === 20240) {
    // 清空数据后再赋值
    userRole = [];
    allRole = [];
    userRole = res.data.assignRoles; // 用户角色
    allRole = res.data.allRolesList; // 所有角色
    // 判断是否需要将全选样式展示
    if (userRole.length === allRole.length) {
      checkAll.value = true;
      isIndeterminate.value = false;
    } else {
      checkAll.value = false;
      isIndeterminate.value = true;
    }
    assignDrawer.value = true; // 打开抽屉
  }
};

// 全部选择角色
const handleCheckAllChange = (val: boolean) => {
  // 全选时将所有角色赋值到用户角色
  // 非全选时用户角色为[]
  if (val) {
    userRole = allRole;
    checkAll.value = true;
    isIndeterminate.value = false;
  } else {
    userRole = [];
    checkAll.value = false;
    isIndeterminate.value = true;
  }
};

// 选择某x个角色复选框时
const handleCheckedUsersChange = (value: string[]) => {
  // 选中的数量与所有角色数量相同时将checkAll=true
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRole.length;
  // 0< 选中的数量 < 所有角色数量
  // 显示-
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.length;
};

// 确认设置权限
const confirmClick = async () => {
  // 去重
  let data: SetRoleData = {
    ids: Array.from(
      new Set(
        userRole
          .filter((item) => item.id !== undefined)
          .map((item) => item.id as number),
      ),
    ),
  };

  let res = await reqSetUserRole(userParams.id as number, data);
  if (res.code === 20242) {
    ElMessage({
      type: 'success',
      message: '分配角色成功',
    });
    assignDrawer.value = false;
    getHasUser(pageNo.value);
  }
};

// 收集的用户参数
let userParams = reactive<User>({
  username: '',
  password: '',
  nickname: '',
  phone: '',
  avatar: '',
  email: '',
  rolename: '',
});

// 页面挂载时请求单页用户数据
onMounted(() => {
  getHasUser();
});

// 分页获取数据
const getHasUser = async (pager = 1) => {
  pageNo.value = pager;
  let res = await reqAllUser(pageNo.value, pageSize.value, keyword.value);
  if (res.code === 20306) {
    total.value = res.data.total;
    userArr.value = res.data.users;
  }
};

// 页码改变时重新获取要展示的用户数据
const pageChangehandler = () => {
  getHasUser();
};

// 搜索
const search = () => {
  getHasUser();
  keyword.value = '';
};

// 重置搜索
const reset = () => {
  settingStore.refsh = !settingStore.refsh;
};

// 新增用户
const addUser = () => {
  addOrUpdateDrawer.value = true;

  //清空数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    nickname: '',
    password: '',
    avatar: '',
    phone: '',
    email: '',
    rolename: '',
  });
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username');
    formRef.value.clearValidate('nickname');
    formRef.value.clearValidate('password');
    formRef.value.clearValidate('avatar');
    formRef.value.clearValidate('phone');
    formRef.value.clearValidate('email');
    formRef.value.clearValidate('rolename');
  });
};

// 更新用户
const updateUser = (row: User) => {
  // 展示drawer
  addOrUpdateDrawer.value = true;
  //存储收集已有的账号信息
  Object.assign(userParams, row);
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username');
    formRef.value.clearValidate('nickname');
    formRef.value.clearValidate('password');
    formRef.value.clearValidate('avatar');
    formRef.value.clearValidate('phone');
    formRef.value.clearValidate('email');
    formRef.value.clearValidate('rolename');
  });
};

// 移除空字段
const removeEmptyFields = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
};

// 按下确认
const save = async () => {
  formRef.value.validate();
  // 移除空字段
  const cleanedParams = removeEmptyFields({ ...userParams });
  let res = await reqAddOrUpdateUser(cleanedParams);
  if (res.code === 20300 || res.code === 20302) {
    addOrUpdateDrawer.value = false;
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    });
    getHasUser();
  } else {
    addOrUpdateDrawer.value = false;
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败' + res.message,
    });
  }
};

// 按下取消
const cancel = () => {
  addOrUpdateDrawer.value = false;
};

// 验证用户名
const validatorUserName = (_rule: any, value: any, callBack: any) => {
  if (value && value.trim().length >= 5 && value.trim().length <= 12) {
    callBack();
  } else {
    callBack(new Error('用户名字长度5-12位'));
  }
};

// 验证密码
const validatorPassword = (_rule: any, value: any, callBack: any) => {
  if (value && value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error('用户密码长度6-13位'));
  }
};

// 验证昵称
const validatorName = (_rule: any, value: any, callBack: any) => {
  if (value && value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error('用户昵称长度5-12位'));
  }
};

// 验证手机
const validatorPhone = (
  _rule: any,
  value: string,
  callback: (error?: Error) => void,
) => {
  if (value && value.trim()) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
      callback(new Error('请输入有效的手机号码'));
    } else {
      callback();
    }
  }
};

// 验证邮箱
const validatorEmail = (
  _rule: any,
  value: string,
  callback: (error?: Error) => void,
) => {
  if (value && value.trim()) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(value)) {
      callback(new Error('请输入有效的邮箱地址'));
    } else {
      callback();
    }
  }
};
// 验证的规则
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUserName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
  nickname: [{ trigger: 'blur', validator: validatorName }],
  phone: [{ trigger: 'blur', validator: validatorPhone }],
  email: [{ trigger: 'blur', validator: validatorEmail }],
  // avatar: [{ required: true, trigger: 'blur' }],
};

// 删除用户
const deleteUser = async (userId: number) => {
  let res = await reqRemoveUser(userId);
  if (res.code === 20304) {
    ElMessage({ type: 'success', message: '删除成功' });
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};

// 选择table某项时触发
const selectChange = (value: User[]) => {
  selectIdArr.value = value;
};

// 批量删除
const deleteSelectUser = async () => {
  let ids = selectIdArr.value.map((item) => {
    return item.id;
  });
  let res = await reqSelectUser(ids as number[]);
  if (res.code === 20314) {
    ElMessage({ type: 'success', message: '删除成功' });
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

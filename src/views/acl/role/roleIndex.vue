<template>
  <div>
    <!-- 搜索 -->
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="角色搜索">
          <el-input
            placeholder="请输入角色的关键字"
            v-model="keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="keyword ? false : true"
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
      <el-button type="primary" size="default" icon="Plus" @click="addRole">
        添加角色
      </el-button>
      <el-table
        border
        style="margin: 10px 0"
        :data="allRole"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="序号"
          align="center"
          width="60"
          type="index"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="角色名称"
          align="center"
          show-overflow-tooltip
          prop="rolename"
        ></el-table-column>
        <el-table-column
          label="角色标识"
          align="center"
          show-overflow-tooltip
          prop="label"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          show-overflow-tooltip
          prop="createTime"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          show-overflow-tooltip
          prop="updateTime"
        ></el-table-column>
        <el-table-column label="操作" width="280px" align="center">
          <template #default="{ row }">
            <el-button size="small" icon="User" @click="setPermission(row)">
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${row.rolename}?`"
              width="260px"
              @confirm="removeRole(row.id)"
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
      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="prev, pager, next, jumper , ->, sizes, total, "
        :total="total"
        @current-change="getHasRole"
        @size-change="sizeHandler"
      />
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="RoleParams.id ? '更新角色' : '添加角色'"
    >
      <el-form :model="RoleParams" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="rolename">
          <el-input
            placeholder="请你输入角色名称"
            v-model="RoleParams.rolename"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色标识" prop="label">
          <el-input
            placeholder="请你输入角色标识"
            v-model="RoleParams.label"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="default" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="save">确定</el-button>
      </template>
    </el-dialog>
    <!-- 分配角色权限 -->
    <el-drawer v-model="assignPermissiondrawer">
      <template #header>
        <h4>分配角色权限</h4>
      </template>
      <template #default>
        <!-- data：用于展示的数据，PermissionData类型 -->
        <!-- show-checkbox： 显示复选框 -->
        <!-- node-key：每个树节点用来作为唯一标识的属性 -->
        <!-- default-expand-all：默认不展开所有节点 -->
        <!-- default-checked-keys：默认展开的节点的 key 的数组 -->
        <!-- props：传入的配置 -->
        <el-tree
          ref="tree"
          :data="permissionArr"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="assignPermissiondrawer = false">取消</el-button>
          <el-button type="primary" @click="assignPermissionHandler">
            确定
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue';
import {
  reqRemoveRole,
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllPermissionList,
  reqSetPermission,
} from '../../../api/acl/role';
import type {
  RoleQueryAllResponseData,
  DeleteRoleResponseData,
  Records,
  RoleData,
  GetRolePermissionResponseData,
  PermissionData,
  RoleAssignPermissionResponseData,
} from '../../../api/acl/role/type';
import useLayOutSettingStore from '../../../store/modules/setting';
import { ElMessage } from 'element-plus';
let pageNo = ref<number>(1); // 分页开始位置
let pageSize = ref<number>(10); // 分页条数
let settingStore = useLayOutSettingStore(); // 刷新页面
let dialogVisible = ref<boolean>(false); // 是否显示弹窗
let keyword = ref<string>(''); // 查询关键字
let selectIdArr = ref<RoleData[]>([]); // 批量删除选中的id数组

let allRole = ref<Records>([]); // 所有角色列表
let total = ref<number>(0); // 总条数
let form = ref(); // 表单引用
let assignPermissiondrawer = ref<boolean>(false); //
let permissionArr = ref<PermissionData[]>([]);
let selectArr = ref<number[]>([]); // 已选中的权限
let tree = ref();

// 角色参数
let RoleParams = reactive<RoleData>({
  rolename: '',
  label: '',
});

// 初始化加载
onMounted(() => {
  getHasRole();
});

// 分页获取角色列表
const getHasRole = async (pager = 1) => {
  pageNo.value = pager;
  let res: RoleQueryAllResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  );
  if (res.code === 20322) {
    total.value = res.data.total;
    allRole.value = res.data.records;
  }
};

// 搜索角色
const search = () => {
  getHasRole();
  keyword.value = '';
};

// 重置搜索
const reset = () => {
  settingStore.refsh = !settingStore.refsh;
};

// 切换页码
const sizeHandler = () => {
  getHasRole();
};

// 弹窗新增角色
const addRole = () => {
  dialogVisible.value = true;
  Object.assign(RoleParams, {
    rolename: '',
    label: '',
    id: 0,
  });
  nextTick(() => {
    form.value.clearValidate('rolename');
    form.value.clearValidate('label');
  });
};

const updateRole = (row: RoleData) => {
  dialogVisible.value = true;
  Object.assign(RoleParams, row);
  nextTick(() => {
    form.value.clearValidate('rolename');
  });
};

// 验证角色名
const validateRolename = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2 && value.trim().length <= 12) {
    callBack();
  } else {
    callBack(new Error('角色名称2-12位'));
  }
};

// 验证角色标识
const validateRolelabel = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2 && value.trim().length <= 15) {
    callBack();
  } else {
    callBack(new Error('角色标识2-15位'));
  }
};

// 字段验证规则
const rules = {
  rolename: [{ required: true, trigger: 'blur', validator: validateRolename }],
  label: [{ required: true, trigger: 'blur', validator: validateRolelabel }],
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

// 发起新增角色api
const save = async () => {
  await form.value.validate();
  let res = await reqAddOrUpdateRole(removeEmptyFields(RoleParams));
  if (res.code === 20318 || res.code === 20316) {
    ElMessage({
      type: 'success',
      message: RoleParams.id ? '更新成功' : '添加成功',
    });
    dialogVisible.value = false;
    getHasRole(RoleParams.id ? pageNo.value : 1);
  }
};

// 删除角色
const removeRole = async (id: number) => {
  let res: DeleteRoleResponseData = await reqRemoveRole(id);
  if (res.code === 20320) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};

// 选择table某项时触发
const selectChange = (value: RoleData[]) => {
  selectIdArr.value = value;
};

// 打开分配权限drawer
const setPermission = async (row: RoleData) => {
  assignPermissiondrawer.value = true;
  Object.assign(RoleParams, row);
  let res: GetRolePermissionResponseData = await reqAllPermissionList(
    RoleParams.id as number,
  );
  if (res.code === 20240) {
    permissionArr.value = res.data;
    selectArr.value = [];
    selectArr.value = filterSelectArr(permissionArr.value, []);
  }
};

// tree的节点显示的字段
const defaultProps = {
  children: 'children',
  label: 'permissionName',
};

// 筛选需要选中的节点
const filterSelectArr = (
  allData: any,
  initArr: number[],
  currentLevel: number = 0,
) => {
  for (const item of allData) {
    // 避免因选中了目录而导致btn权限全被选上
    if (item.select && item.type === 3) {
      initArr.push(item.id);
    }

    // 字节点也要遍历到
    if (item.children && item.children.length > 0) {
      const nextLevel = currentLevel + 1;
      if (nextLevel === 2) {
        // 判断item.children是否还存在children
        const hasGrandChildren = item.children.some(
          (child: any) => child.children && child.children.length > 0,
        );
        if (hasGrandChildren) {
          // 如果存在：继续递归
          filterSelectArr(item.children, initArr, nextLevel);
        } else {
          // 如果不存在：将当前节点加入结果数组
          if (item.select) {
            initArr.push(item.id);
          }
        }
      } else {
        // 继续递归
        filterSelectArr(item.children, initArr, nextLevel);
      }
    }
  }
  return initArr;
};

// 发请求为角色分配权限
const assignPermissionHandler = async () => {
  const roleId = RoleParams.id as number;
  let arr = tree.value.getCheckedKeys();
  let arr1 = tree.value.getHalfCheckedKeys();
  let permissionId = arr.concat(arr1);
  let res: RoleAssignPermissionResponseData = await reqSetPermission(
    roleId,
    permissionId,
  );
  if (res.code === 20244) {
    assignPermissiondrawer.value = false;
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    });
    getHasRole();
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

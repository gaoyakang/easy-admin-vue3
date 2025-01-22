<template>
  <div class="app-container">
    <!-- 表头 -->
    <el-card style="height: 70px; margin-bottom: 10px">
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label="登录地址" prop="ipaddr">
          <el-input
            v-model="queryParams.ipaddr"
            placeholder="请输入登录地址"
            clearable
            style="width: 140px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="用户账号" prop="userName">
          <el-input
            v-model="queryParams.userName"
            placeholder="请输入用户账号"
            clearable
            style="width: 140px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="登录状态"
            clearable
            style="width: 140px"
          >
            <el-option
              v-for="dict in sys_common_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">
            搜索
          </el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格 -->
    <el-card style="margin: 10px 0">
      <!-- 删除/清空/导出 -->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['monitor:logininfor:remove']"
          >
            删除
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="Delete"
            @click="handleClean"
            v-hasPermi="['monitor:logininfor:remove']"
          >
            清空
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['monitor:logininfor:export']"
          >
            导出
          </el-button>
        </el-col>
        <right-toolbar
          v-model:showSearch="showSearch"
          @queryTable="getList"
        ></right-toolbar>
      </el-row>
      <!-- 表格 -->
      <el-table
        ref="logininforRef"
        v-loading="loading"
        :data="logininfoList"
        @selection-change="handleSelectionChange"
        :default-sort="defaultSort"
        @sort-change="handleSortChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="用户账号"
          align="center"
          prop="userName"
          :show-overflow-tooltip="true"
          sortable="custom"
          :sort-orders="['descending', 'ascending']"
        />
        <el-table-column
          label="地址"
          align="center"
          prop="ipaddr"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="登录地点"
          align="center"
          prop="loginLocation"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作系统"
          align="center"
          prop="os"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="浏览器"
          align="center"
          prop="browser"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="登录状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag :options="sys_common_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          align="center"
          prop="msg"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="访问时间"
          align="center"
          prop="loginTime"
          sortable="custom"
          :sort-orders="['descending', 'ascending']"
          width="180"
        >
          <template #default="scope">
            <span>{{ scope.row.loginTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        v-model:current-page="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="prev, pager, next, jumper, -> , sizes, total"
        :total="total"
        @current-change="getHasUser"
        @size-change="pageChangehandler"
      />
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import DictTag from '../../../components/dictTag/DictTag.vue';

// 表头ref
const queryRef = ref();
const showSearch = ref(true);
const loading = ref(false);
let total = ref(10); // 总用户数

// 登录状态
const sys_common_status = ref([
  { value: '0', label: '成功' },
  { value: '1', label: '失败' },
]);
const getHasUser = () => {};
// 搜索参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
  ipaddr: '',
  userName: '',
  status: '',
});

// 展示的数据
const logininfoList = ref([
  {
    delFlag: '0',
    status: '0',
    infoId: 1559,
    userName: 'admin',
    ipaddr: '171.115.227.134',
    loginLocation: '湖北省十堰市 电信',
    browser: 'Chrome 131.0.0',
    os: 'Windows',
    loginTime: '2025-01-15T01:23:22.902Z',
    msg: '登录成功',
  },
  {
    delFlag: '0',
    status: '0',
    infoId: 1560,
    userName: 'admin',
    ipaddr: '27.154.232.122',
    loginLocation: '福建省厦门市 电信',
    browser: 'Chrome 131.0.0',
    os: 'Mac OS X',
    loginTime: '2025-01-15T02:00:21.124Z',
    msg: '登录成功',
  },
  {
    delFlag: '0',
    status: '0',
    infoId: 1561,
    userName: 'admin',
    ipaddr: '27.154.232.122',
    loginLocation: '福建省厦门市 电信',
    browser: 'Chrome 131.0.0',
    os: 'Mac OS X',
    loginTime: '2025-01-15T02:03:18.169Z',
    msg: '退出成功',
  },
  {
    delFlag: '0',
    status: '0',
    infoId: 1562,
    userName: 'ry',
    ipaddr: '27.154.232.122',
    loginLocation: '福建省厦门市 电信',
    browser: 'Chrome 131.0.0',
    os: 'Mac OS X',
    loginTime: '2025-01-15T02:03:25.887Z',
    msg: '登录成功',
  },
  {
    delFlag: '0',
    status: '0',
    infoId: 1563,
    userName: 'ry',
    ipaddr: '27.154.232.122',
    loginLocation: '福建省厦门市 电信',
    browser: 'Chrome 131.0.0',
    os: 'Mac OS X',
    loginTime: '2025-01-15T02:07:36.905Z',
    msg: '退出成功',
  },
  {
    delFlag: '0',
    status: '0',
    infoId: 1564,
    userName: 'admin',
    ipaddr: '27.154.232.122',
    loginLocation: '福建省厦门市 电信',
    browser: 'Chrome 131.0.0',
    os: 'Mac OS X',
    loginTime: '2025-01-15T02:07:49.698Z',
    msg: '登录成功',
  },
  {
    delFlag: '0',
    status: '1',
    infoId: 1565,
    userName: 'admin',
    ipaddr: '122.206.190.33',
    loginLocation: '河南省郑州市 郑州大学',
    browser: 'Chrome 131.0.0',
    os: 'Windows',
    loginTime: '2025-01-15T02:18:52.001Z',
    msg: '帐号或密码错误',
  },
  {
    delFlag: '0',
    status: '0',
    infoId: 1566,
    userName: 'admin',
    ipaddr: '122.206.190.33',
    loginLocation: '河南省郑州市 郑州大学',
    browser: 'Chrome 131.0.0',
    os: 'Windows',
    loginTime: '2025-01-15T02:18:58.219Z',
    msg: '登录成功',
  },
  {
    delFlag: '0',
    status: '1',
    infoId: 1567,
    userName: 'admin',
    ipaddr: '119.36.6.210',
    loginLocation: '湖北省武汉市 联通',
    browser: 'Chrome 131.0.0',
    os: 'Windows',
    loginTime: '2025-01-15T02:27:09.369Z',
    msg: '验证码错误',
  },
  {
    delFlag: '0',
    status: '0',
    infoId: 1568,
    userName: 'admin',
    ipaddr: '119.36.6.210',
    loginLocation: '湖北省武汉市 联通',
    browser: 'Chrome 131.0.0',
    os: 'Windows',
    loginTime: '2025-01-15T02:27:14.143Z',
    msg: '登录成功',
  },
]);

const pageChangehandler = () => {
  // 分页变化
};

const handleQuery = () => {
  // 搜索
};

const resetQuery = () => {
  // 重置搜索
};

const handleDelete = () => {
  // 实现删除逻辑
};

const handleClean = () => {
  // 实现清空逻辑
};

const handleExport = () => {
  // 实现导出逻辑
};

const handleSelectionChange = () => {
  // 实现选中逻辑
};

const handleSortChange = () => {
  // 实现排序逻辑
};
</script>

<style scoped lang="scss">
.mb8 {
  margin-bottom: 15px;
}
.pagination {
  margin-top: 15px;
  text-align: right;
}
</style>

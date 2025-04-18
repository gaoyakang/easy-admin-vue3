<template>
  <div class="app-container" v-loading="loading">
    <el-row>
      <!-- CPU 资源统计 -->
      <el-col :span="12" class="card-box">
        <el-card>
          <template #header>
            <Cpu style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">CPU</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%">
              <thead>
                <tr>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">属性</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">值</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">核心数</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.cpu">
                      {{ server.cpu.cpuNum }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">用户使用率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.cpu">
                      {{ server.cpu.used }}%
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">系统使用率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.cpu">
                      {{ server.cpu.sys }}%
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">当前空闲率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.cpu">
                      {{ server.cpu.free }}%
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <!-- 内存统计 -->
      <el-col :span="12" class="card-box">
        <el-card>
          <template #header>
            <Tickets style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">内存</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%">
              <thead>
                <tr>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">属性</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">内存</div>
                  </th>
                  <th class="el-table__cell is-leaf" v-if="server.jvm">
                    <div class="cell">JVM</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">总内存</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.mem">
                      {{ server.mem.total }}G
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">
                      {{ server.jvm.total }}M
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">已用内存</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.mem">
                      {{ server.mem.used }}G
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">
                      {{ server.jvm.used }}M
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">剩余内存</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.mem">
                      {{ server.mem.free }}G
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.jvm">
                      {{ server.jvm.free }}M
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">使用率</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div
                      class="cell"
                      v-if="server.mem"
                      :class="{ 'text-danger': server.mem.usage > 80 }"
                    >
                      {{ server.mem.usage }}%
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div
                      class="cell"
                      v-if="server.jvm"
                      :class="{ 'text-danger': server.jvm.usage > 80 }"
                    >
                      {{ server.jvm.usage }}%
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <!-- 服务器信息 -->
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header>
            <Monitor style="width: 1em; height: 1em; vertical-align: middle" />
            <span style="vertical-align: middle">服务器信息</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">服务器名称</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.sys">
                      {{ server.sys.computerName }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">操作系统</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.sys">
                      {{ server.sys.osName }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">服务器IP</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.sys">
                      {{ server.sys.computerIp }}
                    </div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">系统架构</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell" v-if="server.sys">
                      {{ server.sys.osArch }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <!-- 磁盘状态 -->
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header>
            <MessageBox
              style="width: 1em; height: 1em; vertical-align: middle"
            />
            <span style="vertical-align: middle">磁盘状态</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%">
              <thead>
                <tr>
                  <th class="el-table__cell el-table__cell is-leaf">
                    <div class="cell">盘符路径</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">文件系统</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">盘符类型</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">总大小</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">可用大小</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">已用大小</div>
                  </th>
                  <th class="el-table__cell is-leaf">
                    <div class="cell">已用百分比</div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="server.sysFiles">
                <tr v-for="(sysFile, index) in server.sysFiles" :key="index">
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ sysFile.dirName }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ sysFile.sysTypeName }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ sysFile.typeName }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ sysFile.total }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ sysFile.free }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div class="cell">{{ sysFile.used }}</div>
                  </td>
                  <td class="el-table__cell is-leaf">
                    <div
                      class="cell"
                      :class="{ 'text-danger': sysFile.usage > 80 }"
                    >
                      {{ sysFile.usage }}%
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { reqSourcelogInfo } from '../../../api/monitor/sourcelog/index';
import { ElMessage } from 'element-plus';
import { ResultCode } from '../../../api/constant';
const server = ref({});
const loading = ref(false);

onMounted(() => {
  getSourcelogInfo();
});

const getSourcelogInfo = async () => {
  try {
    // 获取服务器信息
    loading.value = true; // 隐藏 loading
    const res = await reqSourcelogInfo();
    if (res.code === ResultCode.GET_HARDWARE_SUCCESS) {
      server.value = res.data;
    } else {
      ElMessage.error(res.message);
    }
  } catch (error) {
    console.error('Error fetching server info:', error);
    ElMessage.error('获取服务器信息失败');
  } finally {
    loading.value = false; // 隐藏 loading
  }
};
</script>

<style scoped lang="scss">
.app-container {
  padding: 20px;
}

.card-box {
  margin-bottom: 20px; /* 增加模块之间的间距 */
}

.el-table {
  border-collapse: collapse;
  width: 100%;
}

.el-table__cell {
  border: 1px solid #ebeef5;
  padding: 8px;
  text-align: center;
}

.text-danger {
  color: red;
}
</style>

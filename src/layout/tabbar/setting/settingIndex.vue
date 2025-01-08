<template>
  <!-- 刷新按钮 -->
  <el-button circle size="small" :icon="Refresh" @click="updateRefsh" />
  <!-- 全屏按钮 -->
  <el-button circle size="small" :icon="FullScreen" @click="fullScreen" />
  <!-- 主题设置 -->
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="click">
    <el-form>
      <!-- 选择主题颜色 -->
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          size="small"
          @change="setColor"
          @click.stop
        />
      </el-form-item>
      <!-- 切换暗黑模式 -->
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          size="small"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button circle size="small" :icon="Setting" />
    </template>
  </el-popover>
  <!-- 头像 -->
  <img :src="userStore.avatar" alt="" />
  <!-- 退出登陆 -->
  <el-dropdown>
    <span class="el-dropdown-link" style="cursor: pointer">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Refresh,
  Setting,
  FullScreen,
  ArrowDown,
} from '@element-plus/icons-vue';
import useLayOutSettingStore from '../../../store/modules/setting';
let layoutSettingStore = useLayOutSettingStore();
import useUserStore from '../../../store/modules/login';
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter();
let $route = useRoute();
let userStore = useUserStore();
let dark = ref<boolean>(false);
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh;
};

// 实现全屏
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// 退出登陆
const logout = async () => {
  await userStore.userLogout();
  $router.push({ path: '/login', query: { redirect: $route.path } });
};

// 主题色选择
const color = ref('rgba(255, 69, 0, 0.68)');
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]);

// 切换暗黑模式
const changeDark = () => {
  // 实现原理：元素加dark类
  let html = document.documentElement;
  let toolbar = document.getElementsByClassName('toolbar')[0];
  let elHeader = document.getElementsByClassName('el-header')[0];

  if (dark.value) {
    html.className = 'dark';
    toolbar.classList.add('toolbarDark');
    elHeader.style.backgroundColor = '#00152a';
  } else {
    html.className = '';
    toolbar.classList.remove('toolbarDark');
    elHeader.style.backgroundColor = 'white';
  }
};

// 更改主题色
const setColor = () => {
  let html = document.documentElement;
  html.style.setProperty('--el-color-primary', color.value);
};
</script>

<style lang="scss" scoped>
img {
  width: 24px;
  height: 24px;
  border-radius: 20px;
  margin: 0 10px;
}
</style>

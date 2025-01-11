<template>
  <el-container class="layout-container-wrapper" style="height: 100vh">
    <!-- 左侧菜单栏 -->
    <el-aside
      width="200px"
      :class="{ isCollapse: LayOutSettingStore.isCollapse ? true : false }"
    >
      <el-scrollbar>
        <el-menu
          :default-active="$route.path"
          active-text-color="#fff"
          background-color="#001529"
          text-color="#959ea6"
          :collapse="LayOutSettingStore.isCollapse"
          :router="true"
          :unique-opened="true"
        >
          <!-- 左侧上的logo -->
          <Logo />
          <!-- 左侧下的菜单 -->
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <!-- 右侧内容区 -->
    <el-container class="container">
      <!-- 右侧上标签栏 -->
      <el-header style="text-align: right; font-size: 12px">
        <TabBar style="width: 100%" />
      </el-header>
      <!-- 右侧主体 -->
      <el-main
        :style="{
          left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
          width: LayOutSettingStore.isCollapse
            ? 'calc(100% - 56px)'
            : 'calc(100% - 200px)',
        }"
      >
        <el-scrollbar>
          <Main />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Logo from './logo/logoIndex.vue';
import Menu from './menu/menuIndex.vue';
import TabBar from './tabbar/tabBarIndex.vue';
import Main from './main/mainIndex.vue';

// 左侧菜单点击后跳转
import { useRoute } from 'vue-router';
let $route = useRoute();

// 判断侧边栏是否收缩
import useLayOutSettingStore from '../store/modules/setting';
let LayOutSettingStore = useLayOutSettingStore();

// 渲染用户动态菜单
import useUserStore from '../store/modules/login';
let userStore = useUserStore();
</script>

<style lang="scss" scoped>
.layout-container-wrapper {
  height: 100%;
}
.layout-container-wrapper .el-menu {
  border-right: none;
}
.layout-container-wrapper .el-main {
  position: absolute;
  padding: 20px;
  left: 200px;
  top: 60px;
  transition: all 0.3s;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - 60px);
}
.el-aside {
  background-color: #001529;
  transition: all 0.3s;
}
.el-header {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  z-index: 999;
}
.isCollapse {
  width: 56px;
}

@media screen and (max-width: 768px) {
  .el-aside {
    position: fixed;
    left: -200px;
    top: 0;
    bottom: 0;
    z-index: 1000;
    &.isCollapse {
      left: 0;
    }
  }
  .el-main {
    left: 0 !important;
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  .container {
    margin-left: 0;
  }
}
</style>

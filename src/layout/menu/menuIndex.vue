<template>
  <div>
    <template v-for="item in menuList" :key="item.path">
      <!-- 特殊处理：路径为 "/" 且有子菜单且子菜单只有一个项 -->
      <el-menu-item
        v-if="item.path === '/' && item.children && item.children.length === 1"
        :index="item.children[0].path"
        v-show="!item.children[0].meta.hidden"
        @click="goRoute(item.children[0].path)"
      >
        <el-icon v-if="item.children[0].meta.icon">
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>

      <!-- 没有子路由或子路由为空 -->
      <el-menu-item
        v-else-if="!item.children || item.children.length === 0"
        :index="item.path"
        :route="item"
        v-show="!item.meta.hidden"
        @click="goRoute(item.path)"
      >
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>

      <!-- 有子路由 -->
      <el-sub-menu v-else :index="item.path" v-show="!item.meta.hidden">
        <template #title>
          <el-icon v-if="item.meta.icon">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span style="margin-left: 6px">{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children" />
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

// 获取路由器对象
const $router = useRouter();

// 获取父组件传递过来的全部路由数组
defineProps(['menuList']);

// 点击菜单的回调
const goRoute = (path: string) => {
  $router.push(path);
};
</script>

<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: 'Menu',
};
</script>

<style scoped>
/* 可以在这里添加一些样式 */
</style>

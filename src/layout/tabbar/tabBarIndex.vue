<template>
  <div class="toolbar">
    <div class="toolbar_left">
      <BreadCrumb />
    </div>
    <div class="toolbar_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/breadcrumbIndex.vue';
import Setting from './setting/settingIndex.vue';
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  .toolbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .toolbar_right {
    display: flex;
    align-items: center;
  }
}
.toolbarDark {
  color: white;
  background-color: #00152a;
}
</style>

<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" v-if="setting.picHidden" />
    <span class="title">{{ setting.title }}</span>
  </div>
</template>
<script setup lang="ts">
import setting from '../../setting';
</script>
<style lang="scss" scoped>
.logo {
  width: 95%;
  display: flex;
  align-items: center;
  height: $base-menu-logo-height;
  color: #959ea6;
  font-weight: 700;
  font-size: $base-logo-title-fontSize;
  flex-wrap: nowrap;
  overflow: hidden;
  padding-left: 17px;
  img {
    display: inline-block;
    widows: 30px;
    height: 30px;
    border-radius: 10px;
  }
  .title {
    display: inline-block;
    height: 32px;
    margin: 2px 0 0 18px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 600;
    line-height: 32px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

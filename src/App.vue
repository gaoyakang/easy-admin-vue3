<template>
  <div>
    <testC />
    <svg>
      <use xlink:href="#icon-manage"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import testC from '@/components/testC.vue';

console.log(import.meta.env);
</script>

<style scoped lang="scss"></style>

<template>
  <div>
    <testC />
    <svg>
      <use xlink:href="#icon-manage"></use>
    </svg>
    <div class="test">hello</div>
  </div>
</template>

<script lang="ts" setup>
import testC from '@/components/testC.vue';

console.log(import.meta.env);
</script>

<style scoped lang="scss">
.test {
  color: $color;
}
</style>

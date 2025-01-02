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
import { onMounted } from 'vue';
import { reqLogin } from '@/api/user/';

onMounted(() => {
  login();
});
const login = async () => {
  let data = await reqLogin({ username: 'admin', password: '111111' });
  console.log(data);
};
console.log(import.meta.env);
</script>

<style scoped lang="scss">
.test {
  color: $color;
}
</style>

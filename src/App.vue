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
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(() => {
  login();
});
const login = async () => {
  let data = await axios.post('/api/user/login', {
    username: 'admin',
    password: '111111',
  });
  console.log(data);
};
console.log(import.meta.env);
</script>

<style scoped lang="scss">
.test {
  color: $color;
}
</style>

<template>
  <div class="not-found-container">
    <el-card class="box-card">
      <div class="not-found-content">
        <h1>404</h1>
        <p>页面未找到</p>
        <el-button type="primary" @click="goBack">返回</el-button>
        <el-button @click="goHome">首页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push('/');
};
</script>
<style scoped lang="scss">
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.box-card {
  width: 600px;
  padding: 60px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.not-found-content {
  h1 {
    font-size: 48px;
    color: #333;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
  }

  .el-button {
    margin: 0 10px;
  }
}
</style>

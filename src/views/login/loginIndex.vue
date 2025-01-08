<template>
  <div class="login_container">
    <el-row>
      <!-- 左侧 -->
      <el-col :span="12" :xs="0"></el-col>
      <!-- 右侧 -->
      <el-col :span="12" :xs="24">
        <!-- 登陆表单 -->
        <el-card class="login_form">
          <h1>Easy Admin</h1>
          <!-- 表单字段 -->
          <el-form :model="loginForm" :rules="rules" ref="loginForms">
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="loginForm.username"
                clearable
                placeholder="Username"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                :prefix-icon="Lock"
                show-password
                v-model="loginForm.password"
                size="large"
                placeholder="Password"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- 提交按钮 -->
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import useUserStore from '../../store/modules/login';
import { useRouter, useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '../../utils/time';

// 登陆参数
let loading = ref(false);
let loginForms = ref();
const loginForm = reactive({
  username: 'admin',
  password: '111111',
});

// store和路由
let useStore = useUserStore();
let $router = useRouter();
let $route = useRoute();

// 登陆请求
const login = async () => {
  await loginForms.value.validate();
  loading.value = true;
  try {
    let data = await useStore.userLogin(loginForm);
    // 跳转到首页
    let redirect: string = $route.query.redirect as string;
    $router.push({ path: redirect || '/' });
    ElNotification({
      type: 'success',
      message: data.message,
      title: `Hi, ${getTime()}好`,
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      type: 'error',
      message:
        (error as Error).message === 'null'
          ? '用户名/密码错误'
          : (error as Error).message,
    });
  }
};
// 校验规则
const validatorUsername = (rule, value, callback) => {
  if (value.length === 0) {
    callback(new Error('请输入账号'));
  } else {
    callback();
  }
};
const validatorPassword = (rule, value, callback) => {
  if (value.length === 0) {
    callback(new Error('请输入密码'));
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码应为6~16位的任意组合'));
  } else {
    callback();
  }
};
const rules = {
  username: [
    {
      trigger: 'change',
      validator: validatorUsername,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  position: fixed;
  background: url('../../assets/images/background.jpg') no-repeat;
  .login_form {
    position: relative;
    width: 70%;
    top: 25vh;
    left: 2vw;
    padding: 10px;
    background: transparent;
    h1 {
      background: linear-gradient(to right, blue, rgb(35, 60, 70));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
      text-align: center;
      font-weight: 700;
      margin-bottom: 40px;
      margin-top: -10px;
    }
    .login_btn {
      width: 100%;
    }
  }
}

.el-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

@media screen and (max-width: 768px) {
  .login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;

    .login_form {
      width: 100%;
      max-width: 400px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      position: static;
      top: auto;
      left: auto;

      h1 {
        font-size: 32px;
        margin-bottom: 30px;
        margin-top: 0;
      }
    }
  }
}
</style>

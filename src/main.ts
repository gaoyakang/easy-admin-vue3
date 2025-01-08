import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 组件样式
import 'element-plus/theme-chalk/dark/css-vars.css'; // 暗黑模式变量定义
import './assets/styles/index.scss'; // 自定义css

const app = createApp(App);

// ele配置
app.use(ElementPlus);

// 路由配置
import router from './router';
import './permission'; // 路由钩子
app.use(router);

// 全局状态管理
import pinia from './store';
app.use(pinia);

// svg图标
import 'virtual:svg-icons-register';
import gloablComponent from './components/index';
app.use(gloablComponent);

// 挂载
app.mount('#app');

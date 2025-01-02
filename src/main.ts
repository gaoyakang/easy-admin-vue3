import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import gloablComponent from '@/components/SvgIcon.vue';
import { createApp } from 'vue';
import './style.css';
import '@/assets/styles/index.scss';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// ele配置
app.use(ElementPlus, {
  locale: zhCn,
});

// 路由配置
app.use(router);

// svg图标
import 'virtual:svg-icons-register';
app.use(gloablComponent);

// 挂载
app.mount('#app');

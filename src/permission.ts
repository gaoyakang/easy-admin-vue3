import router from '@/router';
import setting from './setting';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import pinia from './store';
import useUserStore from './store/modules/login';
nprogress.configure({ showSpinner: false });
const userStore = useUserStore(pinia);

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 设置标题和进度条
  document.title = to.meta.title + ` | ${setting.title}`;
  nprogress.start();

  // 校验用户token
  const token = userStore.token;
  const username = userStore.username;
  if (token) {
    // 已登陆账户不允许访问login
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 已经获取过用户信息直接放行
      if (username) {
        next();
      } else {
        // 未获取过用户信息则请求获取
        try {
          await userStore.userInfo(); // 获取用户信息并生成动态菜单
          next({ ...to });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          await userStore.userLogout();
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
});

// 全局后置守卫
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((route) => {
  nprogress.done();
});

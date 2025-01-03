import { defineStore } from 'pinia';

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      isCollapse: false, // 侧边栏是否收缩
      fold: false, // 缩放图标
      refsh: false, // 刷新当前页
      dark: false, // 暗黑模式
    };
  },
});

export default useLayOutSettingStore;

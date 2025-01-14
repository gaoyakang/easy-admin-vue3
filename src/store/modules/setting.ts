import { defineStore } from 'pinia';
import { setItem, getItem } from '../../utils/localStorage';

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      // 侧边栏是否收缩
      isCollapse: getItem('isCollapse') === true, // 从localStorage读取
      // 图标是否折叠
      fold: false, // 缩放图标
      refsh: false, // 刷新当前页
      // dark: false, // 暗黑模式
      dark: getItem('dark') === 'true', // 从localStorage读取
    };
  },
  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      setItem('isCollapse', this.isCollapse.toString());
      // localStorage.setItem('isCollapse', this.isCollapse.toString()); // 更新localStorage
    },
    toggleDark() {
      this.dark = !this.dark;
      setItem('dark', this.dark.toString()); // 更新localStorage
    },
  },
});

export default useLayOutSettingStore;

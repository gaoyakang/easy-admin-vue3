import { defineStore } from 'pinia';

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      isCollapse: false, // 侧边栏是否收缩
      refsh: false, // ？
      fold: false, //
    };
  },
});

export default useLayOutSettingStore;

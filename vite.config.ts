import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path'; // 导入 path 模块

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      // 全局icon
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnable: true,
          additionalData: '@use "/src/assets/styles/variable.scss" as *;',
        },
      },
    },
  };
});

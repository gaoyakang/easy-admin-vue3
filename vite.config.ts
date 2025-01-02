import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path'; // 导入 path 模块

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      // 全局icon
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      // 模拟数据
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnable: true,
          additionalData: '@use "@/assets/styles/variable.scss" as *;',
        },
      },
    },
    resolve: {
      // 别名
      alias: {
        '@': path.resolve('./src'),
      },
    },
  };
});

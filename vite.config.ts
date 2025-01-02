import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path'; // 导入 path 模块

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
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
});

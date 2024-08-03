import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      // '/foo': 'http://localhost:4567',
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/admin': {
        target: 'https://shop.fed.lagounews.com/api/', // 代理的目标地址
        // 兼容基于名字的虚拟主机
        // a.com localhost.xxx
        // b.com localhost.xxx
        // http 头部的 origin 字段
        // 开发模式：默认的 origin 字段取得的真实的字段 localhost:3000
        // changeOrigin: true 代理服务会把 origin 字段改为目标地址 https://shop.fed.lagounews.com/api/
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false // 禁用换缓存
    }),
    vueJsx({

    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  build: {
    rollupOptions: {
      external: [
        'element-plus'
      ]
    }
  }
})

// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import fullImportPlugin from '@/plugins/fullImportPlugin'
// 启动之初就对某些资源进行预打包，尽量避免后续的动态打包
// import OptimizationPersist from 'vite-plugin-optimize-persist'
// import VitePluginPackageConfig from 'vite-plugin-package-config'
// const env = loadEnv(mode, process.cwd(), '')
console.log(process, 'process---')
console.log('获取当前目录',process.cwd())

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // VitePluginPackageConfig(),
    // OptimizationPersist(),
  ],
  server: {
    port: 3000,
    open: true,
    host: "0.0.0.0",
    base:'/',//用于代理 Vite 作为子文件夹时使用。
    cors: true,//为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。
    // proxy: {
    //   '/api': {
    //     // target: 'http://jsonplaceholder.typicode.com', // 指向后端地址
    //     // changeOrigin: true, // 允许跨域
    //     // rewrite: path => path.replace(/^\/api/, '')
    //   },
        // Proxying websockets or socket.io
        // '/socket.io': {
        //     target: 'ws://localhost:3000',
        //     ws: true
        //   }
    // }
  },
  resolve: {
    extensions: ['.js', 'ts', '.vue', '.json', ".scss"],
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  hmr: { overlay: true },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了 @import '@/styles/var.scss'
  //       additionalData: `
  //         @import '@/styles/var.scss'
  //       `
  //     }
  //   }
  // },
  // esbuild: {
  //   pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
  // },
  build: {
    outDir: "dist",
    minify: "esbuild",
    // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
    // minify: "terser",
    // terserOptions: {
    // 	compress: {
    // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
    // 		drop_debugger: true
    // 	}
    // },
    // 禁用 gzip 压缩大小报告，可略微减少打包时间
    reportCompressedSize: false,
    // 规定触发警告的 chunk 大小
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Static resource classification and packaging
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    }
  }
})

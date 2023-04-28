import { createApp } from 'vue'
import { createPinia } from 'pinia' 
import './style.css'
import router from './router'
import App from './App.vue'
import "@/styles/reset.scss"
// CSS common style sheet
import "@/styles/common.scss"
// element css
import "element-plus/dist/index.css"
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css"
// custom element dark css
import "@/styles/theme/element-dark.scss"
// custom element css
import "@/styles/element.scss"
// svg icons
// import "virtual:svg-icons-register"
// element icons
import * as Icons from "@element-plus/icons-vue"
// pinia store
import pinia from '@/store'
// 创建vue实例
const app = createApp(App)
// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})
console.log(import.meta.env, 'import.meta.env')
app.use(router).use(pinia).mount('#app')

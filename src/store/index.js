// import { defineStore, createPinia } from 'pinia'

// export const mainStore = defineStore('main', {
//   state:()=>({
//     isShowNav: true, // 顶部导航显示与隐藏
//     isShowUserInfo: false, // 显示用户信息
//   })
// })
// storeToRefs
// const { helloWorld, count } = storeToRefs(store)
// 数据持久化
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

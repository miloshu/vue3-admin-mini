import { nextTick, onDeactivated, onMounted, onUnmounted } from 'vue'

/**
 * @description 网络是否可用
 * */
export const useLayoutStyle = () => {
  onMounted(() => {
    nextTick(_ => {
      const app = document.querySelector('#app')
      app.classList.add('hx-admin-layout')
    })
  })
  onDeactivated(() => {
    removeClassName()
  })
  onUnmounted(() => {
    removeClassName()
  })
  const removeClassName = () => {
    nextTick(_ => {
      const app = document.querySelector('#app')
      app.classList.remove('hx-admin-layout')
    })
  }
};

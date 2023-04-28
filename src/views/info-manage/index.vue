<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import navMenu from './component/navMenu.vue'
const route = useRoute()
const list = reactive([])
watch(route, (to, from) => {
  getBreadCrumbs(to.matched)
})
onMounted(() => {
  // 获取路由信息
  console.log(route.matched, 'route.matched')
  getBreadCrumbs(route.matched)
})
const getBreadCrumbs = (matched) => {
  list.value = matched
}
</script>
<style lang='scss' scoped>

</style>

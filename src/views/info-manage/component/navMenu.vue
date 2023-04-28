<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
      >
        <el-menu-item :index="item.url" v-for="item in navList" :key="item.icon">
          <el-icon><icon :is="item.icon" ref="refCom"/></el-icon>
          <span>{{item.name}}</span>
        </el-menu-item>
      </el-menu>
      </el-col>
  </el-row>
</template>

<script setup>
import {
  // Document,
  Menu as IconMenu,
  Location,
  // Setting,
} from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
const refCom = ref()
const navList = reactive([
  {
    name: '首页',
    icon: IconMenu,
    url: '/index'
  },
  {
    name: '运单管理',
    icon: Location,
    url: '/waybillManage'
  }
])
// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
</script>

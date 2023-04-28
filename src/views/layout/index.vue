<!-- 纵向布局 -->
<template>
  <Teleport to="body">
    <el-container class="layout">
      <el-aside>
        <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
          <div class="logo flx-center">
            <img class="logo-img" src="@/assets/images/hx-logo.png" alt="logo" />
            <span class="logo-text" v-show="!isCollapse"></span>
          </div>
          <el-scrollbar>
            <el-menu
              :default-active="activeMenu"
              :collapse="isCollapse"
              :router="false"
              :unique-opened="true"
              :collapse-transition="false"
            >
              <SubMenu :menuList="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <ToolBarLeft />
          <ToolBarRight />
        </el-header>
        <Main />
      </el-container>
    </el-container>
  </Teleport>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useAuthStore } from "@/store/modules/auth"
import { useGlobalStore } from "@/store/modules/global"
import Main from "./components/Main/index"
import ToolBarLeft from "./components/Header/ToolBarLeft"
import ToolBarRight from "./components/Header/ToolBarRight"
import SubMenu from "./components/Menu/SubMenu"
import { useLayoutStyle } from '@/hooks/useLayoutStyle'
useLayoutStyle()
const route = useRoute()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const isCollapse = computed(() => globalStore.isCollapse)
const menuList = computed(() => authStore.showMenuListGet)
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

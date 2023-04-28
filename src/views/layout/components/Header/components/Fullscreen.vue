<template>
  <div class="fullscreen">
    <!-- <i :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']" class="toolBar-icon" @click="toggle">

    </i> -->
    <el-icon class="toolBar-icon" @click="toggle"><FullScreen /></el-icon>
  </div>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
const { toggle, isFullscreen } = useFullscreen();
</script>

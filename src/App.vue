<template>
   <el-config-provider :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
import { reactive } from 'vue'
const buttonConfig = reactive({ autoInsertSpace: false })
</script>

<style scoped>

</style>

<template>
  <Teleport to="body">
    <div class="hx-login-page ">
      <NavHeader />
      <main class="login-main-content">
        <div class="login-form">
          <LoginForm />
        </div>
      </main>
    </div>
  </Teleport>
</template>

<script setup>
import { useLayoutStyle } from '@/hooks/useLayoutStyle'
import LoginForm from '../components/LoginForm.vue'
import NavHeader from '../components/NavHeader.vue'
useLayoutStyle()
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

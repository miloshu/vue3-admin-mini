<template>
  <nav class="hx-login-nav">
    <div class="header-content">
      <img width="80" src="../../../assets/images/hx-logo.png" alt="btops" class="logo">
      <div class="login-header-title">门户</div>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped lang="scss">
.hx-login-nav {
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  padding: 12px 40px;
  box-sizing: border-box;
  .header-content {
    display: flex;
    height: 100%;
    line-height: 24px;
    .login-header-title {
      line-height: 56px;
      margin-left: 20px;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>

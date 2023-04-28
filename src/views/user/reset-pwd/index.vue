<template>
  <Teleport to="body">
    <div class="hx-reset-form-page">
      <NavHeader />
      <div class="reset-content-container">
        <div class="reset-content">
        <h2 class="reset-title">找回密码</h2>
        <el-form ref="resetFormRef" :model="resetPwdForm" :rules="resetPwdRules" size="large" label-width="120px">
          <el-form-item prop="phoneNumber" label="手机号码">
            <el-input v-model="resetPwdForm.phoneNumber" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="verificationCode" label="验证码">
            <el-input v-model="resetPwdForm.verificationCode" placeholder="请输入验证码"></el-input>
          </el-form-item> -->
          <el-form-item prop="smsCode" label="短信验证码" class="sms-box">
            <div style="display: flex; justify-content: space-between; width: 100%">
              <el-input v-model="resetPwdForm.smsCode" placeholder="请输入短信验证码"></el-input>
              <el-button style="margin-left: 16px" :disabled="isStart" @click.stop="startCount()">
                {{isStart ? `${currentCount}s后重新获取` : '获取验证码'}}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item prop="password" label="新密码">
            <el-input type="password" v-model="resetPwdForm.password" placeholder="8-16位, 数字, 大小写字母,特殊字符中的三种" show-password autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassWord" label="密码确认">
            <el-input type="password" v-model="resetPwdForm.checkPassWord" placeholder="请输入确认密码" show-password autocomplete="new-password"></el-input>
          </el-form-item>
        </el-form>
        <div class="reset-btn-box">
          <el-button
            :loading="loading"
            type="primary"
            size="large"
            color="rgba(51, 153, 153, 1)"
            @click="resetPwd(resetFormRef)">
            重置
          </el-button>
          <el-button
            size="large"
            @click="goBack()" >
            返回
          </el-button>
        </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, unref, reactive, nextTick, onMounted, onDeactivated, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { validatePhone } from '@/utils/common'
import NavHeader from '../components/NavHeader.vue'
// import { DASH_BOARD_URL } from "@/config"
// import { getTimeState } from "@/utils"
import { ElNotification } from "element-plus"
import { useLayoutStyle } from '@/hooks/useLayoutStyle'
// import { loginApi } from "@/api/modules/login"
// import { useUserStore } from "@/stores/modules/user"
// import { useTabsStore } from "@/stores/modules/tabs"
// import { useKeepAliveStore } from "@/stores/modules/keepAlive"
// import { initDynamicRouter } from "@/routers/modules/dynamicRouter"
import { CircleClose, UserFilled } from "@element-plus/icons-vue"
import md5 from "js-md5"
// 新密码验证
const validatePass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('密码不能为空！'))
  } else {
    if (resetPwdForm.checkPassWord !== '') {
      if (!resetFormRef.value) return
      resetFormRef.value.validateField('checkPassWord', () => null)
    }
  }
  let str = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/
  if (!str.test(value)||value.length < 8 || value.length > 16) {
    callback(new Error('当前密码格式不正确!'))
  } else {
    callback()
  }
}
// 确认密码验证
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空！'))
  } else if (value !== resetPwdForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
const router = useRouter()
// const userStore = useUserStore();
// const tabsStore = useTabsStore();
// const keepAliveStore = useKeepAliveStore();
const loading = ref(false)
const currentCount = ref(60)
const isStart = ref(false)
let timerId = null
// 注册
const resetFormRef = ref()
const resetPwdRules = reactive({
  phoneNumber: [{ required: true, validator: validatePhone, trigger: "blur" }],
  verificationCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  password: [{ required: true, validator: validatePass, trigger: "blur" }],
  checkPassWord: [{ required: true, validator: validatePass2, trigger: "blur" }],
  smsCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
})
const resetPwdForm = reactive({
  phoneNumber: '',
  password: '',
  checkPassWord: '',
  verificationCode: '',
  smsCode: ''
})
// login
// const login = (formEl) => {
//   if (!formEl) return
//   formEl.validate(async valid => {
//     if (!valid) return
//     loading.value = true
//     try {
//       // 1.执行登录接口
//       const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) })
//       userStore.setToken(data.access_token)

//       // 2.添加动态路由
//       await initDynamicRouter();

//       // 3.清空 tabs、keepAlive 数据
//       tabsStore.closeMultipleTab()
//       keepAliveStore.setKeepAliveName()

//       // 4.跳转到首页
//       router.push(DASH_BOARD_URL);
//       ElNotification({
//         title: getTimeState(),
//         message: "欢迎登录 Geeker-Admin",
//         type: "success",
//         duration: 3000
//       });
//     } finally {
//       loading.value = false;
//     }
//   })
// }

// // resetForm
// const resetForm = (formEl) => {
//   if (!formEl) return
//   formEl.resetFields()
// }

// onMounted(() => {
  // 监听 enter 事件（调用登录）
  // document.onkeydown = e => {
  //   e = (window.event) || e;
  //   if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
  //     if (loading.value) return
  //     login(loginFormRef.value)
  //   }
  // }
// })
// /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
// 布局方式
useLayoutStyle()
// 重置密码
const resetPwd = async (formEl) => {
  if (!formEl) return
  loading.value = false
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = false
      console.log('resetPwd!')
    } else {
      loading.value = false
      console.log('error resetPwd!', fields)
    }
  })
}
// 返回
const goBack = () => {
  router.push('/user/login')
}
const stop = () => {
  isStart.value = false
  timerId && window.clearInterval(timerId)
  timerId = null
}
const startCount = () => {
  resetFormRef.value.validateField('phoneNumber', (valid) => {
    // 校验手机号是否正确
    if (valid) {
      if (unref(isStart) || !!timerId) {
        return
      }
      isStart.value = true
      timerId = setInterval(() => {
        if (unref(currentCount) === 1) {
          stop()
          currentCount.value = 60
        } else {
          currentCount.value -= 1
        }
      }, 1000)
    } else {
      ElNotification({
        message: '请输入手机号',
        type: 'warning',
        position: 'bottom-right',
        duration: 3000
      })
    }
  })
}
</script>

<style scoped lang="scss">
.hx-reset-form-page {
  width: 100%;
  height: 100vh;
  font-family: SourceHanSansCN-Regular;
  background-color: #e5e5e5;
  .reset-content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 95px);
    min-height: 350px;
    margin-top: 12px;
    background-color: #fff;
  }
  .reset-content {
    width: 50%;
    max-width: 500px;
    margin: auto;
    .reset-title {
      padding-left: 100px;
      text-align: center;
      font-weight: 600;
      font-size: 18px;
      color: var(--color-text);
      margin-bottom: 20px;
    }
    .reset-btn-box {
      width: calc(100% - 120px);
      padding-left: 120px;
      text-align: left;
      .el-button {
        width: 48.2%;
      }
    }
  }
}
</style>

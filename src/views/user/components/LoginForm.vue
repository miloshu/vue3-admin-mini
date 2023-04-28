<template>
  <div class="login-form-box">
    <h2 class="login-title">登录</h2>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large" >
      <el-form-item prop="phoneNumber">
        <el-input v-model="loginForm.phoneNumber" placeholder="请输入手机号">
          <template #prefix>
            <el-icon class="el-input__icon"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password autocomplete="new-password">
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="smsCode" class="sms-box">
        <div style="display: flex; justify-content: space-between; width: 100%">
          <el-input v-model="loginForm.smsCode" placeholder="请输入验证码">
            <template #prefix>
              <el-icon class="el-input__icon"><Iphone /></el-icon>
            </template>
          </el-input>
          <el-button style="margin-left: 16px" :disabled="isStart" @click.stop="startCount()">
            {{isStart ? `${currentCount}s后重新获取` : '获取验证码'}}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="login-btn">
      <el-button
        :loading="loading"
        type="primary"
        color="rgba(51, 153, 153, 1)"
        @click="submitForm(loginFormRef)">
        登录
      </el-button>
      <el-button
        type="primary"
        color="rgba(51, 153, 153, 1)"
        @click="register()">
        注册
      </el-button>
      <el-button
        link
        @click="forgetPwd()">
        忘记密码
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
// import { DASH_BOARD_URL } from "@/config"
// import { getTimeState } from "@/utils"
// import { ElNotification } from "element-plus"
// import { loginApi } from "@/api/modules/login"
// import { useTabsStore } from "@/stores/modules/tabs"
// import { useKeepAliveStore } from "@/stores/modules/keepAlive"
// import { initDynamicRouter } from "@/routers/modules/dynamicRouter"
import { CircleClose, UserFilled } from "@element-plus/icons-vue"
import md5 from "js-md5"
// 手机号校验
const validatePhone = (rule, value, callback) => {
  let str = new RegExp(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/)
  if (!value) {
    callback(new Error('请输入手机号'))
  }
  if (!str.test(value)) {
    callback(new Error('手机号格式错误'))
  } else {
    callback()
  }
}
// 新密码验证
const validatePass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('密码不能为空！'))
  } else {
    if (loginForm.password !== '') {
      if (!loginFormRef.value) return
      loginFormRef.value.validateField('password', () => null)
    }
  }
  let str = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/
  if (!str.test(value) || value.length < 8 || value.length > 16) {
    callback(new Error('当前密码格式不正确!'))
  } else {
    callback()
  }
}
const router = useRouter()
const userStore = useUserStore()
// const tabsStore = useTabsStore();
// const keepAliveStore = useKeepAliveStore();
const loading = ref(false)
const currentCount = ref(60)
const isStart = ref(false)
let timerId = null
// 登录
const loginForm = reactive({
  phoneNumber: '',
  password: '',
  smsCode: ''
})
const loginFormRef = ref()
const loginRules = reactive({
  phoneNumber: [{ required: true, validator: validatePhone, trigger: "blur" }],
  password: [{ required: true, validator: validatePass, trigger: "blur" }],
  smsCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
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

onMounted(() => {
  // 监听 enter 事件（调用登录）
  // document.onkeydown = e => {
  //   e = (window.event) || e;
  //   if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
  //     if (loading.value) return
  //     login(loginFormRef.value)
  //   }
  // }
})
// 登录
const submitForm = async (formEl) => {
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
// 注册
const register = () => {
  userStore.setShowOrHidden(false)
  router.push('/user/register')
}
// 重置密码
const resetPwd = async (formEl) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('resetPwd!')
      loading.value = false
    } else {
      console.log('error resetPwd!', fields)
      loading.value = false
    }
  })
}
// 忘记密码
const forgetPwd = () => {
  router.push('/user/reset-pwd')
}
const stop = () => {
    isStart.value = false
    timerId && window.clearInterval(timerId)
    timerId = null
  }
const startCount = () => {
  loginFormRef.value.validateField('smsCode', (valid) => {
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
    }
  })
}
</script>

<style scoped lang="scss">
@import "../login/index.scss";
</style>

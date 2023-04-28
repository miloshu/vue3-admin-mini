<template>
  <el-form ref="formRef" :model="formModel" :rules="resetPwdRules" size="large" label-width="120px">
    <el-form-item prop="userName" label="姓名:">
      <el-input v-model="formModel.userName" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱:">
      <el-input v-model="formModel.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="phoneNumber" label="手机号码:">
      <el-input v-model="formModel.phoneNumber" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item prop="smsCode" label="验证码:" class="sms-box">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <el-input v-model="formModel.smsCode" placeholder="请输入短信验证码"></el-input>
        <el-button style="margin-left: 16px" :disabled="isStart" @click.stop="startCount()">
          {{isStart ? `${currentCount}s后重新获取` : '获取验证码'}}
        </el-button>
      </div>
    </el-form-item>
    <el-form-item prop="password" label="密码:">
      <el-input type="password" v-model="formModel.password" placeholder="8-16位, 数字, 大小写字母,特殊字符中的三种" show-password autocomplete="new-password"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassWord" label="确认密码:">
      <el-input type="password" v-model="formModel.checkPassWord" placeholder="请输入确认密码" show-password autocomplete="new-password"></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, unref, reactive, nextTick, onMounted, onDeactivated, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from "element-plus"
import { validatePhone, validateEmail } from '@/utils/common'
// 新密码验证
const validatePassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('密码不能为空！'))
  } else {
    if (formRef.value.checkPassWord !== '') {
      if (!formRef.value) return
      formRef.value.validateField('checkPassWord', () => null)
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
const validateCheckPassWord = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空！'))
  } else if (value !== formModel.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
const currentCount = ref(60)
const isStart = ref(false)
const validateFlag = ref(false)
let timerId = null
// 确认提交
const formRef = ref()
const formType = ref('userInfo')
const resetPwdRules = reactive({
  userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  email: [{ required: true, validator: validateEmail, trigger: "blur" }],
  phoneNumber: [{ required: true, validator: validatePhone, trigger: "blur" }],
  password: [{ required: true, validator: validatePassword, trigger: "blur" }],
  checkPassWord: [{ required: true, validator: validateCheckPassWord, trigger: "blur" }],
  smsCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
})
const formModel = reactive({
  userName: '',
  email: '',
  phoneNumber: '',
  password: '',
  checkPassWord: '',
  smsCode: ''
})
const stop = () => {
  isStart.value = false
  timerId && window.clearInterval(timerId)
  timerId = null
}
const startCount = () => {
  formRef.value.validateField('phoneNumber', (valid) => {
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
// 下一步 校验
const validateForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    validateFlag.value = valid
  })
  return {
    validateFlag: validateFlag.value,
    formType,
    formModel
  }
}
// 属性方法暴露给父组件
defineExpose({
  formRef,
  validateFlag,
  validateForm,
})
</script>
<style lang='scss' scoped>

</style>

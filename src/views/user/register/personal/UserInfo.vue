<template>
  <div class="register-personal-user-info">
    <el-form ref="formRef" :model="formModel" :rules="resetPwdRules" size="large" label-width="130px">
      <el-form-item prop="userName" label="个人姓名:">
        <el-input v-model="formModel.userName" placeholder="请输入个人姓名"></el-input>
      </el-form-item>
      <el-form-item prop="phoneNumber" label="个人电话:">
        <el-input v-model="formModel.phoneNumber" placeholder="请输入个人电话"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="联系地址:">
        <el-input v-model="formModel.address" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="上传身份证正面:">
        <el-input v-model="formModel.frontIdCard" placeholder="请上传身份证正面"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="上传身份证反面:">
        <el-input v-model="formModel.reverseIdCard" placeholder="请上传身份证反面"></el-input>
      </el-form-item>
      <el-form-item prop="validityDate" label="身份证有效期:">
        <el-date-picker
          style="width: 100%"
          class="validity-date-cust"
          v-model="formModel.validityDate"
          type="date"
          placeholder="请选择"
        />
      </el-form-item>
    </el-form>
  </div>
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
  userName: [{ required: true, message: "请输入个人姓名", trigger: "blur" }],
  address: [{ required: true, message: "请输入联系地址", trigger: "blur" }],
  phoneNumber: [{ required: true, validator: validatePhone, trigger: "blur" }],
  frontIdCard: [{ required: true, message: "请上传身份证正面", trigger: "blur" }],
  reverseIdCard: [{ required: true, message: "请上传身份证反面", trigger: "blur" }],
  validityDate: [{ required: true, message: "请选择身份证有效期", trigger: "change" }],
})
const formModel = reactive({
  userName: '',
  address: '',
  phoneNumber: '',
  frontIdCard: '',
  reverseIdCard: '',
  validityDate: ''
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
.register-personal-user-info {
  &:deep(.validity-date-cust) {
    width: 100% !important;
    .el-input__wrapper {
      width: 94% !important;
    }
  }
}
</style>

<template>
  <div class="hx-register-info-step">
    <el-steps :active="activeStep" align-center finish-status="success">
      <el-step :title="step.title" v-for="step in stepsList" :key="step.value" />
    </el-steps>
    <!-- 表单 -->
    <UserInfo ref="userInfoRef" v-show="activeStep === 0" />
    <BasicInfo ref="basicInfoRef" v-show="activeStep === 1" />
    <ContactService ref="contactServiceRef" v-show="activeStep === 2" />
    <FinanceInfo ref="financeInfoRef" v-show="activeStep === 3" />
    <div class="register-btn-box">
      <el-button
        size="large"
        type="primary"
        color="rgba(51, 153, 153, 1)"
        @click="goPrev()" >
        上一步
      </el-button>
      <el-button
        size="large"
        type="primary"
        color="rgba(51, 153, 153, 1)"
        @click="goNext()" >
        下一步
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import BasicInfo from './BasicInfo'
import FinanceInfo from './FinanceInfo'
import UserInfo from './UserInfo'
import ContactService from './ContactService'
const store = useUserStore()
// 把解构出来的数据作了ref响应式代理。让数据拥有响应式能力。
const { activeStep } = storeToRefs(store)
const contactServiceRef = ref(null)
const basicInfoRef = ref(null)
const userInfoRef = ref(null)
const financeInfoRef = ref(null)
const stepsList = reactive([
  {title: '用户信息', value: 0},
  {title: '基本信息', value: 1},
  {title: '联系人及服务范围', value: 2},
  {title: '财务信息', value: 3}
])
// 计算属性
const _$ref = computed(() => {
  const _MAP = {
    0: userInfoRef.value,
    1: basicInfoRef.value,
    2: contactServiceRef.value,
    3: financeInfoRef.value,
  }
  return _MAP[store.activeStep]
})
// 方法
// 下一步 goNext
const goNext = async () => {
  const formRef = _$ref?.value?.formRef
  const { validateFlag, formType, formModel } = await _$ref?.value?.validateForm(formRef)
  if (!validateFlag) return
  store.$patch((state) => { // 函数修改写法
    state.activeStep++
  })
  // 组装表单数据
  store.setEnterPriseFormData(formType.value, formModel)
  // 确认提交
  if (store.activeStep >= 4) {
    console.log(' 确认提交')
    store.activeStep = 0
    // 1.调用注册接口, 2. 注册成功调整到登录页面, store.activeStep = 0;
  }
}
// 上一步
const goPrev = () => {
  if (store.activeStep === 0) {
    store.setShowOrHidden(false)
    return false
  }
  store.activeStep--
}
</script>

<style scoped lang="scss">
.hx-register-info-step {
  padding-bottom: 40px;
  .register-btn-box {
    padding-left: 120px;
  }
}
</style>

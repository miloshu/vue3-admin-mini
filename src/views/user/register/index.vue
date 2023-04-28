<template>
  <Teleport to="body">
    <div class="hx-register-page">
      <NavHeader />
      <div class="register-content-container">
        <div class="register-content" v-show="!userStore.isShowUserInfo">
          <h2 class="register-title">注册</h2>
          <el-form 
            ref="formRef" 
            :model="formModel" 
            :rules="formRules" 
            size="large" 
            label-width="160px">
            <el-form-item prop="enterpriseType" label="企业类型" label-width="160px">
              <el-select
                style="width: 100%"
                placeholder="请选择企业类型"
                v-model="formModel.enterpriseType"
                @change="handleSelectType">
                <el-option
                  v-for="item in enterpriseTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="[null, '1', '2'].includes(formModel.enterpriseType)" prop="carrier" label="承运人全称" >
              <div class="carrier-wrap">
                <el-input v-model="formModel.carrier" placeholder="请输入承运人名称" clearable></el-input>
                <el-button class="carrier-info-btn">读取承运人信息</el-button>
              </div>
            </el-form-item>
            <el-form-item v-if="formModel.enterpriseType === '3'" prop="IDNo" label="身份证号码" >
              <el-input v-model="formModel.IDNo" placeholder="请输入身份证号码" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="[null, '1', '2'].includes(formModel.enterpriseType)" prop="uscc" label="统一社会信用代码">
              <el-input v-model="formModel.uscc" disabled placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                size="large"
                type="primary"
                color="rgba(51, 153, 153, 1)"
                style="width: 100%"
                @click="goNext(formRef)" >
                下一步
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="register-info-wrap" v-show="userStore.isShowUserInfo">
          <h2 class="register-title">注册</h2>
          <!-- 主内容注册模块 -->
          <!-- 个人类型 -->
          <PersonalUserInfo
            ref="personnelUserRef"
            v-if="formModel.enterpriseType === '3'"
            :enterpriseType="formModel.enterpriseType" />
          <!-- 企业类型 -->
          <EnterpriseUserInfo
            ref="enterpriseUserRef"
            v-else
            :enterpriseType="formModel.enterpriseType" />
          <!-- <keep-alive>
            <component :is="view"></component>
          </keep-alive> -->
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, unref, reactive, nextTick, onMounted, onDeactivated, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import NavHeader from '../components/NavHeader.vue'
import EnterpriseUserInfo from './enterprise/index.vue'
import PersonalUserInfo from './personal/index.vue'
import { validateIDCardNo } from '@/utils/common'
import { useLayoutStyle } from '@/hooks/useLayoutStyle'
const userStore = useUserStore()
const router = useRouter()
useLayoutStyle() // 布局方式
// const tabsStore = useTabsStore();
// const keepAliveStore = useKeepAliveStore();
let timerId = null
const currentCount = ref(60)
const loading = ref(false)
const isStart = ref(false)
const formRef = ref()
const userInfoRef = ref()
const view = ref(null)
// 表单校验规则
const formRules = reactive({
  enterpriseType: [{ required: true, message: "请选择企业类型", trigger: "change" }],
  carrier: [{ required: true, message: "请输入承运人全称", trigger: "blur" }],
  IDNo: [{ required: true, validator: validateIDCardNo, trigger: "blur" }],
  uscc: [{ required: true, message: "请输入统一社会信用代码", trigger: "blur" }]
})
// 表单字段
const formModel = reactive({
  enterpriseType: null,
  carrier: null,
  IDNo: null,
  uscc: null
})
// 企业类型
const enterpriseTypeOptions = reactive([
  {
    value: '1',
    label: '企业',
  },
  {
    value: '2',
    label: '海外',
  },
  {
    value: '3',
    label: '个人',
  }
])
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
//       router.push(LAYOUT_URL);
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
const goNext = async (formEl) => {
  // userStore.setShowOrHidden(true)
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userStore.setShowOrHidden(true)
      console.log(formModel.enterpriseType, 'formModel.enterpriseType')
    } else {
      console.log('error resetPwd!', fields)
    }
  })
}
const stop = () => {
    isStart.value = false
    timerId && window.clearInterval(timerId)
    timerId = null
  }
const startCount = () => {
  formRef.value.validateField('smsCode', (valid) => {
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
// 企业类型选择
const handleSelectType = (val) => {
  console.log(val, 'v-----')
  // view.value = +val === 3 ? 'EnterpriseUserInfo' : ''
  formModel.carrier = null
  formModel.IDNo = null
  formModel.uscc = null
  // 各子组件监听企业类型的值 重置表单
}
</script>

<style scoped lang="scss">
.hx-register-page {
  width: 100%;
  height: 100vh;
  min-width: 1280px;
  font-family: SourceHanSansCN-Regular;
  background-color: #e5e5e5;
  .register-content-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 85px);
    min-height: 350px;
    margin-top: 12px;
    background-color: #fff;
  }
  .register-content {
    width: 50%;
    max-width: 500px;
    margin: auto;
    .register-title {
      padding-left: 100px;
      text-align: center;
      font-weight: 600;
      font-size: 18px;
      color: var(--color-text);
      margin-bottom: 20px;
    }
    .register-btn-box {
      width: calc(100% - 120px);
      padding-left: 120px;
      text-align: left;
      .el-button {
        width: 48.2%;
      }
    }
    .carrier-wrap {
      position: relative;
      width: 100%;
      .carrier-info-btn {
        position: absolute;
        top: 0;
        right: -150px;
      }
    }
  }
  .register-info-wrap {
    // width: 65%;
    height: 100%;
    padding: 40px 0;
    min-height: 300px;
    max-width: 685px;
    margin: auto;
    &:deep(.el-steps) {
      width: 700px;
      margin-bottom: 16px;
    }
    .register-title {
      padding-left: 100px;
      text-align: center;
      font-weight: 600;
      font-size: 18px;
      color: var(--color-text);
      margin-bottom: 20px;
    }
  }
}
</style>

<template>
  <div>
    <el-form ref="formRef" :model="formModel" :rules="formRules" size="large" label-width="120px">
      <el-form-item prop="countryCode" label="国家代码:">
        <el-input v-model="formModel.countryCode" disabled></el-input>
      </el-form-item>
      <el-form-item prop="componyName" label="公司名称:">
        <el-input v-model="formModel.componyName" disabled></el-input>
      </el-form-item>
      <el-form-item prop="companyAddress" label="公司地址:">
        <el-input v-model="formModel.companyAddress" disabled></el-input>
      </el-form-item>
      <el-form-item prop="registeredCapital" label="注册资金(万元):">
        <el-input v-model="formModel.registeredCapital" disabled></el-input>
      </el-form-item>
      <el-form-item prop="legalRepresentative" label="法人代表:">
        <el-input v-model="formModel.legalRepresentative" disabled></el-input>
      </el-form-item>
      <el-form-item prop="establishmentTime" label="成立时间:">
        <el-input v-model="formModel.establishmentTime" disabled></el-input>
      </el-form-item>
      <el-form-item prop="businessScope" label="企业经营范围:">
        <el-input v-model="formModel.businessScope" disabled type="textarea" :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
        <!-- <el-form-item prop="businessLicense" label="营业执照:">
          <el-upload 
            action="#"
            ref="upload"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            v-model:image-url="formModel.businessLicense"
            :on-change="handleChange"
            :on-exceed="handleExceed">
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><ZoomIn /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item> -->
        <el-form-item prop="companyShorName" label="公司简称:">
          <el-input v-model="formModel.companyShorName" placeholder="请输入公司简称"></el-input>
        </el-form-item>
      <!-- <el-form-item>
        <div class="register-btn-box">
          <el-button
            size="large"
            type="primary"
            color="rgba(51, 153, 153, 1)"
            @click="goBack()" >
            上一步
          </el-button>
          <el-button
            size="large"
            type="primary"
            color="rgba(51, 153, 153, 1)"
            @click="goNext(formRef)" >
            下一步
          </el-button>
        </div>
      </el-form-item> -->
    </el-form>
    <el-image-viewer v-if="imgViewVisible" @close="imgViewVisible = false" :url-list="[dialogImageUrl]" />
  </div>
</template>

<script setup>
import { ref, unref, reactive, nextTick, onMounted, onDeactivated, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { genFileId, ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
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
    if (formModel.checkPassWord !== '') {
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
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空！'))
  } else if (value !== formModel.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
const router = useRouter()
const store = useUserStore()
// 把解构出来的数据作了ref响应式代理。让数据拥有响应式能力。
const { activeStep } = storeToRefs(store)
// const tabsStore = useTabsStore();
// const keepAliveStore = useKeepAliveStore();
const currentCount = ref(60)
const active = ref(0)
const loading = ref(false)
const isStart = ref(false)
let timerId = null
const formRef = ref()

const upload = ref()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const imgViewVisible = ref(false)
const disabled = ref(false)
// 表单校验规则
const formRules = reactive({
  // businessLicense: [{ required: true, message: "请上传营业执照", trigger: "change" }],
  companyShorName: [{ required: true, message: "请输入公司简称", trigger: "blur" }],
  phoneNumber: [{ required: true, validator: validatePhone, trigger: "blur" }],
  verificationCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  password: [{ required: true, validator: validatePass, trigger: "blur" }],
  checkPassWord: [{ required: true, validator: validatePass2, trigger: "blur" }],
  smsCode: [{ required: true, message: "请输入短信验证码", trigger: "blur" }],
})
// 表单字段
const formModel = reactive({
  countryCode: '',
  componyName: '',
  companyAddress: '',
  registeredCapital: '', // 注册资金
  legalRepresentative: '', // 法人代表
  establishmentTime: '', // 成立时间
  businessScope: '', // 经营范围
  businessLicense: '', // 营业执照
  companyShorName: '', // 公司简称
  phoneNumber: null,
  password: null,
  checkPassWord: null,
  verificationCode: null,
  smsCode: null
})
const fileList = reactive([])
const validateFlag = ref(false)
const formType = ref('componyInfo')
// login
// const login = (formEl) => {
//   if (!formEl) return
//   formEl.validate(async valid => {
//     if (!valid) return
//     loading.value = true
//     try {
//       // 1.执行登录接口
//       const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) })
//       store.setToken(data.access_token)

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
const handleRemove = (file) => {
  console.log(file)
  const index = fileList.indexOf(file)
  console.log(index, '9999')
  fileList.splice(index, 1)
}
const beforeAvatarUpload = (file) => {
  console.log(file, 'beforeAvatarUpload')
}
const handleExceed = (files) => {
  upload.value?.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value?.handleStart(file)

}
const handleUpload = (file) => {
  console.log(file, 'handleUpload')
}
const handleChange = (file) => {
  console.log(file, 'handleChange')
  // if (!file) return
  // const isLt2M = file.size / 1024 / 1024 < 10
  // if (!isLt2M) {
  //   ElMessage({
  //     message: '上传文件大小不能超过 10MB!',
  //     type: 'warning'
  //   });
  //   return false
  // }
}
const handlePictureCardPreview = (file) => {
  console.log(file, 'file---')
  dialogImageUrl.value = file.url
  // dialogVisible.value = true
  imgViewVisible.value = true
}

const handleDownload = (file) => {
  // console.log(file)
  // const blob = new Blob([res.data])
  // const aLink = document.createElement('a')
  // aLink.href = URL.createObjectURL(blob)
  // if (!file.name) {
  //   let name = file.treRoutePath.replace('tops/', '')
  //   aLink.setAttribute('download', name)
  // } else {
  //   aLink.setAttribute('download', file.name)
  // }
  // aLink.click()
}
// 下一步 校验
const validateForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    validateFlag.value = valid
  })
  return {
    validateFlag: validateFlag.value,
    formType,
    formModel
  }
}
// 返回
const goBack = () => {
  store.setShowOrHidden(false)
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
// formRef
defineExpose({
  formRef,
  validateFlag,
  validateForm,
})
</script>

<style scoped lang="scss">
.hx-register-info-step {
  padding-bottom: 40px;
}
</style>

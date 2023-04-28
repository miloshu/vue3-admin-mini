<template>
  <div>
    <p class="bank-info-tips">
      温馨提示：<br/>
      1、注册银行信息填写内容必须与上传开户许可证附件内容保持一致 否则会影响付款业务;<br/>
      2、上传开户许可证必须盖上市公司公章;<br/>
    </p>
    <el-form ref="formRef" :model="formModel" :rules="formRules" size="large" label-width="120px">
      <el-form-item prop="houseHolder" label="户主:">
        <el-input v-model="formModel.houseHolder" clearable></el-input>
      </el-form-item>
      <el-form-item prop="bankAccount" label="银行账号:">
        <el-input v-model="formModel.bankAccount" clearable></el-input>
      </el-form-item>
      <el-form-item prop="registerName" label="银开户行名称:">
        <el-input v-model="formModel.registerName">
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </el-form-item>
      <!-- 选择开户行后带出 -->
      <el-form-item prop="interbankNumber" label="联行号:">
        <el-input v-model="formModel.interbankNumber" disabled></el-input>
      </el-form-item>
      <el-form-item prop="accountType" label="账户类型:">
        <el-select
          style="width: 100%"
          placeholder="请选择企业类型"
          clearable
          no-data-text="暂无数据"
          v-model="formModel.accountType">
          <el-option
            v-for="item in acountTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="accountPermit" label="开户许可证:">
        <el-input v-model="formModel.accountPermit" disabled></el-input>
        <!-- <UploadImg v-model:image-url="formModel.accountPermit" width="135px" height="135px" :file-size="5">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传图片</span>
          </template>
          <template #tip> 头像大小不能超过 5M </template>
        </UploadImg> -->
      </el-form-item>
    </el-form>
    <el-image-viewer v-if="imgViewVisible" @close="imgViewVisible = false" :url-list="[dialogImageUrl]" />
  </div>
</template>

<script setup>
import { ref, unref, reactive, nextTick, onMounted, onDeactivated, onBeforeUnmount } from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import UploadImg from '@/components/Upload/Img.vue'
import { useUserStore } from '@/store/modules/user'
const formRef = ref()
const upload = ref()
const dialogImageUrl = ref('')
const imgViewVisible = ref(false)
const validateFlag = ref(false)

// 表单校验规则
const formRules = reactive({
  houseHolder: [{ required: true, message: "请输入户主", trigger: "change" }],
  bankAccount: [{ required: true, message: "请输入银行账号", trigger: "blur" }],
  registerName: [{ required: true, message: "请输入银开户行名称", trigger: "blur" }],
  interbankNumber: [{ required: true, message: "请输入银联号", trigger: "blur" }],
  accountType: [{ required: true, message: "请选择账户类型", trigger: "blur" }],
  accountPermit: [{ required: true, message: "请上传开户许可证", trigger: "blur" }]
})
// 表单字段
const formModel = reactive({
  houseHolder: null,
  bankAccount: null,
  registerName: null,
  interbankNumber: null,
  accountType: null,
  accountPermit: null
})
const acountTypeOptions = reactive([
  {
    value: '1',
    label: '公有账户',
  },
  {
    value: '2',
    label: '私有账户',
  }
])
const fileList = reactive([])
const formType = ref('bankInfo')


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
  dialogVisible.value = true
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
// 属性方法暴露给父组件
defineExpose({
  formRef,
  validateFlag,
  validateForm,
})
</script>

<style scoped lang="scss">
.bank-info-tips {
  padding-left: 50px;
  padding-bottom: 20px;
  color: red;
}
</style>

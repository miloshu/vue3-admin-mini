<template>
  <div class="register-qualification-info">
    <el-form ref="formRef" :model="formModel" :rules="formRules" size="large" label-width="120px">
      <el-form-item prop="transportRange" label="运输范围:">
        <el-input v-model="formModel.transportRange" clearable></el-input>
      </el-form-item>
      <el-form-item prop="transportLicenseNumber" label="运输许可证号:">
        <el-input v-model="formModel.transportLicenseNumber" clearable></el-input>
      </el-form-item>
      <el-form-item prop="transportLicensing" label="运输许可证:">
        <el-input v-model="formModel.transportLicensing"></el-input>
      </el-form-item>
      <el-form-item prop="validityDate" label="有效期:">
        <el-date-picker
          style="width: 100%"
          class="validity-date-cust"
          v-model="formModel.validityDate"
          type="date"
          placeholder="请选择有效期"
        />
      </el-form-item>
    </el-form>
    <el-image-viewer v-if="imgViewVisible" @close="imgViewVisible = false" :url-list="[dialogImageUrl]" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import UploadImg from '@/components/Upload/Img.vue'
import { useUserStore } from '@/store/modules/user'
const formRef = ref()
const upload = ref()
const dialogImageUrl = ref('')
const imgViewVisible = ref(false)
// 表单校验规则
const formRules = reactive({
  transportRange: [{ required: true, message: "请输入运输范围", trigger: "blur" }],
  transportLicenseNumber: [{ required: true, message: "请输入运输许可证号", trigger: "blur" }],
  transportLicensing: [{ required: true, message: "请上传运输许可证", trigger: "blur" }],
  validityDate: [{ required: true, message: "请选择有效期", trigger: "change" }],
})
// 表单字段
const formModel = reactive({
  transportRange: null,
  transportLicenseNumber: null,
  transportLicensing: null,
  validityDate: null
})

const validateFlag = ref(false)
const formType = ref('qualificationInfo')

const fileList = reactive([])

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

<style scoped lang="scss">
.register-qualification-info {
  padding-left: 50px;
  padding-bottom: 20px;
  color: red;
  &:deep(.validity-date-cust) {
    width: 100% !important;
    .el-input__wrapper {
      width: 94% !important;
    }
  }
}
</style>

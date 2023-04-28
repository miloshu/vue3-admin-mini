import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'

export const useUserStore = defineStore({
  id: 'user-info',
  state:() => ({
    isShowNav: true, // 顶部导航显示与隐藏
    isShowUserInfo: false, // 显示用户信息
    activeStep: 0, // 当前进度条的位置 0-n
    token: '',
    userInfo: {},
    // 注册页企业表单项提交
    registerEnterPriseFormData: {
      componyInfo: {},
      bankInfo: {},
      userInfo: {},
      qualificationInfo: {}
    },
    // 注册页个人表单项提交
    registerPersonalFormData: {

    },
  }),
  getters: {
    // getActiveStep: state => state.activeStep,
    enterPriseFormData: state => state.enterPriseFormData,
    personalFormData: state => state.registerEnterPriseFormData,
    authButtonListGet: state => state.authButtonList,
  },
  actions: {
    // Set Token
    setToken(token) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    // 注册信息模块显示隐藏切换
    setShowOrHidden(state) {
      this.isShowUserInfo = state
    },
    // 设置当前步骤图状态
    setActiveStep (state) {
      console.log(state, 'state')
      this.activeStep = state
    },
    // 设置注册企业表单数据
    setEnterPriseFormData(type, formData) {
      console.log(type, 'type-----')
      this.registerEnterPriseFormData[type] = formData
      console.log(this.registerEnterPriseFormData, '999999---type')
    },
    // 设置注册页个人表单数据
    setPersonalFormData(type, formData) {
      this.registerPersonalFormData[type] = formData
    }
  },
  persist: piniaPersistConfig("carrier-user")
});
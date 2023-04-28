import axios from 'axios'
axios.defaults.baseURL = 'http://27.0.0.1:3000/'
// 请求拦截器
axios.interceptors.request.use(config => {
  return config
})
// 响应拦截器
axios.interceptors.response.use(res => {
  return res
}, err => {
  return promise.reject(err)
})
export default axios


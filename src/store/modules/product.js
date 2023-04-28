import { defineStore } from 'pinia'
import { getLists } from '@/utils/http'

export const productStore = defineStore('product', {
  state:()=> ({
    products: [],
    basketItems: []
  }),
  getters:{
    getCount(state) {
      return state.basketItems.reduce((total,cur) => total + cur.count, 0)
    }
  },
  actions: {
    // 异步请求，返回请求结果
    getData() {
      return new Promise((resolve,reject) => {
        getLists().then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 异步请求，直接赋值state状态
    async getData2() {
      const lists = await getLists().then(res=>res.data.data)
      this.products = lists
    }
  },
  persist:{  // 数据持久化
    enabled: true
  }
})

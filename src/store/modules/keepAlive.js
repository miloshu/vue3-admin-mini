import { defineStore } from "pinia";

export const useKeepAliveStore = defineStore({
  id: "hx-home-keepAlive",
  state: ()=> ({
    keepAliveName: []
  }),
  actions: {
    // Add KeepAliveName
    async addKeepAliveName(name) {
      console.log(name, 'name')
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name)
    },
    // Remove KeepAliveName
    async removeKeepAliveName(name) {
      console.log(name, '2222222')
      this.keepAliveName = this.keepAliveName.filter(item => item !== name)
    },
    // Set KeepAliveName
    async setKeepAliveName(keepAliveName) {
      console.log(keepAliveName, 'keepAliveName')
      this.keepAliveName = keepAliveName
    }
  }
})

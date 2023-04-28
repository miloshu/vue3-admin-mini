import router from "@/router";
import { defineStore } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";

export const useTabsStore = defineStore({
  id: "hx-home-tabs",
  state: ()=> ({
    tabsMenuList: []
  }),
  actions: {
    // Add Tabs
    async addTabs(tabItem) {
      if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
    },
    // Remove Tabs
    async removeTabs(tabPath, isCurrent = true) {
      const tabsMenuList = this.tabsMenuList;
      console.log(tabsMenuList, 'tabsMenuList----')
      console.log(isCurrent, 'isCurrent---')
      if (isCurrent) {
        tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath);
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue) {
      this.tabsMenuList = this.tabsMenuList.filter(item => {
        return item.path === tabsMenuValue || !item.close;
      });
    },
    // Set Tabs
    async setTabs(tabsMenuList) {
      this.tabsMenuList = tabsMenuList;
    },
    // Set Tabs Title
    async setTabsTitle(title) {
      const nowFullPath = location.hash.substring(1);
      this.tabsMenuList.forEach(item => {
        if (item.path == nowFullPath) item.title = title;
      });
    }
  },
  persist: piniaPersistConfig("hx-home-tabs")
})

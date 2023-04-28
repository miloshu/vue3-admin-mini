import { HOME_URL, LOGIN_URL, LAYOUT_URL, DASH_BOARD_URL } from "@/config";

/**
 * staticRouter (静态路由)
 */
export const staticRouter = [
  // {
  //   path:'/',
  //   redirect: HOME_URL, // 重定向
  //   isHidden: true,
  // },
  {
    path: HOME_URL,
    name: 'home',
    isHidden: true,
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: DASH_BOARD_URL,
    name: 'dashboard',
    isHidden: true,
    component: () => import('@/views/dashboard/index.vue'),
  },
  {
    path: LAYOUT_URL,
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    // redirect: DASH_BOARD_URL,
    children: [],
    meta: {
      "icon": "HomeFilled",
      "title": "首页",
      "isLink": "",
      "isHide": false,
      "isFull": false,
      "isAffix": true,
      "isKeepAlive": true
    }
  },
  {
    path: LOGIN_URL,
    name: 'login',
    isHidden: true,
    component: () => import('@/views/user/login/index.vue')
  },
  {
    path: '/user/register',
    name: 'register',
    isHidden: true,
    component: () => import('@/views/user/register/index.vue')
  },
  {
    path: '/user/reset-pwd',
    name: 'reset-pwd',
    isHidden: true,
    component: () => import('@/views/user/reset-pwd/index.vue')
  },
  {
    path: '/info-manage',
    name: 'info-manage',
    meta: {
      tag: '/info-manage/index',
      title: '信息管理'
    },
    component: () => import('@/views/info-manage/index.vue'),
    children: [
      {
        path: '/info-manage/basic-info',
        name: 'basic-info',
        meta: {
          tag: '/basic-info/index',
          title: '我的基本信息'
        },
        component: () => import('@/views/info-manage/basic-info/index.vue')
      },
      // {
      //   path: '/index',
      //   name: 'index',
      //   meta: {
      //     tag: '/info-manage',
      //     title: '合同经办人信息'
      //   },
      //   // component: () => import('@/views/content/info-manage.vue')
      // },
      // {
      //   path: '/detail/:id',
      //   name: 'detail',
      //   component: () => import('../views/content/detail.vue')
      // },
    ]
  }
]

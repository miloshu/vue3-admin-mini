import { createRouter, createWebHashHistory } from 'vue-router'
/**
 * staticRouter (静态路由)
 */
const routes = [
  {
    path:'/',
    redirect:'/home', // 重定向
    isHidden: true,
  },
  {
    path: '/home',
    name: 'home',
    isHidden: true,
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/user/login',
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
        path: 'basic-info/index',
        name: 'basic-info',
        meta: {
          tag: '/basic-info/index',
          title: '我的基本信息'
        },
        // component: () => import('@/views/content/info-manage.vue')
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
  },
]

/**
 * errorRouter (错误页面路由)
 */
// export const errorRouter = [
//   {
//     path: "/404",
//     name: "404",
//     meta: {
//       title: "404页面"
//     },
//     component: () => import("@/views/404.vue")
//   },
//   // Resolve refresh page, route warnings
//   {
//     path: "/:pathMatch(.*)*",
//     component: () => import("@/views/404.vue")
//   }
// ]
const router = createRouter({
  routes,
  history: createWebHashHistory(),
  linkActiveClass: 'active'
})

export default router

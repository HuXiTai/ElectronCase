import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
     path: '/main-win', 
     component: () => import("../views/MainWin/index.vue"),
     children: [
      {
        path: '/main-win/open-main-win', 
        component: () => import("../views/MainWin/OpenChildWin/index.vue"),
      },
      {
        path: '/main-win/user-manage', 
        component: () => import("../views/MainWin/UserManage/index.vue"),
      }
     ], 
  },
  {
     path: '/show-record', 
     component: () => import("../views/ShowRecord/index.vue"),
  },
  {
    path: '/',
    redirect: '/main-win'
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
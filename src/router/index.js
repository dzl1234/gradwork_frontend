// 从 vue-router 中导入创建路由的方法和历史模式工具
import { createRouter, createWebHistory } from "vue-router"
const Main = () => import('../views/main/main.vue');
const Home = () => import('../views/home/home.vue');
const Chat = () => import('../views/chat/chat.vue');
// 懒加载路由组件（提高首屏加载速度）
const VueRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      name: 'main',
      redirect: "/main/home",
      component: Main, // 加载主布局组件 Main.vue
      children: [{
        path: "home",
        name: "home",
        component: Home
      }, {
        path: "chat",
        name: "chat",
        component: Chat
      }]
    }
  ]
})

VueRouter.beforeEach((to, from, next) => {
  let loginFlag = sessionStorage.getItem("isLogin");
  loginFlag = "success";
  if (to.path == '/main/home') {
    next();
  }
  else if (loginFlag != "success") {
    next({
      path: '/main/home'
    })
  }
  next();
})

export default VueRouter;
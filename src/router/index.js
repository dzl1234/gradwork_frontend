import { createRouter, createWebHistory } from "vue-router"
const Main = () => import('../views/main/main.vue');
const Home = () => import('../views/home/home.vue');
const Chat = () => import('../views/chat/chat.vue');

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
      component: Main,
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
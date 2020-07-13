import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)
  const routes = [
    {path:'/',redirect:'/login'},//设置重定向
    {path:'/login', component: Login},
    //在home 中嵌套子路由，welcome在main中显示welcome
    { path:'/home',
      component: Home ,
      redirect:'/welcome',
      children:[
        {path :'/welcome', component:Welcome},
        {path :'/users',component:Users}
      ],
    },


]
const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to 要访问的路径
  //from 从哪个路径跳转而来
  //next 是一个函数，表示放行
  //next()放行。next（’/login‘）强制跳转
  if(to.path === '/login')return next();
  const tokenStr=window.sessionStorage.getItem('token')
  if(!tokenStr)return next('/login')
  next()
})
export default router

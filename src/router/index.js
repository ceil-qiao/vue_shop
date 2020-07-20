import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Right from '../components/power/Right.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import List from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'
import Order from '../components/order/Order.vue'
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
        {path :'/users',component:Users},
        {path :'/rights',component:Right},
        {path :'/roles',component:Roles},
        {path :'/categories',component:Cate},
        {path :'/params',component:Params},
        {path :'/goods',component:List},
        {path :'/goods/add',component:Add},
        {path :'/orders',component:Order}
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

import Vue from 'vue'
import {
    Button,
    Form ,
    FormItem,
    input,
    Message
}from 'element-ui'
//注册为全局可用的组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(input)
//弹窗需要全局挂载,弹窗组件挂载到原型对象，每一个原型组件都可以通过this法昂问$message ,弹窗提示
Vue.prototype.$message = Message
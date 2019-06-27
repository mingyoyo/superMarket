import Vue from 'vue'
import App from './App.vue'
import router from './router'
import local from '@/utils/local'

import echarts from 'echarts'
Vue.prototype.echarts = echarts
//方法一，原生写法
//引入axios
//import axios from 'axios'
//把axios挂载在Vue的原型上
//Vue.prototype.request = axios;  //一般都以$http命名,这里用request命名，更语义化

//方法二：封装后 引入封装的方法  推荐使用
import request from './utils/request'
//把axios挂载在Vue的原型上
Vue.prototype.request=request;

//方法三：将this.request再次封装成一个语义化的函数名，实现了语义化，但是过度封装了。封装的函数放在api里面
// import addadmin from '@/api/addadmin'

//引入element-ui的组件和样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

//在入口文件引入的样式，所有组件都能使用  引入重置样式base.css
import './assets/css/base.css'

//注册vue
Vue.use(ElementUI)

//阻止生成提示
Vue.config.productionTip = false

//路由守卫  拦截所有路由
router.beforeEach((to,from,next) => {
  //to--要进入的目标路由  from--当前导航正要离开的路由  next--是一个函数，调用才能进入下一步
  //获取浏览器中的token
  const token = local.get('bugaosuni');
  if(token){
    //放行
    next();
  }else{
    //如果要去登录页面，放行
    if(to.path === '/login'){
      next();
    }else{  //想去其他页面，直接跳转到登录
      next('/login')
    }
  }

  
})

//创建实例，挂载DOM
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入element-ui的组件和样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

//在入口文件引入的样式，所有组件都能使用  引入重置样式base.css
import './assets/css/base.css'

//注册
Vue.use(ElementUI)

//阻止生成提示
Vue.config.productionTip = false

//创建实例，挂载DOM
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

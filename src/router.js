import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//导出路由实例对象
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login',
    },
    //登录
    {
      path: '/login',
      component: () => import('./views/Login/Login.vue')
    },
    //后台主界面
    {
      path: '/home',
      redirect:'/home/systeminfo',  //默认显示的一个儿子
      component: () => import('./views/Home/Home.vue'),
      children: [
        //系统信息组件
        {
          path: '/home/systeminfo',
          component: () => import('./views/SystemInfo/SystemInfo.vue'),
        },
        //个人中心
        {
          path:'/home/personalinfo',
          component:() => import('./views/personalInfo/personalInfo.vue')
        },
        //添加管理员
        {
          path: '/home/addadmin',
          component: () => import('./views/AddAdmin/AddAdmin.vue'),
        },
        //管理员账号
        {
          path: '/home/adminaccount',
          component: () => import('./views/AdminAccount/AdminAccount.vue'),
        },
        //密码修改
        {
          path: '/home/passwordmodify',
          component: () => import('./views/PasswordModify/PasswordModify.vue'),
        },
        //商品添加
        {
          path: '/home/goodsadd',
          component: () => import('./views/GoodsAdd/GoodsAdd.vue'),
        },
        //商品管理
        {
          path: '/home/goodsmanage',
          component: () => import('./views/GoodsManage/GoodsManage.vue'),
        },
        //销售统计
        {
          path: '/home/salestotal',
          component: () => import('./views/SalesTotal/SalesTotal.vue'),
        },
        //进货统计
        {
          path: '/home/stocktotal',
          component: () => import('./views/StockTotal/StockTotal.vue'),
        },
        //库存管理
        {
          path: '/home/inventorymanage',
          component: () => import('./views/InventoryManage/InventoryManage.vue'),
        },
        //添加库存
        {
          path: '/home/addinventory',
          component: () => import('./views/AddInventory/AddInventory.vue'),
        },
        //销售列表
        {
          path: '/home/saleslist',
          component: () => import('./views/SalesList/SalesList.vue'),
        },
        //商品出库
        {
          path: '/home/goodsout',
          component: () => import('./views/GoodsOut/GoodsOut.vue'),
        },
        //商品退货
        {
          path: '/home/goodsreturn',
          component: () => import('./views/GoodsReturn/GoodsReturn.vue'),
        },
        //会员管理
        {
          path: '/home/membermanage',
          component: () => import('./views/MemberManage/MemberManage.vue'),
        },
        //添加会员
        {
          path: '/home/addmember',
          component: () => import('./views/AddMember/AddMember.vue'),
        }
      ]
    }
  ]
})

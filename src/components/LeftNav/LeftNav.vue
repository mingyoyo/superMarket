<template>
  <div class="left-nav">
    <el-menu
      :default-active="$router.path"
      class="el-menu-vertical-demo"
      background-color="#87cfd5"
      text-color="#fff"
      active-text-color="#409EFF!important"
      unique-opened
      router
    >
      <!-- unique-opened，是否值保持一个子菜单的展开，布尔值  -->
      <!-- router  是否使用vue-router的模式，启用该模式激活导航时会以index作为path进行路由跳转 -->

      <!-- 左侧内容 -->
      <el-submenu :index=" (index+1)+ '' " v-for="(menu,index) in menus" :key = "index">
        <!-- 图标和标题 -->
        <template slot="title">
          <i :class="menu.iconClass"></i>
          <span>{{ menu.title }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="submenu.path" v-for="(submenu,index) in menu.children" :key='index'>{{submenu.subTitle}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        //系统管理
        {
          iconClass: "el-icon-menu",
          title: "系统管理",
          children: [
            //二级菜单
            { path: "/home/systeminfo", subTitle: "系统信息" }
          ]
        },
        //账号管理
        {
          iconClass: "el-icon-document",
          title: "账号管理",
          children: [
            //二级菜单
            { path: "/home/adminaccount", subTitle: "管理员账号" },
            { path: "/home/addadmin", subTitle: "添加管理员" },
            { path: "/home/passwordmodify", subTitle: "密码修改" }
          ]
        },
        //商品管理
        {
          iconClass: "el-icon-goods",
          title: "商品管理",
          children: [
            //二级菜单
            { path: "/home/goodsmanage", subTitle: "商品管理" },
            { path: "/home/goodsadd", subTitle: "添加商品" }
          ]
        },
        //统计管理
        {
          iconClass: "el-icon-edit-outline",
          title: "统计管理",
          children: [
            //二级菜单
            { path: "/home/salestotal", subTitle: "销售统计" },
            { path: "/home/stocktotal", subTitle: "进货统计" }
          ]
        },
        //进货管理
        {
          iconClass: "el-icon-download",
          title: "进货管理",
          children: [
            //二级菜单
            { path: "/home/inventorymanage", subTitle: "库存管理" },
            { path: "/home/addinventory", subTitle: "添加库存" }
          ]
        },
        //出货管理
        {
          iconClass: "el-icon-upload2",
          title: "出货管理",
          children: [
            //二级菜单
            { path: "/home/saleslist", subTitle: "销售列表" },
            { path: "/home/goodsout", subTitle: "商品出库" },
            { path: "/home/goodsreturn", subTitle: "商品退货" }
          ]
        },
        //会员管理
        {
          iconClass: "el-icon-tickets",
          title: "会员管理",
          children: [
            //二级菜单
            { path: "/home/membermanage", subTitle: "会员管理" },
            { path: "/home/addmember", subTitle: "添加会员" }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="less">
@import "./leftnav.less";
</style>

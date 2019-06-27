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
      <el-submenu :index=" (index+1)+ '' " v-for="(menu,index) in menus" :key="index">
        <!-- 图标和标题 -->
        <template slot="title">
          <i :class="menu.iconClass"></i>
          <span>{{ menu.title }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="submenu.path"
          v-for="(submenu,index) in menu.children"
          :key="index"
        >{{submenu.subTitle}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  methods: {
    getMenus() {
      this.request
        .get("/account/menus")
        .then(res => {
          // 接收后端响应的菜单
          this.menus = res.accessMenu;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 调用请求 请求菜单数据
    this.getMenus();
  }
};
</script>
<style lang="less">
@import "./leftnav.less";
</style>

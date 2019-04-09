<template>
  <div class="top">
    <el-row :gutter="20">
      <el-col :span="20">
        <h3>
          <span class="el-icon-menu"></span>华联超市管理系统
        </h3>
      </el-col>
      <!-- 头像和名字 -->
      <el-col :span="4">
        <el-row :gutter="20">
          <el-col :span="8">
            <img class="avatar" src="./eeee.jpg" alt>
          </el-col>
          <el-col :span="16">
              <!-- 下拉菜单 -->
            <el-dropdown>
              <span class="el-dropdown-link">
                李寻欢
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >个人中心</el-dropdown-item>
                <el-dropdown-item >退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
@import "./top.less";
</style>

<template>
  <div class="top">
    <el-row :gutter="20">
      <el-col :span="20">
        <h3>
          <span class="el-icon-menu"></span>华联超市管理系统
        </h3>
      </el-col>
      <!-- 右侧头像和当前登录用户账号名 -->
      <el-col :span="4">
        <el-row>
          <el-col :span="8">
            <!-- 头像 -->
            <div class="avatar">
              <img width="100%" height="100%" :src="imgUrl" alt>
            </div>
          </el-col>
          <el-col :span="16">
            <!-- 登录账号名 -->
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ account }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//引入local
import local from "@/utils/local";
export default {
  data() {
    return {
      account: "",
      imgUrl: ""
    };
  },
  methods: {
    //点击下拉菜单的菜单项触发的函数
    handleCommand(command) {
      //console.log(command)  点击个人中心打印personal，点击退出登录打印logout
      this.$router.push("/home/personalinfo");
      if (command === "perdonal") {
        console.log("点击个人中心");
      } else if (command === "logout") {
        //清除loken
        local.remove("bugaosuni");

        //退出提示
        this.$message({
          type: "success",
          message: "退出成功"
        });
        setTimeout(() => {
          //跳转到登录页
          this.$router.push("/login");
        }, 1000);
      }
    },
    //获取当前登录账号信息
    getUserInfo() {
      this.request
        .get("/account/personalinfo")
        .then(res => {
          let { account, img_url } = res[0];
          this.account = account;
          this.imgUrl = `http://127.0.0.1:888/${img_url}`;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>
<style lang="less">
@import "./top.less";
</style>

<template>
  <div class="home">
    <el-container>
      <el-aside width="200px"><!-- 左侧 -->
        <LeftNav></LeftNav>
      </el-aside>

<!-- 右侧 -->
      <el-container>
        <!-- 头 -->
        <el-header>
            <Top ref="top"></Top>
        </el-header>
        <!-- 中 -->
        <el-main>          
          <!-- 路由出口 -->
          <router-view @A="B"></router-view>
        </el-main>
        <!-- 尾 -->
        <el-footer>
            <Buttom></Buttom>
        </el-footer>
        
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入左侧导航组件
import LeftNav from "@/components/LeftNav/LeftNav.vue";
import Top from "@/components/Top/Top.vue";
import Buttom from "@/components/Buttom/Buttom.vue";
export default {
  //注册组件
  components: {
    LeftNav: LeftNav,
    Top,
    Buttom
  },
  methods:{
    B(){
      this.$refs.top.getUserInfo()
    }
  }
};
</script>
<style lang="less">
@import "./home.less";
</style>


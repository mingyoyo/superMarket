<template>
  <div class="login">
    <div class="login-wrap">
      <!-- 标题 -->
      <div class="title">
        <span class="el-icon-menu"></span>
        华联超市管理系统
      </div>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 页面中使用ref声明的dom都会一起被收集在this.$refs这个对象里面。此处打印 this.$refs 的结果为一个对象，键名是loginForm,键值是el-form这一整个dom-->
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
          <!-- v-model的值要和prop的一致 -->
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//引入验证密码的函数
import { passwordReg } from "@/utils/validator"; //export暴露的需要用解构的方式引入
//import passwordReg from '@/utils/validator'    //export defalut暴露的不需要用解构的方式引入

//引入local
import local from "@/utils/local";

export default {
  data() {
    //验证规则引用的函数写在return之前
    //确认密码的自定义验证函数
    const comfirmPassword = (rule, value, callback) => {
      //rule--验证规则对象，value--用户输入的值，callback--回调函数
      if (value == "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.loginForm.password) {
        //如果用户输入的确认密码值不等于密码的值
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    }; //这里不能加逗号
    //密码的自定义验证函数
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("密码长度在3-6位之间"));
      } else if (!passwordReg(value)) {
        //如果passwordReg返回的为false
        callback(new Error("密码必须包含数字和字母组合"));
      } else {
        if (this.loginForm.checkPass) {
          //当确认密码框不为空的时候，触发一次性验证
          //这个el-form表单          触发        某个字段的验证
          this.$refs.loginForm.validateField("checkPass"); //这里需要触发一致性验证
        }
        callback();
      }
    };
    return {
      //表单数据
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      //验证规则
      rules: {
        //内置的两个验证规则  非空和长度验证
        account: [
          { required: true, message: "用户名不能为空", trigger: "blur" }, //非空验证
          {
            min: 3,
            max: 6,
            message: "账号长度需要在3-6位之间",
            trigger: "blur"
          } //长度验证
        ],
        //自定义验证规则
        password: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: comfirmPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {   //登录  validate()方法
      this.$refs.loginForm.validate((valid) => {
        //如果所有前端验证都通过，valid就是true，否则就是false
        if(valid){
          let params = {       //把数据用变量保存起来
            account:this.loginForm.account,
            password:this.loginForm.password
          }
          //将用户名和密码发送给后端，验证是否存在
          this.request.post('/login/checklogin',params)
            .then(res => {
              let {code,reason,token} = res;
              if(code === 0){
                //把token存入浏览器
                local.save('bugaosuni',token)
                this.$message({
                  type:'success',
                  message:reason
                })
                this.$router.push('/home/systeminfo')
              }else if(code === 1){
                this.$message.error(reason)
              }
            })
            .catch(err =>{
              console.log(err)
            })
        }else{
          console.log('前端验证不通过，不允许提交！')
          return;   //结束
        }
      })
    },
    resetForm() {  //重置  只需要调用表单的重置方法resetFields()
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>
<style lang="less">
//引入样式
@import url("./login.less");
</style>


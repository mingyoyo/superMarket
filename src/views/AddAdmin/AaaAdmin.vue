<template>
  <div class="add-admin">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>添加管理员账号</span>
      </div>
      <!-- 内容 从登陆组件复制的-->
      <div>
        <el-form
          :model="accountAddForm"
          status-icon
          :rules="rules"
          ref="accountAddForm"
          label-width="100px"
          class="demo-ruleForm"
          size="small"
          style="width:350px;"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="accountAddForm.account" autocomplete="off"></el-input>
            <!-- v-model的值要和prop的一致 -->
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="accountAddForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 选择用户组 -->
          <el-form-item label="选择用户组" prop="uesrGroup">
            <el-select v-model="accountAddForm.uesrGroup" placeholder="请选择用户组" style="width:250px;">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm()">添加</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入正则工具函数
import {passwordReg} from '@/utils/validator'
export default {
  data() {
    //自定义验证密码函数
    const checkPassword = (rule,value,callback) => {
      if(value === ''){
        callback(new Error('密码不能为空'))
      }else if(!passwordReg(value)){
        callback(new Error('密码需要数字和字母组合'))
      }else{
        if(this.accountAddForm.checkPass){
          //当确认密码框不为空时，触发某个字段的一致性验证
          this.$refs.accountAddForm.validateField('checkPass')
        }
        callback();
      }
    }
    //自定义验证确认密码函数
    const confirmPassword = (rule,value,callback) => {
      if(value === ''){
        callback(new Error('确认密码不能为空'))
      }else if(value !== this.accountAddForm.password){
        callback(new Error('两次输入密码不一致'))
      }else{
        callback()
      }
    }
    return {
      //账号添加表单数据
      accountAddForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      //验证规则
      rules: {
        //账号
        account:[
          {required:true,message:'账号不能为空',trigger:'blur'},
          {min:3,max:6,message:'账号长度在3-6位之间',trigger:'blur'}
        ],
        //密码
        password:[
          {required:true,validator:checkPassword,trigger:'blur'}
        ],
        //确认密码
        checkPass:[
          {required:true,validator:confirmPassword,trigger:'blur'}
        ],
        //选择用户组
        userGroup:[
          {required:true,message:'请选择用户组',trigger:'change'}
        ]
      }
    };
  },
  methods:{
    //登录
    submitForm(){    //调用表单的validate()方法
      this.$refs.accountAddForm.validate(valid => {
        //如果所有前端验证都通过，valid就是true，否则就是false
        if(valid){  //如果valid=true
          let params = {  //将数据用变量保存起来,提交给后台
            account:this.accountAddForm.account,
            password:this.accountAddForm.password,
            uesrGroup:this.accountAddForm.userGroup
          }
          //后台验证，假如成功，就跳转到管理员账号管理页面
          alert('添加成功')
          this.$router.push('/home/adminaccount') 
        }else{
          alert('前端验证失败，不允许添加')
        }
      })
      
    },
    resetForm () {
      this.$refs.accountAddForm.resetFields();
    }
  }
};
</script>
<style lang="less">
@import "./addadmin.less";
</style>


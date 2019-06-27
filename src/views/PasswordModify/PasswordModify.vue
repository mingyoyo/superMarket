<template>
  <div class="password-modify">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div class="text item">
        <el-form
          :model="modifyPassword"
          status-icon
          :rules="rules"
          ref="modifyPassword"
          label-width="100px"
          class="demo-ruleForm"
          size="small"
          style="width:350px;"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="text" v-model="modifyPassword.oldPassword" autocomplete="off"></el-input>
            <!-- v-model的值要和prop的一致 -->
          </el-form-item>

          <!-- 密码 -->
          <el-form-item label="密码" prop="newPassword">
            <el-input type="password" v-model="modifyPassword.newPassword" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 确认密码 -->
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="modifyPassword.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="modifyForm()">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入检测密码的正则函数
import {passwordReg} from '@/utils/validator.js'
//引入local
import local from '@/utils/local.js'
export default {
  data () {
    //自定义原密码验证函数
    const checkOldPasssword = (rule,value,callback) => {
      let params = {
        oldPassword:value
      }
      this.request.get('/account/editpassword',params)
        .then(res => {
          let {code,reason} = res;
          if(code === 0){
            callback()
          }else if(code === 1){
            callback(new Error(reason));
          }
        })
        .catch(err => {
          console.loe(err)
        })
    }
    //自定义新密码验证函数
    const checkNewPasssword = (rule,value,callback) => {
      if(value === ''){
        callback(new Error('新密码不能为空'))
      }else if(value.length <3 || value.length>6){
        callback(new Error('密码需在3-6位之间'))
      }else if(!passwordReg(value)){
        callback(new Error('新密码必须同时包含数字和字母'))
      }else{
        if(this.modifyPassword.checkPass){
          this.$refs.modifyPassword.validateField('checkPass')
        }
        callback()
      }
    }
    //自定义确认密码验证函数
    const checkConfirmPasssword = (rule,value,callback) => {
      if(value === ''){
        callback(new Error('确认密码不能为空'))
      }else if(value !== this.modifyPassword.newPassword){
        callback(new Error('两次输入密码不一致'))
      }else{
        callback()
      }
    }
    return{
      modifyPassword:{    //表单数据
        oldPassword:'',newPassword:'',checkPass:''
      },
      rules:{         //表单验证规则
        oldPassword:[     //原密码
          {required:true,validator:checkOldPasssword,trigger:'blur'}
        ],
        newPassword:[  //新密码
          {required:true,validator:checkNewPasssword,trigger:'blur'}
        ],
        checkPass:[   //确认密码
          {required:true,validator:checkConfirmPasssword,trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    //确认修改函数
    modifyForm(){
      let params = {
        newPassword:this.modifyPassword.newPassword
      }
      this.request.post('/account/confirmpassword',params)
        .then(res => {
          console.log(res)
          let {code,reason} = res;
          if(code === 0){
            this.$message({
              type:'success',
              message:reason
            })
          }else if(code ===1){
            this.$message.error(reason)
          }
          //删除token
          local.remove('bugaosuni')
          //跳转到登录页面
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
};
</script>
<style lang="less">
@import "./passwordmodify.less";
</style>


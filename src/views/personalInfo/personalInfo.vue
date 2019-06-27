<template>
  <div class="stock-total">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <div class="text item">
        <!-- 头像 -->
        <div style="margin-bottom:20px;">
          <el-upload
            class="avatar-uploader"
            action="hahahahaha"
            :http-request="upLoad"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <!-- 个人信息 -->
        <div class="info">
          <p>ID：{{personalInfo.id}}</p>
          <p>账号：{{personalInfo.account}}</p>
          <p>用户组：{{personalInfo.user_group}}</p>
          <p>创建时间：{{personalInfo.create_date | filterDate}}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
//引入时间处理模块
import moment from "moment";
//引入axios  不能用封装的，因为上传的值是二进制的
import axios from "axios";

export default {
  data() {
    return {
      personalInfo: {},
      imageUrl: ""
    };
  },
  methods: {
    //请求用户信息函数
    getAccountInfo() {
      this.request
        .get("/account/personalinfo")
        .then(res => {
          this.personalInfo = res[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    //头像上传成功回调
    /* handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    }, */
    //头像上传之前回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //自定义上传函数
    upLoad(file){
        //console.log(file.file)
        //创建一个formData对象 window自带的对象，专门用来上传的
        let formData = new FormData()
        //把文件数据放入formData中
        formData.append('file',file.file)
        axios.post('/account/uploadavatar',formData,{
            //表单上传文件的时候enctype的值需要设置，不能再使用默认的
            headers:{'Content-Type':'multipart/form-data'}
        })
        .then(response => {
            let {code,reason,path} = response.data;
             if (code === 0) {
                  this.$message({
                      type: 'success',
                      message: reason
                  })
                 // 回填头像
                 this.imageUrl = `http://127.0.0.1:888${path}`; 

                //  触发父组件方法
                this.$emit('A')
                
              } else if (code === 1) {
                  this.$message.error(reason)
              }
        })
        .catch(err => {
            console.log(err)
        })
    }
  },
  created() {
    this.getAccountInfo();
  },
  filters: {
    filterDate(Val) {
      return moment(Val).format("YYYY/MM/DD hh:mm:ss");
    }
  }
};
</script>
<style lang="less">
.el-card {
  .el-card__header {
    font-size: 20px;
    font-weight: bold;
    color: #6f6f6f;
  }
  .el-card__body {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>


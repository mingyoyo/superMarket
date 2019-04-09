<template>
  <div class="add-member">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>添加会员账号</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <div>
          <el-form
            :model="addMemberForm"
            status-icon
            :rules="rules"
            ref="addMemberForm"
            label-width="100px"
            class="demo-ruleForm"
            size="small"
            style="width:350px;"
          >
            <!-- 真实名字 -->
            <el-form-item label="真实名字：" prop="realName">
              <el-input type="text" v-model="addMemberForm.realName" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 会员卡卡号 -->
            <el-form-item label="会员卡号：" prop="memberCardNumber">
              <el-input type="text" v-model="addMemberForm.memberCardNumber" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 用户组 -->
            <el-form-item label="用户组：" prop="userGroup">
              <el-select v-model="addMemberForm.userGroup" placeholder="请选择用户组">
                <el-option label="普通会员99%" value="1"></el-option>
                <el-option label="铁牌会员0.5%" value="2"></el-option>
                <el-option label="铜牌会员0.4%" value="3"></el-option>
                <el-option label="金牌会员0.1%" value="4"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="用户组：" prop="userGroup">
              <el-select v-model="addMemberForm.userGroup.value" clearable>
                <el-option
                  v-for="item in addMemberForm.userGroup"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <!-- 身份证号 -->
            <el-form-item label="身份证号：" prop="idNumber">
              <el-input type="text" v-model="addMemberForm.idNumber" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 用户状态 -->
            <el-form-item label="用户状态" prop="userStatus">
              <el-radio v-model="addMemberForm.radio" label="2">启用</el-radio>
              <el-radio v-model="addMemberForm.radio" label="1">禁用</el-radio>
            </el-form-item>
            <!-- 手机号码 -->
            <el-form-item label="手机号码：" prop="cellphone">
              <el-input type="text" v-model="addMemberForm.cellphone" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 座机号码 -->
            <el-form-item label="座机号码：" prop="seatNumber">
              <el-input type="text" v-model="addMemberForm.seatNumber" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 邮箱地址 -->
            <el-form-item label="邮箱地址：" prop="email">
              <el-input type="text" v-model="addMemberForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 地区选择 -->
            <!-- 详细地址 -->
            <el-form-item label="详细地址：" prop="address">
              <el-input type="text" v-model="addMemberForm.address" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 邮政编码 -->
            <el-form-item label="邮政编码：" prop="postalCode">
              <el-input type="text" v-model="addMemberForm.postalCode" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm()">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addMemberForm: {
        realName: "",
        memberCardNumber: "",
        idNumber: "",
        radio: "1",
        cellphone: "",
        seatNumber: "",
        email: "",
        address: "",
        postalCode: "",
        userGroup: ''
      },
      //验证规则
      rules: {
        realName: [
          { required: true, message: "真是名字不能为空", trigger: "blur" }
        ],
        memberCardNumber: [
          { required: true, message: "会员卡卡号不能为空", trigger: "blur" }
        ],
        userGroup: [
          { required: true, message: "用户组不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm() {}
  }
};
</script>
<style lang="less">
@import "./addmember.less";
</style>


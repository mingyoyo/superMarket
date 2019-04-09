<template>
  <div class="add-inventory">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加库存</span>
      </div>
      <div class="text item">
        <el-form
            :model="inventoryAddForm"
            status-icon
            :rules="rules"
            ref="goodsAddForm"
            label-width="100px"
            class="demo-ruleForm"
            size="small"
            style="width:350px;"
          >
            <!-- 商品条形码 -->
            <el-form-item label="条形码：" prop="barCode">
              <el-input type="text" v-model="inventoryAddForm.barCode" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 数量 -->
            <el-form-item label="数量：" prop="number">
              <el-input type="text" v-model="inventoryAddForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 进价 -->
            <el-form-item label="进价：" prop="bid">
              <el-input type="text" v-model="inventoryAddForm.bid" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm()">入库</el-button>
            </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      inventoryAddForm:{
        barCode:'',
        number:'',
        bid:''
      },
      rules:{
        barCode:[
          {required:true,message:'条形码不能为空',trigger:'blur'}
        ],
        number:[
          {required:true,message:'数量不能为空',trigger:'blur'}
        ],
        bid:[
          {required:true,message:'进价不能为空',trigger:'blur'}
        ],
      }
    }
  },
  methods:{
    submitForm(){
      
    }
  }
};
</script>
<style lang="less">
@import "./addinventory.less";
</style>


<template>
  <div class="goods-out">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品销售</span>
      </div>
      <div class="text item">
        <div class="head">
          <el-form
            :model="salesGoodsForm"
            status-icon
            :rules="rules"
            ref="salesGoodsForm"
            label-width="100px"
            class="demo-ruleForm"
            size="small"
            style="width:350px;"
          >
            <!-- 商品条形码 -->
            <el-form-item label="条形码：" prop="barCode">
              <el-input type="text" v-model="salesGoodsForm.barCode" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 数量 -->
            <el-form-item label="数量：" prop="number">
              <el-input type="text" v-model="salesGoodsForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm()">加入订单</el-button>
              <el-button @click="reOutStock()">重新出库</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 表格 -->
        <div class="salesTable">
          <el-table :data="goodsOutTable" stripe style="width: 100%">
           
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="number" label="数量"></el-table-column>
            <el-table-column prop="unitPrice" label="单价（元）"></el-table-column>
            <el-table-column prop="totalPrice" label="总价（元）"></el-table-column>
            <el-table-column prop="discountTotalPrice" label="优惠总价（元）"></el-table-column>
          </el-table>
        </div>
        <!-- 会员卡号 -->
        <div class="foot">
          <el-form
            size="small"
            style="width:350px;"
          >
            <!-- 会员卡号 -->
            <el-form-item label="会员卡号：" prop="memberCardNumber">
              <el-input type="text" v-model="memberCardNumber" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="confirmSubmit()">确认提交</el-button>
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
      salesGoodsForm: {
        barCode: "",
        number: ""
      },
      rules: {
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        number: [{ required: true, message: "数量不能为空", trigger: "blur" }]
      },
      goodsOutTable: [
        {
          name: "",
          number: "",
          unitPrice: "",
          totalPrice: "",
          discountTotalPrice: ""
        }
      ],
      memberCardNumber:''
    };
  },
  methods: {
    submitForm() {},
    reOutStock() {},
    confirmSubmit(){}
  }
};
</script>
<style lang="less">
@import "./goodsout.less";
</style>


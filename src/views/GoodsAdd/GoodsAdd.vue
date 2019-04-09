<template>
  <div class="goods-add">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>商品添加</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <div>
          <el-form
            :model="goodsAddForm"
            status-icon
            :rules="rules"
            ref="goodsAddForm"
            label-width="100px"
            class="demo-ruleForm"
            size="small"
            style="width:350px;"
          >
            <el-form-item label="所属分类：" prop="classification">
              <el-select v-model="goodsAddForm.classification.value" placeholder="-----选择分类-----">
                <el-option
                  v-for="item in goodsAddForm.classification"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 商品条形码 -->
            <el-form-item label="条形码：" prop="barCode">
              <el-input type="text" v-model="goodsAddForm.barCode" autocomplete="off"></el-input>
              <el-button type="primary" @click="submitForm()">生成条形码</el-button>
            </el-form-item>
            <!-- 商品名称 -->
            <el-form-item label="商品名称：" prop="name">
              <el-input type="text" v-model="goodsAddForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 商品售价 -->
            <el-form-item label="商品售价：" prop="price">
              <el-input type="text" v-model="goodsAddForm.price" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 市场价 -->
            <el-form-item label="市场价：" prop="marketPrice">
              <el-input type="text" v-model="goodsAddForm.marketPrice" autocomplete="off"></el-input>
              <span style="font-size:12px;color:#999">默认市场价为售价的1.2倍</span>
            </el-form-item>
            <!-- 商品进价 -->
            <el-form-item label="商品进价：" prop="bid">
              <el-input type="text" v-model="goodsAddForm.bid" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 入库数量 -->
            <el-form-item label="入库数量：" prop="joinNumber">
              <el-input type="text" v-model="goodsAddForm.joinNumber" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 商品重量 -->
            <el-form-item label="商品重量：" prop="weight">
              <el-input type="text" v-model="goodsAddForm.weight" autocomplete="off"></el-input>
              <span style="font-size:12px;color:#999">记录商品单位为千克</span>
            </el-form-item>
            <!-- 商品单位 -->
            <el-form-item label="商品单位：" prop="unit">
              <el-input type="text" v-model="goodsAddForm.unit" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 会员优惠 -->
            <el-form-item label="会员优惠：" prop="enjoyDiscount">
              <el-radio v-model="goodsAddForm.radio1" label="1">享受</el-radio>
              <el-radio v-model="goodsAddForm.radio1" label="2">不享受</el-radio>
            </el-form-item>
            <!-- 是否促销 -->
            <el-form-item label="是否促销" prop="promotion">
              <el-radio v-model="goodsAddForm.radio2" label="1">启用</el-radio>
              <el-radio v-model="goodsAddForm.radio2" label="2">禁用</el-radio>
            </el-form-item>
            <!-- 商品简介 -->
            <el-form-item label="商品简介" prop="promotion">
              <el-input type="textarea" :rows="2" v-model="goodsAddForm.promotion"></el-input>
              <span style="font-size:12px;color:#999">不超过200个汉字</span>
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
      goodsAddForm: {
        classification: [
          {
            value: "选项1",
            label: "樱花酒"
          },
          {
            value: "选项2",
            label: "梅子酒"
          },
          {
            value: "选项3",
            label: "米酒"
          },
          {
            value: "选项4",
            label: "果酒"
          }
        ],
        barCode: "",
        name: "",
        price: "",
        marketPrice: "",
        bid: "",
        joinNumber: "",
        weight: "",
        unit: "",
        radio1: "1",
        radio2: "1",
        promotion: ""
      },
      //验证规则
      rules: {
        //选择分类
        classification: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ],
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        price: [
          { required: true, message: "售价不能为空", trigger: "blur" }
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
@import "./goodsadd.less";
</style>


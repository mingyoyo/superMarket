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
            <!-- 选择分类 -->
            <el-form-item label="所属分类：" prop="classification">
              <el-select
                v-model="goodsAddForm.classification"
                placeholder="-----选择分类-----"
                style="width:250px;"
              >
                <el-option label="樱花酒" value="樱花酒"></el-option>
                <el-option label="梅子酒" value="梅子酒"></el-option>
                <el-option label="米酒" value="米酒"></el-option>
                <el-option label="果酒" value="果酒"></el-option>
              </el-select>
            </el-form-item>
            <!-- 商品条形码 -->
            <el-form-item label="条形码：" prop="barCode" style="width:500px">
              <el-input
                type="text"
                v-model="goodsAddForm.barCode"
                autocomplete="off"
                :inline="true"
                style="width:250px;margin-right:20px;"
              ></el-input>
              <el-button type="primary" @click="getcode">生成条形码</el-button>
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
            <el-form-item label="会员优惠：" prop="vipDiscount">
              <el-radio v-model="goodsAddForm.vipDiscount" label="享受">享受</el-radio>
              <el-radio v-model="goodsAddForm.vipDiscount" label="不享受">不享受</el-radio>
            </el-form-item>
            <!-- 是否促销 -->
            <el-form-item label="是否促销" prop="promotion">
              <el-radio v-model="goodsAddForm.promotion" label="启用">启用</el-radio>
              <el-radio v-model="goodsAddForm.promotion" label="禁用">禁用</el-radio>
            </el-form-item>
            <!-- 商品简介 -->
            <el-form-item label="商品简介" prop="introduce">
              <el-input type="textarea" :rows="2" v-model="goodsAddForm.introduce"></el-input>
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
        classification:'',
        barCode: "",
        name: "",
        price: null,
        marketPrice:null,
        bid: null,
        joinNumber:null,
        weight: "",
        unit: "",
        vipDiscount: "享受",
        promotion: "禁用",
        introduce: ""
      },
      //验证规则
      rules: {
        //选择分类
        classification: [
          { required: true, message: "请选择商品类别", trigger: "change" }
        ],
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        price: [{ required: true, message: "售价不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.goodsAddForm.validate((valid) => {
        if(valid){
          let params = {  //用变量保存用户填写的数据
            classification:this.goodsAddForm.classification,
            barCode:this.goodsAddForm.barCode,
            name:this.goodsAddForm.name,
            price:this.goodsAddForm.price,
            marketPrice:this.goodsAddForm.marketPrice,
            bid:this.goodsAddForm.bid,
            joinNumber:this.goodsAddForm.joinNumber,
            weight:this.goodsAddForm.weight,
            unit:this.goodsAddForm.unit,
            vipDiscount:this.goodsAddForm.radio1,
            promotion:this.goodsAddForm.radio2,
            introduce:this.goodsAddForm.promotion,
          }
          //发送axios请求，把数据发送给后端
          this.request.post('/goods/goodsadd',params)
            .then(res => {
              let {code,reason} = res;
              if(code === 0) {
                this.$message({
                  type:'success',
                  message:reason
                })
                this.$router.push('/home/goodsmanage')
              }else if(code === 1){
                this.$message.error(reason)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }else{
          alert('填写格式不正确，不允许添加')
        }
      })
    },
    getcode(){
      this.goodsAddForm.barCode =parseInt(100000000*Math.random()) 
    }
  }
};
</script>
<style lang="less">
@import "./goodsadd.less";
</style>


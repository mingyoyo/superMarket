<template>
  <div class="system-info">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <div class="text item">
        <!-- 提示信息 -->
        <el-alert title="商品总数：5，已经销售的总金额：800.00，库存商品总价为：2000.00。" type="info" show-icon></el-alert>
        <br>
        <el-alert title="导入数据" type="info" show-icon :closable="false"></el-alert>
        <!-- 销售排行和缺货商品 -->
        <el-row :gutter="30" style="margin-top:20px">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>销售排行</span>
                </div>
                <div class="text item">
                  <el-table :data="salesRanking" stripe style="width: 100%">
                    <el-table-column prop="name" label="商品名称"></el-table-column>
                    <el-table-column prop="number" label="销量"></el-table-column>
                  </el-table>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>缺货的商品</span>
                </div>
                <div class="text item">
                  <el-table :data="shortage" stripe style="width: 100%">
                    <el-table-column prop="name" label="商品名称"></el-table-column>
                    <el-table-column prop="stock" label="库存"></el-table-column>
                    <el-table-column label="操作">
                      <template>
                        <el-button size="mini">入库</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salesRanking: [
        { name: "米酒", number: 30 },
        { name: "果酒", number: 15 },
        { name: "梅子酒", number: 8 },
        { name: "果酒2", number: 6 }
      ],
      shortage: [
        { name: "樱花酒", stock: 0 }
        ]
    };
  }
};
</script>
<style lang="less">
@import "./systeminfo.less";
</style>


<template>
  <div class="goods-manage">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!-- 头部 -->
        <div class="head">
          <el-select v-model="value" placeholder="-----选择分类-----">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>关键字：
          <el-input type="text" class="query"></el-input>（商品名称，条形码）
          <el-button size="small" type="primary">查询</el-button>
        </div>
        <!-- 商品表格 -->
        <el-table :data="goodstable" stripe style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="barCode" label="商品条形码"></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="classification" label="所属分类"></el-table-column>
          <el-table-column prop="price" label="售价"></el-table-column>
          <el-table-column prop="stock" label="库存"></el-table-column>
          <el-table-column prop="stockTotal" label="库存总额（元）"></el-table-column>
          <el-table-column prop="salesTotal" label="销售总额（元）"></el-table-column>
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 批量操作 -->
        <div style="margin-top: 20px">
          <el-button type="danger">删除选中</el-button>
          <el-button>取消选择</el-button>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin-top: 20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
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
      value: "",
      goodstable: [
        {
          barCode: "6911989262549",
          name: "樱花酒",
          classification: "樱花酒",
          price: "20.00",
          stock: "0（缺）",
          stockTotal: "0.00",
          salesTotal: "0.00"
        },
        {
          barCode: "6911989262550",
          name: "梅子酒",
          classification: "梅子酒",
          price: "30.00",
          stock: "5",
          stockTotal: "150.00",
          salesTotal: "90.00"
        },
        {
          barCode: "6911989262551",
          name: "米酒",
          classification: "米酒",
          price: "10.00",
          stock: "10",
          stockTotal: "100.00",
          salesTotal: "30.00"
        },
        {
          barCode: "6911989262552",
          name: "果酒",
          classification: "果酒",
          price: "5.00",
          stock: "60",
          stockTotal: "300.00",
          salesTotal: "200.00"
        }
      ],
      currentPage: 1, //当前页码
      total: 50
    };
  },
  methods: {
    handleEdit() {
      //修改
    },
    handleDelete() {
      //删除
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style lang="less">
@import "./goodsmanage.less";
</style>


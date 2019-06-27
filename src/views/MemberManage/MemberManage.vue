<template>
  <div class="member-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <!-- 头部 -->
        <div class="head">
          <div>
            搜索：
            <el-input type="text" class="query"></el-input>（会员卡、会员名、电话、手机）
            <el-button size="small" type="primary">查询</el-button>
          </div>
        </div>
        <!-- 库存表格 -->
        <el-table :data="memberTable" stripe style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="CardNumber" label="会员卡卡号"></el-table-column>
          <el-table-column prop="name" label="会员姓名"></el-table-column>
          <el-table-column prop="level" label="会员等级"></el-table-column>
          <el-table-column prop="score" label="会员积分"></el-table-column>
          <el-table-column prop="discount" label="折扣"></el-table-column>
          <el-table-column prop="cellphone" label="手机号"></el-table-column>
          <el-table-column prop="seatNumber" label="座机号"></el-table-column>
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
      memberTable: [],
      currentPage: 1, //当前页码
      total: 50
    };
  },
  methods: {
    //分页请求数据
    handleEdit() {
      //修改
    },
    handleDelete() {
      //删除
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  created(){

  }
};
</script>
<style lang="less">
@import "./membermanage.less";
</style>


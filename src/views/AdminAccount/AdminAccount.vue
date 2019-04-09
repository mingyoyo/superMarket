<template>
  <div class="admin-account">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <!-- 内容 -->
      <div class="text item">
        <el-table
          ref="multipleTable"
          :data="accountTableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="账号" prop="account"></el-table-column>

          <el-table-column prop="userGroup" label="用户组"></el-table-column>

          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.createTime}}</template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i>修改
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>删除
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
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountTableData: [
        {
          account: "李寻欢",
          userGroup: "超级管理员",
          createTime: "2019-4-8"
        },
        {
          account: "张三",
          userGroup: "普通用户",
          createTime: "2019-4-7"
        },
        {
          account: "李四",
          userGroup: "普通用户",
          createTime: "2019-4-9"
        }
      ],
      currentPage:1,   //当前页码
      total:50
    };
  },
  methods: {
    //修改
    handleEdit() {
      alert("修改还没实现");
    },
    //删除
    handleDelete() {
      alert("删除还没实现");
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  }
};
</script>
<style lang="less">
@import "./adminaccount.less";
</style>


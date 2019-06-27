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
          ref="accountTableData"
          :data="accountTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selectChange"
        >
          <!-- selection-change是elementui封装好的事件，只要选择状态被改变就触发这个事件绑定的函数，并且自动传入被选择的数据 -->
          <!-- 选择框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="账号" prop="account"></el-table-column>

          <el-table-column prop="user_group" label="用户组"></el-table-column>

          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.create_date | filterDate}}</template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>修改
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改账号的模态框 -->
        <el-dialog title="修改账号" :visible.sync="dialogFormVisible" width="400px">
          <el-form :model="editForm" :rules="rules" ref="editForm">
            <el-form-item
              label="账号"
              :label-width="formLabelWidth"
              style="width:320px"
              prop="account"
            >
              <el-input v-model="editForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户组" :label-width="formLabelWidth" prop="user Group">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 批量操作 -->
        <div style="margin-top: 20px">
          <el-button type="danger" @click="bacthDel">删除选中</el-button>
          <el-button @click="cancelSelect">取消选择</el-button>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      accountTableData: [],
      currentPage: 1, //当前页码
      pageSize:5,
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      editForm: {
        account: "",
        userGroup: ""
      },
      editId: "",
      rules: {
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "长度为3-6位", trigger: "blur" }
        ]
      },
      selectId: [] //批量删除选中的id
    };
  },
  methods: {
    //请求所有账号数据的函数
    /* accountTable() {
      this.request
        .get("/account/accounttable") //请求所有的数据，所以没有参数
        .then(res => {
          //console.log(res)
          //把后端请求到的数据直接赋值给accountTableData
          this.accountTableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    }, */
    //按照分页请求数据
    getAccountByPage(){
      //收集参数
      let params = {
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }
      //请求数据
      this.request.get('/account/accountbypage',params)
        .then(res => {
          //console.log(res) totol是总条数，data是当前页的数据，是个数组
          //接收数据
          let {total,data} = res
          this.total = total;
          this.accountTableData = data;
          //做优化  当一页的数据被删完时，会停留在那一页
          if(!data.length && this.currentPage !== 1){  //除第一页外，如果当前页已经没有数据了
            this.currentPage -= 1;
            //调用自己刷新页面
            this.getAccountByPage();
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //删除账号 ----用户体验优化
    handleDelete(id) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确定进入then  把写好的删除过程复制粘贴
          let params = {
            id
          };
          this.request
            .get("/account/delaccount", params)
            .then(res => {
              let { code, reason } = res; //解构数据对象
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccountByPage(); //请刷新页面
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          //取消进入catch
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改 回填表单
    handleEdit(id) {
      this.dialogFormVisible = true; //显示修改账号的模态框
      this.request
        .get("/account/editaccount", { id })
        .then(res => {
          //接收参数 回填表单 console.log(res)是个数组，拿里面的对象res[0]
          let { account, user_group } = res[0];
          this.editForm.account = account;
          this.editForm.userGroup = user_group;
          //用变量把目前的id存起来，后面使用
          this.editId = id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //确认修改  保存修改
    saveEdit() {
      //获取整个表单验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          //前端表单验证通过
          this.dialogFormVisible = false; //关闭模态框

          let params = {
            //收集参数
            account: this.editForm.account,
            userGroup: this.editForm.userGroup,
            editId: this.editId
          };

          this.request
            .post("/account/saveedit", params)
            .then(res => {
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccountByPage(); //刷新页面
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false; //验证不通过，阻止表单提交
        }
      });
    },
    //取消选择
    cancelSelect() {
      this.$refs.accountTableData.clearSelection();
    },
    //批量删除 ---第一步 找到被选择的数据的id
    //当选择框状态发生改变时，会触发这个函数，并且自动传入数据
    selectChange(val) {
      //console.log(val)  数组，里面有当前勾选的数据，有几条数据就有几条对象

      //获取被选择的数据的id，放进一个数组
      this.selectId = val.map(v => v.id);
      //val 循环并返回新数组 每一项 返回每一项的id
    },
    //批量删除  ----第二步 执行删除，解决用户体验优化和bug
    bacthDel() {
      if(!this.selectId.length){  //如果长度没有时，弹错误提示，结束函数
        this.$message.error('您还没有选择任何账号，请选择以后再操作！')
        return;  //结束函数，不发送请求
      }
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {   //点击确定进入then，执行删除操作
          let params = {
            idArray: this.selectId
          };
          this.request
            .get("/account/batchdel", params)
            .then(res => {
              //console.log(res)
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccountByPage(); //刷新列表
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分页功能
    handleSizeChange(val) {  //每页条数改变
      //console.log(val)  每页条数赋值给pageSize
      this.pageSize = val;
      this.getAccountByPage()
    },
    handleCurrentChange(val) {  //当前页码改变
      //console.log(val)  当前页码赋值给currentPage
      this.currentPage = val;
      //调用分页函数
      this.getAccountByPage()
    }
  },
  created() {
    //生命周期钩子函数 vue实例对象创建完成 dom还没有生成的时候
    //我是vue组件生命周期中，最适合发送ajax的时期，只需要渲染我，我就会自动触发
    //发送axios给后台，请求当前页所有账号数据（自动发送的)
    this.getAccountByPage()
  },
  filters: {
    filterDate(val) {
      return moment(val).format("YYYY/MM/DD hh:mm:ss");
    }
  }
};
</script>
<style lang="less">
@import "./adminaccount.less";
</style>


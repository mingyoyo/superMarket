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
          <!-- 选择分类 -->
          <el-form :inline="true" ref="searchForm">
            <el-form-item label="所属分类：" prop="goodsClass">
              <el-select v-model="searchForm.goodsClass" placeholder="-----选择分类-----">
                <el-option label="全部" value="全部"></el-option>                
                <el-option label="樱花酒" value="樱花酒"></el-option>
                <el-option label="梅子酒" value="梅子酒"></el-option>
                <el-option label="米酒" value="米酒"></el-option>
                <el-option label="果酒" value="果酒"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="关键字：" prop="keywords">
              <el-input type="text" class="query" v-model="searchForm.keywords"></el-input>（商品名称，条形码）
            </el-form-item>

            <el-form-item>
              <el-button size="small" type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 商品表格 -->
        <el-table
          :data="goodstable"
          stripe
          style="width: 100%"
          ref="goodsTable"
          @selection-change="selectChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="goods_code" label="商品条形码"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称"></el-table-column>
          <el-table-column prop="goods_class" label="所属分类"></el-table-column>
          <el-table-column prop="goods_price" label="售价"></el-table-column>
          <el-table-column prop="goods_stock" label="库存"></el-table-column>
          <el-table-column prop="stock_total" label="库存总额（元）"></el-table-column>
          <el-table-column prop="sales_total" label="销售总额（元）"></el-table-column>
          <el-table-column label="管理">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改商品的模态框 -->
        <el-dialog title="修改商品" :visible.sync="dialogFormVisible" width="400px">
          <el-form :model="editForm" :rules="rules" ref="editForm">
            <el-form-item
              label="商品条形码"
              :label-width="formLabelWidth"
              style="width:320px"
              prop="goods_code"
            >
              <el-input v-model="editForm.goods_code" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
              label="商品名称"
              :label-width="formLabelWidth"
              style="width:320px"
              prop="goods_name"
            >
              <el-input v-model="editForm.goods_name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="商品类别" :label-width="formLabelWidth" prop="goods_class">
              <el-select v-model="editForm.goods_class" placeholder="请选择商品类别">
                <el-option label="樱花酒" value="樱花酒"></el-option>
                <el-option label="梅子酒" value="梅子酒"></el-option>
                <el-option label="米酒" value="米酒"></el-option>
                <el-option label="果酒" value="果酒"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="售价"
              :label-width="formLabelWidth"
              style="width:320px"
              prop="goods_price"
            >
              <el-input v-model="editForm.goods_price" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
              label="库存"
              :label-width="formLabelWidth"
              style="width:320px"
              prop="goods_stock"
            >
              <el-input v-model="editForm.goods_stock" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit()">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 批量操作 -->
        <div style="margin-top: 20px">
          <el-button type="danger" @click="batchDel">删除选中</el-button>
          <el-button @click="cancelSelected">取消选择</el-button>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :pageSize="pageSize"
        :page-sizes="[5, 10, 15, 20]"
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
      //搜索表格数据
      searchForm:{
        goodsClass: "",
        keywords:''
      },
      goodstable: [], //空数组，不能写''
      currentPage: 1, //当前页码
      pageSize: 5, //当前页数据条数
      total: 0,
      selectId: [], //必须是一个数组
      dialogFormVisible: false,
      formLabelWidth: "100px",
      editForm: {
        goods_code: "",
        goods_name: "",
        goods_class: "",
        goods_price: null,
        goods_stock: null
      },
      rules: {
        goods_code: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        good_name: [
          { required: true, message: "商品名不能为空", trigger: "blur" }
        ],
        goods_class: [
          { required: true, message: "请选择商品类别", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "价格不能为空", trigger: "blur" }
        ],
        goods_stock: [
          { required: true, message: "库存不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //分页和查询整合实现
    getGoodsByPage() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        goodsClass:this.searchForm.goodsClass,
        keywords:this.searchForm.keywords
      };
      this.request
        .get("/goods/goodsbypage", params)
        .then(res => {
          //接收数据
          let { total, data } = res;
          this.total = total;
          this.goodstable = data;
          //做优化
          if (data.length === 0 && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.getGoodsByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改 ---回填表单
    handleEdit(id) {
      //打开模态框
      this.dialogFormVisible = true;
      this.request
        .get("/goods/editgoods", { id })
        .then(res => {
          //console.log(res) 返回的是一个数组：[{当前id对象}]
          let {
            goods_code,
            goods_name,
            goods_class,
            goods_price,
            goods_stock
          } = res[0];
          this.editForm.goods_code = goods_code;
          this.editForm.goods_name = goods_name;
          this.editForm.goods_class = goods_class;
          this.editForm.goods_price = goods_price;
          this.editForm.goods_stock = goods_stock;
          //保存id
          this.editId = id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改  ---保存数据
    saveEdit() {
      //先验证表单验证通过没有
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          let params = {
            editId: this.editId,
            goods_code: this.editForm.goods_code,
            goods_name: this.editForm.goods_name,
            goods_class: this.editForm.goods_class,
            goods_price: this.editForm.goods_price,
            goods_stock: this.editForm.goods_stock
          };
          this.request
            .post("/goods/savegoodsedit", params)
            .then(res => {
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getGoodsByPage(); //刷新页面
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    //删除
    handleDelete(id) {
      //优化用户体验，给个提示
      this.$confirm("此操作将永远删除商品，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.request
            .get("/goods/delgoods", { id })
            .then(res => {
              console.log(res);
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getGoodsByPage(); //刷新页面
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
    //取消选择
    cancelSelected() {
      this.$refs.goodsTable.clearSelection();
    },
    //批量删除  ---获取选择的数据的id
    selectChange(val) {
      //在标签里用@selection-change="selectChange"绑定的函数，是elementui组件封装好的，选择状态改变就会自动触发的函数。还会把当前选中数据作为参数传入。
      this.selectId = val.map(v => v.id);
    },
    //批量删除  ---执行删除
    batchDel() {
      if (!this.selectId.length) {
        //如果没有选择的话进入这个条件语句
        this.$message.error("您还没有选择任何商品，请选择后再继续");
        return; //结束函数 不发送请求
      }
      this.$confirm("此操作将永远删除被选中的商品，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            idArr: this.selectId
          };
          this.request
            .get("/goods/batchdel", params)
            .then(res => {
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getGoodsByPage();
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
    handleSizeChange(val) {
      //当前页面条数
      this.pageSize = val;
      this.getGoodsByPage();
    },
    handleCurrentChange(val) {
      //当前页码
      this.currentPage = val;
      this.getGoodsByPage();
    },
    //查询和分页整合实现
    search(){
      //调用分页函数
      this.getGoodsByPage();
      /* let params = {
        goodsClass:this.searchForm.goodsClass,
        keywords:this.searchForm.keywords
      }
      this.request.get('/goods/search',params)
        .then(res => {
          this.goodstable = res;
        })
        .catch(err => {
          console.log(err)
        }) */
    } 
  },
  created() {
    //生命周期钩子函数，是个函数不是对象
    this.getGoodsByPage();
  }
};
</script>
<style lang="less">
@import "./goodsmanage.less";
</style>


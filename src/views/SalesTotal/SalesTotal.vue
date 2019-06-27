<template>
  <div class="sales-total">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售数据统计</span>
      </div>
      <div class="text item">
        <el-date-picker
          type="daterange"
          v-model="value"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        
        <!-- 准备一个容器 -->
        <div id="box" style="height:400px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value:'',
      
    }
  },
  //vue生命周期钩子函数 最适合操作dom的时期
  mounted() {
    //假如这是后端响应的数据
    let res = {
      categoryName: [
        "2019-4-10",
        "2019-4-11",
        "2019-4-12",
        "2019-4-13",
        "2019-4-14"
      ],
      value: [25, 10, 60, 30, 50]
    };
    //解构数据
    let {categoryName,value} = res;
    this.drowSalesChart(categoryName, value);
  },
  methods: {
    drowSalesChart(categoryData = [], values = []) {
      //选中dom容器 初始化
      let myChart = this.echarts.init(document.getElementById("box"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          show: true
        },
        legend: {
          data: ["销量"]
        },
        xAxis: [
          {
            type: "category",
            data: categoryData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "销量",
            type: "line",
            data: values
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less">
@import "./salestotal.less";
</style>


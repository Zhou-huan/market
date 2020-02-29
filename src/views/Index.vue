<template>
  <div class="index">
    <!-- 上部列表 -->
    <el-row :gutter="20" type="flex">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dingdan" />
          </svg>
          <p class="index-title">
            <span>总订单</span>
            <br />1208,0012
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinbi" />
          </svg>
          <p class="index-title">
            <span>总销售额</span>
            <br />11112228,0012
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiaoshouludan"/>
          </svg>
          <p class="index-title">
            <span>今日订单数</span>
            <br />108,001
          </p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinqian-" />
          </svg>
          <p class="index-title">
            <span>今日销售额</span>
            <br />21208,0012
          </p>
        </div>
      </el-col>
    </el-row>
    <!-- echarts图表 -->
    <div ref="chartmainline" style="width:100%; height:400px; background:#fff;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      optionline: {
        title: {
        text: '数据统计'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['订单','销售额','注册人数','管理员人数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'订单',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'销售额',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'注册人数',
                type:'line',
                stack: '总量',
                data:[250, 132, 221, 344, 120, 430, 420]
            },
             {
                name:'管理员人数',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            }
        ]
      }
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let chartmainline = this.$echarts.init(
       /*  document.getElementById("chartmainline") */
        this.$refs.chartmainline
      );
      //绘制图表
      chartmainline.setOption(this.optionline);
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #ffffff;
  }
  .bg-purple {
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .index-title {
      font-size: 18px;
      line-height: 1.5em;
      span {
        color: #e1e5ec;
      }
    }
  }
  .bg-purple-light {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
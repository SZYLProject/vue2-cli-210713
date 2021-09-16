<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script></script>
<script>
import resize from "../mixins/resize";
import * as echarts from "echarts5";
import { transform } from "echarts-stat";
export default {
  name: "BasicScatterChart",
  mixins: [resize],
  props: {
    BasicScatterChartData: {
      type: Array,
      default: []
    },
    titleLocal: {
      // 标题位置
      type: String,
      default: "left"
    },
    id: {
      type: String,
      default: "pieChart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    },
    title: {
      type: String,
      default: "chart"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    BasicScatterChartData(val) {
      // 监听数据发生改变 刷新图表数据
      this.initChart();
    }
  },
  methods: {
    initChart() {
      echarts.registerTransform(transform.regression);

      const option = {
        xAxis: {
          min: -3,
          splitLine: {
            show: false, // 去掉网格线
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            onZero: false, //可以使用负数
            lineStyle: {
              color: "#CCCCCC",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          min: -1,
          splitLine: {
            show: false, // 去掉网格线
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            onZero: false, //可以使用负数
            lineStyle: {
              color: "#CCCCCC",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            symbolSize: 20,
            data: [],
            type: "scatter"
          }
        ]
      };
      option.series[0].data = this.BasicScatterChartData;
      this.chart = echarts.init(this.$el);
      this.chart.setOption(option);
    }
  }
};
</script>

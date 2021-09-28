<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>
<script></script>
<script>
import resize from "../mixins/resize";
import * as echarts from "echarts5";
import { transform } from "echarts-stat";
export default {
  name: "LinearRegression",
  mixins: [resize],
  props: {
    LinearRegressionData: {
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
      default: "LinearRegression"
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
    LinearRegressionData(val) {
      // 监听数据发生改变 刷新图表数据
      this.initChart();
    }
  },
  methods: {
    initChart() {
      echarts.registerTransform(transform.regression);
      const option = {
        dataset: [
          {
            source: this.LinearRegressionData
          },
          {
            transform: {
              type: "ecStat:regression"
              // 'linear' by default.
              // config: { method: 'linear', formulaOn: 'end'}
            }
          }
        ],
        title: {
          text: "Linear Regression",
          subtext: "By ecStat.regression",
          sublink: "https://github.com/ecomfe/echarts-stat",
          left: "center"
        },
        legend: {
          bottom: 5
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
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
            name: "scatter",
            type: "scatter"
          },
          {
            name: "line",
            type: "line",
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: "circle",
            label: { show: true, fontSize: 16 },
            labelLayout: { dx: -20 },
            encode: { label: 2, tooltip: 1 }
          }
        ]
      };
      this.chart = echarts.init(this.$el);
      this.chart.setOption(option);
    }
  }
};
</script>

<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    discountData: {
      type: Object,
      default: null
    },
    disc: {
      // true 实心圆 false空心圆
      type: Boolean,
      default: false
    },
    titleLocal: {
      // 标题位置
      type: String,
      default: "left"
    },
    labelPosition: {
      // label 样式 outside center
      type: String,
      default: "outside"
    },
    data: {
      type: Array,
      default: null
    },
    className: {
      type: String,
      default: "chart"
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
    },
    sn: {
      type: Number,
      default: 0
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
    data(val) {
      // 监听数据发生改变 刷新图表数据
      this.initChart();
    },
    sn(val) {
      this.resize();
    }
  },
  methods: {
    initChart() {
      var test = {
        xAxisData: ["100", "200", "300", "400", "500", "600", "700", "800"],
        seriesData: [
          {
            name: "Step Start",
            value: [0.98, 0.88, 0.8, 0.45, 0.19, 0.1, 0.08, 0.08]
          },
          {
            name: "Step Middle",
            value: [0.95, 0.9, 0.85, 0.8, 0.69, 0.6, 0.02, 0.08]
          },
          {
            name: "Step End",
            value: [0.9, 0.88, 0.8, 0.6, 0.49, 0.32, 0.2, 0.08]
          }
        ]
      };
      // var test = this.discountData
      var xAxisData = test.xAxisData;
      var legendData = [],
        seriesData = [];
      legendData = seriesData = test.seriesData.map(item => {
        return {
          name: item.name, //seriesData与legendData共用，其余为seriesData属性
          type: "line",
          step: "start",
          symbol: "none", // 取消小圆圈
          data: item.value,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 1,
                type: "solid" //'dotted'虚线 'solid'实线
              }
            }
          }
        };
      });
      this.chart = echarts.init(this.$el, "light");

      this.chart.setOption({
        title: {
          text: "Step Line"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: legendData,
          icon: "circle", // title文字左侧图标圆形
          right: "4%" // title距离右侧距离
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            // saveAsImage: {}// 保存图片
          }
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          /*改变xy轴颜色*/
          axisLine: {
            show: false,
            lineStyle: {
              color: "#CCCCCC",
              width: 1 //这里是为了突出显示加上的
            }
          },
          //  取消坐标轴刻度线
          axisTick: {
            show: false
          },

          // show: false, // 去掉主线
          // 取消网格线
          splitLine: {
            // show: false// 去掉里面的线
            color: "blue"
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          /*改变xy轴颜色*/
          axisLine: {
            show: false,
            lineStyle: {
              color: "#CCCCCC",
              width: 1 //这里是为了突出显示加上的
            }
          },
          type: "value",
          // show: false,
          splitLine: {
            // show: false,
            // color:'black'
          }
        },
        series: seriesData
      });
    }
  }
};
</script>

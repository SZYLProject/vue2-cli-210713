<template>
  <div>
    <div :ref="id" :style="{ height: height, width: width }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dataTool from "echarts/extension/dataTool";
export default {
  data() {
    return { BoxChart: null };
  },
  props: {
    id: {
      type: String,
      default: "main"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    },
    BoxplotLightVelocityData: {
      type: Object,
      default: null
    }
  },
  // 监听
  watch: {
    BoxplotLightVelocityData() {
      this.initCharts();
    }
  },
  // 计算属性
  computed: {},
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      const data = dataTool.prepareBoxplotData([
        [78.0, 70, 63.5, 54.0, 35],
        [80.0, 70, 63.5, 54.0, 35],
        [90.0, 70, 63.5, 54.0, 35]
      ]);
      const xData = ["Mon", "Tue", "Wed"];
      const option = {
        color: ["#7FB7F9", "#FF9F51"],

        title: [
          {
            text: "年龄的箱线图",
            textStyle: {
              fontSize: 14
            },
            x: this.titleLocal,
            y: "top"
          }
        ],
        tooltip: {
          trigger: "item", //触发类型,数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            //指示器类型。
            type: "shadow"
          }
        },
        grid: {
          //直角坐标系网格。
          //show: true,//default: false
          left: "10%",
          right: "10%",
          bottom: "15%"
          //borderWidth: 1,
          //borderColor: '#000',
        },
        xAxis: {
          //X轴
          data: xData,

          type: this.direction ? "value" : "category",
          axisLabel: {
            color: "#999999",
            // interval: 0, // 横轴信息全部显示
            rotate: -40 // -30度角倾斜显示
          }, // 设置轴线的属性
          axisLine: {
            lineStyle: {
              color: "#E6E6E6"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#f5f5f5",
              type: "dashed"
            }
          }
        },
        yAxis: {
          type: this.direction ? "category" : "value",
          axisLabel: {
            color: "#999999"
          },
          axisLine: {
            lineStyle: {
              color: "#E6E6E6"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#f5f5f5",
              type: "dashed"
            }
          },
          nameTextStyle: {
            color: "#999999"
          },
          name: this.nameY,
          data: this.dataY
        },
        series: [
          {
            name: "boxplot", //箱形图
            type: "boxplot",
            //legendHoverLink: true, //是否启用图例 hover 时的联动高亮。
            //hoverAnimation: false, //是否开启 hover 在 box 上的动画效果。
            itemStyle: {
              //盒须图样式。
              //color: '#fff', //boxplot图形的颜色。 默认从全局调色盘 option.color 获取颜色
              borderColor: "#7FB7F9" //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
            },
            data: data.boxData,
            tooltip: {
              //注意：series.tooltip 仅在 tooltip.trigger 为 'item' 时有效。
              formatter: function(param) {
                /*
										第一个参数 param 是 formatter 需要的数据集。 格式如下：
										{
											//组件类型
											componentType: 'series',
											// 系列类型
											seriesType: string,
											// 系列在传入的 option.series 中的 index
											seriesIndex: number,
											// 系列名称
											seriesName: string,
											// 数据名，类目名
											name: string,
											// 数据在传入的 data 数组中的 index
											dataIndex: number,
											// 处理过的数据项
											data: Object | Array,
											// 处理过的数据项
											value: number | Array,
											// 数据图形的颜色
											color: string,

											// 饼图的百分比
											percent: number,

										}
									*/

                return [
                  "类目名 " + param.name + ": ",
                  "upper: " + param.data[5],
                  "Q3: " + param.data[4],
                  "median: " + param.data[3],
                  "Q1: " + param.data[2],
                  "lower: " + param.data[1]
                ].join("<br/>");
              }
            }
          }
        ]
      };

      this.BoxChart = echarts.init(this.$refs.main);
      // this.BoxChart.showLoading(); //数据加载完之前先显示一段简单的loading动画

      // 使用刚指定的配置项和数据显示图表。
      this.BoxChart.setOption(option);
      // setTimeout(_ => this.BoxChart.hideLoading(), 100);
      // setTimeout(myChart.hideLoading(),10000)
    }
  }
};
</script>

<style lang="scss" scoped></style>

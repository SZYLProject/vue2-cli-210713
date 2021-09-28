<template>
  <div>
    <el-scrollbar style=" height: 100% " ref="scroll">
      <div class="describe-chart">
        <!-- 柱状图 -->
        <el-row>
          <el-col :span="12">
            <MixedLineAndBar
              height="400px"
              width="100%"
              id="descriptiveStatisticsBar"
              titleLocal="left"
              title="Age频数直方图"
              :dataX="barDataX"
              :dataY="barDataY"
            />
          </el-col>
          <el-col :span="12">
            <RainfallAndEvaporation
              titel="RainfallAndEvaporation"
              height="400px"
              width="100%"
            />
          </el-col>
          <el-col :span="12">
            <VerticalAxisBar
              height="400px"
              width="100%"
              :titleShow="true"
              title="Smoking history在不同Gender分组中的堆积柱形图"
              :data="VerticalAxisBarData"
            />
          </el-col>
        </el-row>
        <!-- 饼图 -->
        <el-row>
          <el-col :span="12">
            <DoughnutChart
              height="400px"
              width="100%"
              title="Drinking History 频数饼图"
              titleLocal="left"
              labelPosition="center"
              id="DescriptiveDoughnutChart"
              :data="pieData"
            />
          </el-col>
          <el-col :span="12">
            <NestedPies
              height="400px"
              width="100%"
              title="用户投资途径"
              titleLocal="left"
              labelPosition="center"
              id="main"
              :data="pieData"
            />
          </el-col>
          <el-col :span="12">
            <RefererOfAWebsite height="400px" width="100%" />
          </el-col>
        </el-row>
        <!-- 折线图 -->
        <el-row>
          <el-col :span="12">
            <StackedAreaChart title="StackedAreaChart" height="400px" width="100%" />
          </el-col>
          <el-col :span="12">
            <StepLine
              height="400px"
              width="100%"
              title="年龄的箱线图"
              id="StepLine"
            />
          </el-col>
        </el-row>
        <!-- 雷达图 -->
        <el-row>
          <el-col :span="12">
            <radarChart title="radarChart" height="400px" width="100%" />
          </el-col>
        </el-row>
        <!-- 何须图 -->
        <el-row>
          <el-col :span="12">
            <BoxplotLightVelocity
              height="400px"
              width="100%"
              title="年龄的箱线图"
              titleLocal="left"
              labelPosition="center"
              id="main"
              :data="pieData"
            />
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import DoughnutChart from "@/components/echarts/Pie/DoughnutChart";
import MixedLineAndBar from "@/components/echarts/Bar/MixedLineAndBar";
import RainfallAndEvaporation from "@/components/echarts/Bar/RainfallAndEvaporation";
import BoxplotLightVelocity from "@/components/echarts/Boxplot/BoxplotLightVelocity";
import StepLine from "@/components/echarts/Line/StepLine";
import StackedAreaChart from "@/components/echarts/Line/StackedAreaChart";
import NestedPies from "@/components/echarts/Pie/NestedPies";
import RefererOfAWebsite from "@/components/echarts/Pie/RefererOfAWebsite";
import radarChart from "@/components/echarts/radarChart";
import VerticalAxisBar from "@/components/echarts/Bar/VerticalAxisBar";

export default {
  components: {
    DoughnutChart,
    MixedLineAndBar,
    BoxplotLightVelocity,
    RainfallAndEvaporation,
    StepLine,
    StackedAreaChart,
    NestedPies,
    RefererOfAWebsite,
    radarChart,
    VerticalAxisBar
  },
  data() {
    return {
      pieData: [
        { value: 435, name: "是" },
        { value: 310, name: "否" }
      ],
      barDataY: [40, 60, 30, 85, 35, 70, 18],
      barDataX: [17, 23, 29, 35, 41, 47, 53, 59],
      VerticalAxisBarData: {
        name: ["待录入", "录入中", "已提交"],
        color: [
          "rgba(0,112,244,0.5)",
          "rgba(76,204,161,0.5)",
          "rgba(255,149,64,0.5)"
        ],
        allData: [
          {
            title: "合计",
            value: [320, 302, 301]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          },
          {
            title: "合计",
            value: [10, 382, 591]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          },
          {
            title: "合计",
            value: [10, 382, 591]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          }
        ]
      }
    };
  },
  props: {
    clientHeight: {
      type: Number,
      default: 410
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.describe-block {
  background: #ffffff;
  padding: 15px 20px;
  h1 {
    font-size: 15px;
    color: #333333;
  }
  .text {
    padding-top: 5px;
    color: #666666;
    line-height: 25px;
    padding-bottom: 10px;
  }
  .describe-chart {
    border-top: 1px solid #e6e6e6;
    padding: 15px 0;
    .chartsBar {
      position: relative;
      .barBotton {
        position: absolute;
        z-index: 1;
        top: 0px;
        right: 46px;
      }
    }
  }
}
</style>

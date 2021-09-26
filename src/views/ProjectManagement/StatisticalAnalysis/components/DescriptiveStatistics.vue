<template>
  <div>
    <el-scrollbar
      style="height: 440px"
      ref="scroll"
      v-if="descriptiveStatisticsData.length > 0"
    >
      <div
        class="describe-block"
        v-for="(item, i) in descriptiveStatisticsData"
        :key="i"
      >
        <h1 style="margin-bottom:15px;font-size:15px">{{ item.name }}</h1>
        <SzylElTable
          :colConfigs="item.data.colConfigs"
          :tableList="item.data.tableData"
          :min-height="90"
          class="table_container"
        >
        </SzylElTable>
        <div class="text">
          <p style="font-size:13px">
            <b>{{ item.data.statisticalResultsData.name }}</b>
          </p>
          <div
            style="font-size:12px"
            v-for="(itemStatistical, j) in item.data.statisticalResultsData
              .data"
            :key="j"
          >
            <div>{{ itemStatistical }}</div>
          </div>
        </div>
        <div class="describe-chart">
          <el-row>
            <el-col :span="12">
              <div class="chartsBar">
                <Bar
                  v-if="radioLeft == '直线图'"
                  height="400px"
                  width="100%"
                  id="descriptiveStatisticsBar"
                  titleLocal="left"
                  title="Age频数直方图"
                  :dataX="item.data.barDataX"
                  :dataY="item.data.barDataY"
                />
                <BoxplotLightVelocity
                  v-if="radioLeft == '箱线图'"
                  height="400px"
                  width="100%"
                  title="Drinking History 频数饼图"
                  titleLocal="left"
                  labelPosition="center"
                  id="main"
                  :data="item.data.pieData"
                />
                <!-- <el-button size="mini">直线图</el-button> -->
                <el-radio-group class="barBotton" v-model="radioLeft">
                  <el-radio-button label="直线图"></el-radio-button>
                  <el-radio-button label="箱线图"></el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="chartsBar">
                <Pie
                  v-if="radioRight == '饼图'"
                  height="400px"
                  width="100%"
                  title="Drinking History 频数饼图"
                  titleLocal="left"
                  labelPosition="center"
                  id="DescriptiveStatisticsPie"
                  :data="item.data.pieData"
                />
                <Bar
                  v-if="radioRight == '条形图'"
                  height="400px"
                  width="100%"
                  id="DescriptiveStatisticsBar"
                  titleLocal="left"
                  title="Age频数直方图"
                  :dataX="item.data.barDataX"
                  :dataY="item.data.barDataY"
                />
                <el-radio-group class="barBotton" v-model="radioRight">
                  <el-radio-button label="饼图"></el-radio-button>
                  <el-radio-button label="条形图"></el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-scrollbar>

    <el-empty
      style="height:440px"
      class="describe-block"
      v-else
      description="点击开始分析后，统计结果会呈现在此处"
    ></el-empty>
  </div>
</template>
<script>
import Pie from "@/components/echarts/Pie";
import Bar from "@/components/echarts/Bar";
import BoxplotLightVelocity from "@/components/echarts/ScatterPlot/BoxplotLightVelocity";

import SzylElTable from "@/components/tableCom/tableCom.vue";
import { mapState } from "vuex";
export default {
  components: { Pie, Bar, SzylElTable ,BoxplotLightVelocity},
  data() {
    return {
      radioLeft: "直线图",
      radioRight: "饼图"
    };
  },
  computed: {
    ...mapState({
      descriptiveStatisticsData: state =>
        state.statisticalAnalysis.descriptiveStatisticsData
    })
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.describe-block {
  background: #ffffff;
  // margin-top: 15px;
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

<template>
  <div>
    <el-scrollbar
      style="height: 440px"
      ref="scroll"
      v-if="univariateAnalysisData.length > 0"
    >
      <div
        class="describe-block"
        v-for="(item, i) in univariateAnalysisData"
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
          <div class="chartsBar">
            <VerticalAxisBar
              v-if="radioRight == '堆积柱图'"
              height="400px"
              width="100%"
              id="UnivariateAnalysisVerticalAxisBar"
              :titleShow="true"
              title="Smoking history在不同Gender分组中的堆积柱形图"
              :data="item.data.data1"
            />
            <LinearRegression
              v-if="radioRight == '分组柱图'"
              height="400px"
              width="100%"
              id="UnivariateAnalysisVerticalAxisBar"
              :titleShow="true"
              title="Smoking history在不同Gender分组中的堆积柱形图"
              :LinearRegressionData="item.data.scatterData"
            />
            <el-radio-group class="barBotton" v-model="radioRight">
              <el-radio-button label="堆积柱图"></el-radio-button>
              <el-radio-button label="分组柱图"></el-radio-button>
            </el-radio-group>
          </div>
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
import VerticalAxisBar from "@/components/echarts/VerticalAxisBar";
import LinearRegression from "@/components/echarts/ScatterPlot/LinearRegression";

import SzylElTable from "@/components/tableCom/tableCom.vue";
import { mapState } from "vuex";
export default {
  components: { VerticalAxisBar, SzylElTable, LinearRegression },
  data() {
    return { radioRight: "堆积柱图" };
  },
  computed: {
    ...mapState({
      univariateAnalysisData: state =>
        state.statisticalAnalysis.univariateAnalysisData
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
        right: 0%;
      }
    }
  }
}
</style>

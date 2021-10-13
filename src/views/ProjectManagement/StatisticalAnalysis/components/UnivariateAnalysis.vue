<template>
  <div>
    <el-scrollbar
      :style="{ height: clientHeight + 'px' }"
      ref="scroll"
      v-if="univariateAnalysisData.length > 0"
    >
      <div
        class="describe-block"
        v-for="(item, i) in univariateAnalysisData"
        :key="i"
      >
        <div style="display: flex;">
          <!-- <h1
            style="margin:0 15px 15px 0;font-size:15px;cursor: pointer;"
            @click="tableRadio = '0'"
          >
            {{ item.name }}
          </h1> -->

          <el-button
            type="text"
            style="margin:0 15px 15px 0;font-size:15px;cursor: pointer;"
            @click="tableRadio = '0'"
            >{{ item.data.name1 }}</el-button
          >
          <el-button
            type="text"
            style="margin:0 15px 15px 0;font-size:15px;cursor: pointer;"
            @click="tableRadio = '1'"
            >{{ item.data.name2 }}</el-button
          >
          <el-button
            type="text"
            style="margin:0 15px 15px 0;font-size:15px;cursor: pointer;"
            @click="tableRadio = '2'"
            >{{ item.data.name3 }}</el-button
          >
          <el-button
            type="text"
            style="margin:0 15px 15px 0;font-size:15px;cursor: pointer;"
            @click="tableRadio = '3'"
            >{{ item.data.name4 }}</el-button
          >
          <!-- <h1
            style="margin:0 15px 15px 0;font-size:15px ; cursor: pointer; "
            @click="tableRadio = '1'"
          >
            {{ item.data.name2 }}
          </h1> -->
        </div>
        <SzylElTable
          v-show="tableRadio === '0'"
          :colConfigs="item.data.colConfigs"
          :tableList="item.data.tableData"
          :min-height="90"
          class="table_container"
        >
        </SzylElTable>
        <SzylElTable
          :tableRowClassName="tableRowClassName"
          v-show="tableRadio === '1'"
          :colConfigs="item.data.colConfigs2"
          :tableList="item.data.tableData2"
          :min-height="90"
          class="table_container"
        >
          <!-- <template v-slot:scope>
            <i class="el-icon-time"></i>
            <el-table-column
              v-if="scope.row.rowIndex === 0"
              width="45"
              label=""
              type="index"
              align="left"
            >
              <img style="height: 36px" :src="recommend" alt="" />
            </el-table-column>
          </template> -->
        </SzylElTable>
        <SzylElTable
          v-show="tableRadio === '2'"
          :colConfigs="item.data.colConfigs3"
          :tableList="item.data.tableData3"
          :min-height="90"
          class="table_container"
        >
        </SzylElTable>
        <SzylElTable
          :tableRowClassName="tableRowClassName"
          v-show="tableRadio === '3'"
          :colConfigs="item.data.colConfigs4"
          :tableList="item.data.tableData4"
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
              id="LinearRegression"
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
      :style="{ height: clientHeight - 18 + 'px', 'margin-top': '18px' }"
      class="describe-block"
      v-else
      description="点击开始分析后，统计结果会呈现在此处"
    ></el-empty>
  </div>
</template>
<script>
import VerticalAxisBar from "@/components/echarts/Bar/VerticalAxisBar";
import LinearRegression from "@/components/echarts/ScatterPlot/LinearRegression";

import SzylElTable from "@/components/tableCom/tableCom.vue";
import { mapState } from "vuex";
export default {
  components: { VerticalAxisBar, SzylElTable, LinearRegression },
  data() {
    return { radioRight: "堆积柱图", tableRadio: "0" };
  },
  props: {
    clientHeight: {
      type: Number,
      default: 410
    }
  },
  computed: {
    ...mapState({
      univariateAnalysisData: state =>
        state.statisticalAnalysis.univariateAnalysisData
    })
  },
  watch: {},
  mounted() {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "warning-row";
      } else {
        return "success-row";
      }
      // return "";
    }
  }
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

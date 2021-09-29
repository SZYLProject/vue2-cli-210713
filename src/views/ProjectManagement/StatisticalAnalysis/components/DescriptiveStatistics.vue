<template>
  <div>
    <el-scrollbar
      :style="{ height: clientHeight + 'px' }"
      ref="scroll"
      v-if="descriptiveStatisticsData.length > 0"
    >
      <div
        class="describe-block"
        v-for="(item, i) in descriptiveStatisticsData"
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
            >{{ item.name }}</el-button
          >
          <el-button
            type="text"
            style="margin:0 15px 15px 0;font-size:15px;cursor: pointer;"
            @click="tableRadio = '1'"
            >{{ item.data.name2 }}</el-button
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
          <template v-slot:MultiLevelHeader>
            <el-table-column label="95%置信区间[a]" align='center'>
              <el-table-column prop="col8" align='center' label="Q3" min-width="120">
              </el-table-column>
              <el-table-column prop="col9" align='center' label="最大值" min-width="120">
              </el-table-column>
            </el-table-column>
          </template>
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
        <!-- <el-radio-group class="tableRadio" v-model="tableRadio">
          <el-radio-button label="一般性描述"></el-radio-button>
          <el-radio-button label="正态性检验"></el-radio-button>
        </el-radio-group> -->
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
                  title="年龄的箱线图"
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
                <DoughnutChart
                  v-if="radioRight == '饼图'"
                  height="400px"
                  width="100%"
                  title="Drinking History 频数饼图"
                  titleLocal="left"
                  labelPosition="center"
                  id="DescriptiveStatisticsDoughnutChart"
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
      :style="{ height: clientHeight - 18 + 'px', 'margin-top': '18px' }"
      class="describe-block"
      v-else
      description="点击开始分析后，统计结果会呈现在此处"
    ></el-empty>
  </div>
</template>
<script>
import DoughnutChart from "@/components/echarts/Pie/DoughnutChart";
import Bar from "@/components/echarts/Bar/MixedLineAndBar";
import BoxplotLightVelocity from "@/components/echarts/Boxplot/BoxplotLightVelocity";

import SzylElTable from "@/components/tableCom/tableCom.vue";
import { mapState } from "vuex";
import recommend from "@/assets/StatisticalAnalysis/recommend.png";

export default {
  components: { DoughnutChart, Bar, SzylElTable, BoxplotLightVelocity },
  data() {
    return {
      radioLeft: "直线图",
      radioRight: "饼图",
      tableRadio: "0",
      recommend: recommend
    };
  },
  props: {
    clientHeight: {
      type: Number,
      default: 410
    }
  },
  computed: {
    ...mapState({
      descriptiveStatisticsData: state =>
        state.statisticalAnalysis.descriptiveStatisticsData
    })
  },
  watch: {},
  mounted() {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "success-row";
      } else if (rowIndex === 1) {
        return "warning-row";
      }
      return "";
    },
    click(scope) {
      console.log(scope, "scope");
    }
  }
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

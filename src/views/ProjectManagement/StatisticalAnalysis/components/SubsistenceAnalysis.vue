<template>
  <div>
    <el-scrollbar
      :style="{ height: clientHeight + 'px' }"
      ref="scroll"
      v-if="subsistenceAnalysisData.length > 0"
    >
      <div
        class="describe-block"
        v-for="(item, i) in subsistenceAnalysisData"
        :key="i"
      >
        <h1 style="margin-bottom:15px;font-size:15px">{{ item.name }}</h1>
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
            <StepLine
              height="400px"
              width="100%"
              title="Drinking History 频数饼图"
              titleLocal="left"
              labelPosition="center"
              id="7"
              :discountData="item.data.discountData"
            ></StepLine>
          </div>
        </div>
        <SzylElTable
          :colConfigs="item.data.colConfigs"
          :tableList="item.data.tableData"
          :min-height="90"
          class="table_container"
        >
        </SzylElTable>
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
import StepLine from "@/components/echarts/Line/StepLine";
import SzylElTable from "@/components/tableCom/tableCom.vue";
import { mapState } from "vuex";
export default {
  components: { StepLine, SzylElTable },
  data() {
    return {};
  },
  props: {
    clientHeight: {
      type: Number,
      default: 410
    }
  },
  computed: {
    ...mapState({
      subsistenceAnalysisData: state =>
        state.statisticalAnalysis.subsistenceAnalysisData
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
  }
}
</style>

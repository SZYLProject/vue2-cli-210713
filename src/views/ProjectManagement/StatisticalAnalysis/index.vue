<template>
  <div class="statisticAnalysis-com">
    <div class="left inlineBlock">
      <LeftDrag />
    </div>
    <div class="right inlineBlock">
      <div class="tab">
        <!-- tab切换 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in tabList"
            :key="index"
            :label="item.value"
            :name="item.name"
          >
            <component :is="activeName" :activeValue="activeValue"></component>
          </el-tab-pane>
        </el-tabs>
      </div>
      <DescriptiveStatistics></DescriptiveStatistics>
    </div>
  </div>
</template>
<script>
// 导入draggable组件
import LeftDrag from "./components/LeftDrag"; //
import { FenLeiBianLiangMiaoShuTongJi } from "@/api/statisticalAnalysis";
import tabDescriptiveStatistics from "./components/tabDescriptiveStatistics"; // 统计性描述
import tabUnivariateAnalysis from "./components/tabUnivariateAnalysis"; // 单因素分析
import tabRelatedAnalysis from "./components/tabRelatedAnalysis"; // 相关分析
import tabMultivariateRegression from "./components/tabMultivariateRegression"; // 多因素回归
import tabSubsistenceAnalysis from "./components/tabSubsistenceAnalysis"; // 生存分析
import DescriptiveStatistics from "./components/DescriptiveStatistics";

export default {
  name: "StatisticAnalysisCom",
  components: {
    LeftDrag,
    tabDescriptiveStatistics,
    tabUnivariateAnalysis,
    tabRelatedAnalysis,
    tabMultivariateRegression,
    tabSubsistenceAnalysis,
    DescriptiveStatistics
  },
  data() {
    return {
      activeName: "tabDescriptiveStatistics", // 切换组件
      activeValue: "描述性统计", // 显示名字
      // 切换tab数据
      tabList: [
        { name: "tabDescriptiveStatistics", value: "描述性统计" },
        { name: "tabUnivariateAnalysis", value: "单因素分析" },
        { name: "tabRelatedAnalysis", value: "相关分析" },
        { name: "tabMultivariateRegression", value: "多因素回归" },
        { name: "tabSubsistenceAnalysis", value: "生存分析" }
      ]
    };
  },
  mounted() {
    // this.FenLeiBianLiangMiaoShuTongJiFun();
  },
  methods: {
    FenLeiBianLiangMiaoShuTongJiFun() {
      const param = {
        name: "name,sex"
      };
      FenLeiBianLiangMiaoShuTongJi(param).then(res => {
        console.log(res);
      });
    },
    // tab 切换
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.activeValue = tab.label;
      console.log(tab, "tab");
      console.log(event);
    },
    //拖拽完成事件
    add(e) {
      console.log(e, "add");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.statisticAnalysis-com {
  margin-top: 10px;
  height: 30%;
  .left {
    width: 200px;
    vertical-align: top;
    margin-right: 15px;
    margin: 10px;
  }
  .right {
    margin: 10px;
    vertical-align: top;
    width: calc(100% - 255px);
    .tab {
      margin-bottom: 15px;
      background: #ffffff;
    }
  }
}
// .ghost {
//   display: flex;
//   justify-content: space-between;
//   line-height: 35px;
//   margin: 10px 0;
//   .button {
//     border: 1px dashed #e6e6e6;
//     width: 155px;
//     overflow: hidden;
//     padding: 0 5px;
//     margin-right: 10px;
//     .iconfont {
//       color: #0070f4;
//       margin-right: 5px;
//     }
//   }
// }
</style>
<style lang="scss">
.statisticAnalysis-com {
  .right {
    .el-tabs__nav-wrap {
      padding: 0 20px;
      line-height: 48px;
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
    }
  }
}
</style>

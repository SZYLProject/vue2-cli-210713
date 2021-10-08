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
      <component :clientHeight="clientHeight" :is="activeNameInfo"></component>
    </div>
  </div>
</template>
<script>
// 导入draggable组件
import LeftDrag from "./components/LeftDrag"; //
import tabDescriptiveStatistics from "./components/tabDescriptiveStatistics"; // 统计性描述
import tabUnivariateAnalysis from "./components/tabUnivariateAnalysis"; // 单因素分析
import tabRelatedAnalysis from "./components/tabRelatedAnalysis"; // 相关分析
import tabMultivariateRegression from "./components/tabMultivariateRegression"; // 多因素回归
import tabSubsistenceAnalysis from "./components/tabSubsistenceAnalysis"; // 生存分析
import DescriptiveStatistics from "./components/DescriptiveStatistics";
import UnivariateAnalysis from "./components/UnivariateAnalysis";
import SubsistenceAnalysis from "./components/SubsistenceAnalysis";
import RelatedAnalysis from "./components/RelatedAnalysis";
import MultivariateRegression from "./components/MultivariateRegression";
import leftDraggableListData from "./Mock/leftDraggableListData";
import statisticalAnalysis from "@/api/statisticalAnalysis";
import { getSessionStore } from "@/utils/mUtils";

export default {
  name: "StatisticAnalysisCom",
  components: {
    LeftDrag,
    tabDescriptiveStatistics,
    tabUnivariateAnalysis,
    tabRelatedAnalysis,
    tabMultivariateRegression,
    tabSubsistenceAnalysis,
    DescriptiveStatistics,
    UnivariateAnalysis,
    SubsistenceAnalysis,
    RelatedAnalysis,
    MultivariateRegression
  },
  data() {
    return {
      activeName: "tabUnivariateAnalysis", // 切换组件
      activeNameInfo: "UnivariateAnalysis",
      activeValue: "单因素分析", // 显示名字
      // 切换tab数据
      tabList: [
        {
          name: "tabDescriptiveStatistics",
          info: "DescriptiveStatistics",
          value: "描述性统计"
        },
        {
          name: "tabUnivariateAnalysis",
          info: "UnivariateAnalysis",
          value: "单因素分析"
        },
        {
          name: "tabRelatedAnalysis",
          info: "RelatedAnalysis",
          value: "相关分析"
        },
        {
          name: "tabMultivariateRegression",
          info: "MultivariateRegression",
          value: "多因素回归"
        },
        {
          name: "tabSubsistenceAnalysis",
          info: "SubsistenceAnalysis",
          value: "生存分析"
        }
      ],
      clientHeight: 410
    };
  },
  mounted() {
    this.GetVariables();
    this.getHeight();
    // const data = leftDraggableListData;
    // this.$store.dispatch("setLeftDraggableList", leftDraggableListData);
  },
  methods: {
    // 控制每个展示echart图与table表格区域的高度
    getHeight() {
      this.clientHeight = `${document.documentElement.clientHeight}` - 337; //获取浏览器可视区域高度
      // window.onresize = function() {
      //   this.clientHeight = `${document.documentElement.clientHeight}`;
      //   this.clientHeight = this.clientHeight - 1080 ;
      // };
    },
    // 左侧栏变量数据
    GetVariables() {
      const data = {
        projectId: 1
      };

      if (getSessionStore("isMock") === 0) {
        this.$store.dispatch("setLeftDraggableList", leftDraggableListData);
        return;
      }
      statisticalAnalysis.GetVariables(data).then(res => {
        const data = res.data.map(item => {
          return {
            ...item,
            name: item.variableCode,
            value: item.variableName,
            fillRate: "100.00"
          };
        });
        console.log(data, "GetVariables");
        this.$store.dispatch("setLeftDraggableList", data);
      });
    },
    // tab 切换
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.activeValue = tab.label;
      this.activeNameInfo = tab.name.slice(3);
      console.log(tab, "tab");
      console.log(event);
      this.$store.dispatch("setTabListIndex", tab.index);
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
      // margin-bottom: 15px;
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

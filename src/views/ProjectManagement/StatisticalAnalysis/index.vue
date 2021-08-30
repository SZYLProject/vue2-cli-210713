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
            :label="item"
            :name="item"
          >
            <div class="tab-con">
              <h1>{{ activeName }}<span>描述数据特征</span></h1>
              <div id="variable" class="drag">
                <div style="display:flex">
                  <p style="font-size:13px;margin-right:5px">任意变量</p>
                  <i style="cursor:pointer" class="el-icon-info"></i>
                </div>
                <div style="margin-top:10px;height:25px">
                  <draggable
                    animation="1000"
                    touchStartThreshold="10px"
                    :list="variableList"
                    group="variable"
                    ghostClass="ghost"
                    chosenClass="ghost"
                    @change="toChange"
                  >
                    <el-button
                      size="small"
                      v-for="(item, index) in variableList"
                      :key="index"
                      >{{ item.name }}</el-button
                    >
                  </draggable>
                </div>
              </div>
              <div class="tab-foot">
                <div style="font-size:13px">
                  您可拖入<span class="blue">5</span>个变量
                </div>
                <div>
                  <el-button type="text" icon="el-icon-delete"
                    >清空变量</el-button
                  >
                  <el-button type="primary" size="mini">开始分析</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <DescriptiveStatistics></DescriptiveStatistics>
    </div>
  </div>
</template>
<script>
// 导入draggable组件
import draggable from "vuedraggable";
import LeftDrag from "./components/LeftDrag"; //
import DescriptiveStatistics from "./components/DescriptiveStatistics";
export default {
  name: "StatisticAnalysisCom",
  components: { LeftDrag, draggable, DescriptiveStatistics },
  props: ["sureFormList"],
  data() {
    return {
      variableList: [],
      variableList1: [],
      activeName: "描述性统计",
      tabList: [
        "描述性统计",
        "单因素分析",
        "相关分析",
        "多因素回归",
        "生存分析"
      ]
    };
  },
  methods: {
    // tab 切换
    handleClick(tab, event) {
      this.activeName = tab.name;
      console.log(event);
    },
    // 拖拽
    toChange(v) {
      if (v.added) {
        console.log(v);
        // this.variableList.push({
        //   name: '1'
        // })
      }
      console.log(this.variableList);
    },
    toChange1(v) {
      console.log(v);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.statisticAnalysis-com {
  margin-top: 20px;
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
      background: #ffffff;
    }
    .tab-con {
      padding: 0 20px 15px;
      h1 {
        font-size: 15px;
        color: #333333;
        span {
          font-size: 10px;
          color: #999999;
          margin-left: 10px;
        }
      }
      .drag {
        background: #f1f8ff;
        border: 1px solid #e6e6e6;
        margin: 15px 0 5px;
        padding: 10px 15px;
        color: #999999;
      }
      .tab-foot {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        color: #999999;
        .blue {
          margin: 0 5px;
          color: #0070f4;
        }
      }
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

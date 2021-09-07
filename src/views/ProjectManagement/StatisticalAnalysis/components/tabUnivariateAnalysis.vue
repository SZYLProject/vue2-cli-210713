<template>
  <div>
    <div class="tab-con">
      <h1>{{ activeValue }}<span>描述数据特征</span></h1>
      <drag-area :draggableObj="draggableObj" @startAnalysis="startAnalysis"></drag-area>
    </div>
  </div>
</template>
<script>
import univariateAnalysisData from "../Mock/univariateAnalysisData.js";
import dragArea from "./dragArea.vue";
export default {
  components: {
    dragArea
  },
  props: {
    activeValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return { draggableObj: {
        draggableNum: 2,
        prompt: "您可拖入0个分组变量，5个观察变量",
        draggableList: [
          { explanation: "分组变量", draggableNum: 0 },
          { explanation: "观察变量", draggableNum: 5 }
        ]
      }};
  },
  methods: {
    // 开始分析
    startAnalysis(startAnalysis) {
      console.log(startAnalysis, "startAnalysis");
      let data = [];
      startAnalysis.forEach((element, i) => {
        data.push({
          id: i,
          name: element.name + univariateAnalysisData[0].name,
          data: univariateAnalysisData[0].data
        });
      });
      this.$store.dispatch("setUnivariateAnalysisData", data);
    }
  }
};
</script>
<style scoped lang="scss">
.tab-con {
  padding: 15px;
  h1 {
    font-size: 15px;
    color: #333333;
    span {
      font-size: 10px;
      color: #999999;
      margin-left: 10px;
    }
  }
}
</style>

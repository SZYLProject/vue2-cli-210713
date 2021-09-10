<template>
  <div>
    <div class="tab-con">
      <h1>{{ activeValue }}<span>描述数据特征</span></h1>
      <drag-area
        :draggableObj="draggableObj"
        @startAnalysis="startAnalysis"
      ></drag-area>
    </div>
  </div>
</template>
<script>
import subsistenceAnalysisData from "../Mock/subsistenceAnalysis.js";
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
    return {
      draggableObj: {
        draggableNum: 3,
        prompt: "您可拖入1个结局变量，5个生存时间变量,5个自变量",
        draggableList: [
          { explanation: "结局变量", draggableNum: 1 },
          { explanation: "生存时间", draggableNum: 5 },
          { explanation: "自变量", draggableNum: 5 }
        ]
      }
    };
  },
  methods: {
    // 开始分析
    startAnalysis(startAnalysis) {
      console.log(startAnalysis, "startAnalysis");
      let data = [];
      startAnalysis.forEach((element, i) => {
        data.push({
          id: i,
          name: element.name + subsistenceAnalysisData[0].name,
          data: subsistenceAnalysisData[0].data
        });
      });
      this.$store.dispatch("setSubsistenceAnalysisData", data);
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

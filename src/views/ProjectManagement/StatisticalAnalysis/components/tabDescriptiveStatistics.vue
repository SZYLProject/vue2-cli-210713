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
import descriptiveStatisticsData from "../Mock/descriptiveStatisticsData.js";
import dragArea from "./dragArea.vue";
import statisticalAnalysis from "@/api/statisticalAnalysis";

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
        draggableNum: 1,
        prompt: "您可拖入5个变量",
        draggableList: [{ explanation: "任意变量", draggableNum: 5 }]
      },
      temporaryVar1: null
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
          name: element.name + descriptiveStatisticsData[0].name,
          data: descriptiveStatisticsData[0].data
        });
      });
      this.fenZuTongJiFun().then(list => {
        this.temporaryVar1 = list;
      this.$store.dispatch("setDescriptiveStatisticsData", data);

      });
      // console.log(this.temporaryVar1, "test10");

      // this.$store.dispatch("setDescriptiveStatisticsData", data);
    },
    async fenZuTongJiFun() {
      const data = {
        name: "trt",
        data: [
          {
            trt: "1time",
            response: 3.8612
          },
          {
            trt: "1time",
            response: 10.3868
          },
          {
            trt: "1time",
            response: 5.9059
          },
          {
            trt: "1time",
            response: 3.0609
          }
        ]
      };
      let value = await statisticalAnalysis.fenZuTongJi(data).then(res => {
        return res[0]['1time'][0];
      });
      console.log(value,'value');
      return value;
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

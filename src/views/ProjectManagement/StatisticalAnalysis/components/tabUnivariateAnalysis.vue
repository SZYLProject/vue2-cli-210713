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
import univariateAnalysisData from "../Mock/univariateAnalysisData.js";
import statisticalAnalysis from "@/api/statisticalAnalysis";
import { getSessionStore } from "@/utils/mUtils";
import { getObjectKeys } from "@/utils/objectArray";
import dataInterpretation from "@/utils/dataInterpretation";
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
        draggableNum: 2,
        prompt: "您可拖入1个分组变量，5个观察变量",
        draggableList: [
          { explanation: "分组变量", draggableNum: 1 },
          { explanation: "观察变量", draggableNum: 5 }
        ],
        returnGroup: true // 按照分组返回分组变量和观察变量
      }
    };
  },
  methods: {
    // 开始分析
    startAnalysis(startAnalysis) {
      console.log(startAnalysis, "startAnalysis");
      let data = [];
      startAnalysis[1].forEach((element, i) => {
        data.push({
          id: i,
          name: element.value + univariateAnalysisData[0].name,
          data: univariateAnalysisData[0].data
        });

        if (getSessionStore("isMock") === 0) {
          this.$store.dispatch("setUnivariateAnalysisData", data);
          return;
        }
        this.zhengTaiJianYan(element.variableCode, "sex").then(res => {
          console.log(res, "res");
          data[i].data.tableData = res;
          data[i].data.colConfigs = getObjectKeys(res[0]).map(item => {
            return {
              prop: item,
              label: item ? dataInterpretation[item] : item,
              "min-width": 40,
              sort: false,
              align: "center"
            };
          });
          this.$store.dispatch("setUnivariateAnalysisData", data);
        });
      });
    },
    async zhengTaiJianYan(variableCode, fenZuCode) {
      const data = {
        projectId: 1,
        lianXuCode: variableCode,
        fenZuCode: fenZuCode
      };
      let value = await statisticalAnalysis.zhengTaiJianYan(data).then(res => {
        console.log(JSON.parse(res.data), "zhengTaiJianYan");
        const data = JSON.parse(res.data);
        return data;
      });
      return value;
    },
    async fangChaQiXingJianYan(variableCode) {
      const data = {
        projectId: 1,
        variableCode: variableCode
      };
      let value = await statisticalAnalysis
        .fangChaQiXingJianYan(data)
        .then(res => {
          console.log(JSON.parse(res.data), "fangChaQiXingJianYan");
          const data = JSON.parse(res.data);
          return data;
        });
      return value;
    },
    async zhiHeJianYan(variableCode) {
      const data = {
        projectId: 1,
        variableCode: variableCode
      };
      let value = await statisticalAnalysis.zhiHeJianYan(data).then(res => {
        console.log(JSON.parse(res.data), "zhiHeJianYan");
        const data = JSON.parse(res.data);
        return data;
      });
      return value;
    },
    async TJianYan(variableCode) {
      const data = {
        projectId: 1,
        variableCode: variableCode
      };
      let value = await statisticalAnalysis.TJianYan(data).then(res => {
        console.log(JSON.parse(res.data), "yiBanXingMiaoShu");
        const data = JSON.parse(res.data);
        return data;
      });
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

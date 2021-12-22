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
import relatedAnalysisData from "../Mock/relatedAnalysisData.js";
import dragArea from "./dragArea.vue";
import { getSessionStore } from "@/utils/mUtils";
import statisticalAnalysis from "@/api/statisticalAnalysis";
import {
  unid,
  getObjectKeys,
  getObjectValues,
  getObjectParseValues,
  getObjectKeysValues
} from "@/utils/objectArray";
import { Message } from "element-ui";

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
        prompt: "您可拖入1个变量1，1个变量2",
        draggableList: [
          { explanation: "变量1", draggableNum: 1 },
          { explanation: "变量2", draggableNum: 1 }
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
          name: element.name + relatedAnalysisData[0].name,
          data: relatedAnalysisData[0].data
        });
      });

      // data.push({
      //     id: 0,
      //     name: relatedAnalysisData[0].name + relatedAnalysisData[1].name,
      //     data: relatedAnalysisData[0].data
      //   });

      if (getSessionStore("isMock") === 0) {
        this.$store.dispatch("setRelatedAnalysisData", data);
        return;
      }
      console.log(data, "datadat");

      this.XiangGuanXingFenxi(
        startAnalysis[0].variableCode,
        startAnalysis[1].variableCode
      ).then(res => {
        console.log(res, "res");
        if (res["相关性分析"]) {
          Message.error(res['相关性分析'] || "Verification failed, please login again");

          return;
        }
        const resDataConfigs = getObjectKeys(getObjectValues(res)[0][0]).map(
          item => {
            return {
              prop: item,
              label: item == "name" ? "变量的取值" : item,
              "min-width": 40,
              sort: false,
              align: "center"
            };
          }
        );
        data[0].data.colConfigs = resDataConfigs;
        if (res["推荐"]) {
          const objTuijian = res["推荐"];
          console.log(objTuijian, "objTuijian");
        }

        const resDataTable = [];
        for (const key in res) {
          if (key === "推荐") {
            continue;
          }
          resDataTable.push(...res[key]);
          // for (let index = 0; index < res[key].length; index++) {
          //   resDataTable.push(res[key][index])
          // }
        }
        data[0].data.tableData = resDataTable;

        console.log(resDataTable, "resDataTable");

        this.$store.dispatch("setRelatedAnalysisData", data);
      });
    },
    XiangGuanXingFenxi(variableCode1, variableCode2) {
      const data = {
        variableCode1: variableCode1,
        variableCode2: variableCode2
      };
      let value = statisticalAnalysis.XiangGuanXingFenxi(data).then(res => {
        console.log(res.data, "XiangGuanXingFenxi");
        // const data = res.data;
        return res.data;
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

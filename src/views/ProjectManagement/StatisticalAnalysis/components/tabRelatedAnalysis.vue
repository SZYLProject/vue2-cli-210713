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
  // unid,
  getObjectKeys,
  getObjectValues
  // getObjectParseValues,
  // getObjectKeysValues
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
      startAnalysis[0].forEach((element, i) => {
        data.push({
          id: i,
          name: relatedAnalysisData[0].name,
          data: relatedAnalysisData[0].data
        });

        if (getSessionStore("isMock") === 0) {
          this.$store.dispatch("setRelatedAnalysisData", data);
          return;
        }

        this.XiangGuanXingFenxi(
          element.variableCode,
          startAnalysis[1][i].variableCode
        ).then(res => {
          if (res.length === 0) {
            // data[i] = null;
            data.splice(i, 1);
          }

          if (data[i]) {
            const resDataValue = res; // 存储返回值数据
            // 存储推荐名称
            if (resDataValue["推荐"]) {
              data[i].data.recommendValue = resDataValue["推荐"];
              delete resDataValue["推荐"];
            }

            // 存储表格title
            const resDataConfigs = getObjectKeys(
              getObjectValues(resDataValue)[0][0]
            ).map(item => {
              return {
                prop: item,
                label: item == "name" ? "变量的取值" : item,
                "min-width": 40,
                sort: false,
                align: "center"
              };
            });
            data[i].data.colConfigs = resDataConfigs;

            // 存储表格数据
            const resDataTable = [];
            for (const key in resDataValue) {
              resDataTable.push(...resDataValue[key]);
            }
            data[i].data.tableData = resDataTable;
          }
          // 存储数据显示table
          this.$store.dispatch("setRelatedAnalysisData", data);
        });
      });
    },
    XiangGuanXingFenxi(variableCode1, variableCode2) {
      const data = {
        variableCode1: variableCode1,
        variableCode2: variableCode2
      };
      let value = statisticalAnalysis.XiangGuanXingFenxi(data).then(res => {
        // console.log(res.data, "XiangGuanXingFenxi");
        if (res.code !== 1000) {
          return [];
        }
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

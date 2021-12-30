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
import { getSessionStore } from "@/utils/mUtils";
import statisticalAnalysis from "@/api/statisticalAnalysis";
import { Message } from "element-ui";

import {
  // unid,
  getObjectKeys,
  getObjectValues
  // getObjectParseValues,
  // getObjectKeysValues
} from "@/utils/objectArray";
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
        prompt: "您可拖入1个结局变量，1个生存时间变量,5个自变量",
        draggableList: [
          { explanation: "结局变量", draggableNum: 1 },
          { explanation: "生存时间", draggableNum: 1 },
          { explanation: "自变量", draggableNum: 5 }
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
      startAnalysis[2].forEach((element, i) => {
        data.push({
          id: i,
          name: element.name + subsistenceAnalysisData[0].name,
          data: subsistenceAnalysisData[0].data
        });
        if (getSessionStore("isMock") === 0) {
          this.$store.dispatch("setSubsistenceAnalysisData", data);

          return;
        }

        const dataValue = {
          fenxiCode: startAnalysis[0][0].variableCode,
          shengCunShiJianCode: startAnalysis[1][0].variableCode,
          jiejuCode: element.variableCode,
          codeType_x: element.variableType
        };
        this.shenCunFenXi(dataValue).then(res => {
          // 如果没有数据则提示
          if (!res) {
            this.$store.dispatch("setSubsistenceAnalysisData", (data = []));
            Message.error(res || "Verification failed, please login again");
            return;
          }

          let resDataValue = res; // 存储返回值数据
          delete resDataValue["中位生存时间"];

          // 存储表格title
          const resDataConfigs = getObjectKeys(resDataValue).map(item => {
            return {
              prop: item,
              label: item == "name" ? "变量的取值" : item,
              "min-width": 40,
              sort: false,
              align: "center"
            };
          });
          data[i].data.colConfigs = resDataConfigs;

          const resDataData = [{}];
          Object.keys(resDataValue).forEach(key => {

            resDataData[0][key]= resDataValue[key][0]
            console.log(resDataData);
          });

          // 存储表格数据
          data[i].data.tableData = resDataData;

          // 存储数据显示table
          this.$store.dispatch("setSubsistenceAnalysisData", data);
        });
      });
    },
    async shenCunFenXi(dataValue) {
      let value = await statisticalAnalysis
        .shenCunFenXi(dataValue)
        .then(res => {
          console.log(res.data, "shenCunFenXi");
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

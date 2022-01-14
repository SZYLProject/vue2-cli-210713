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
import multivariateRegressionData from "../Mock/multivariateRegressionData.js";
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
        prompt: "您可拖入1个因变量，5个自变量",
        draggableList: [
          { explanation: "变量1", draggableNum: 1 },
          { explanation: "变量2", draggableNum: 5 }
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
      const variableCode1 = startAnalysis[0][0].variableCode;
      const variableCode2 = startAnalysis[1]
        .map(item => {
          return item.variableCode;
        })
        .toString();
      console.log(variableCode2, "variableCode2");
      console.log(variableCode1, "variableCode1");
      // startAnalysis[1].forEach((element, i) => {
      //   data.push({
      //     id: i,
      //     name: element.name + multivariateRegressionData[0].name,
      //     data: multivariateRegressionData[0].data
      //   });
      // });

      data.push({
        id: 0,
        name: multivariateRegressionData[0].name, // 显示的名字，回归模型统计表
        data: multivariateRegressionData[0].data
      });

      if (getSessionStore("isMock") === 0) {
        this.$store.dispatch("setMultivariateRegressionData", data);
        return;
      }
      this.huiGuiFenxi(variableCode1, variableCode2).then(res => {
        if (res.length === 0) {
          data = [];
          // data.splice(0, 1);
        }
        // // 如果没有数据则提示
        // if (typeof res === "string") {
        //   this.$store.dispatch("setRelatedAnalysisData", (data = []));
        //   Message.error(res || "Verification failed, please login again");
        //   return;
        // }
        if (data?.length > 0) {
          const resDataValue = res; // 存储返回值数据

          // 存储表格title
          const resDataConfigs = getObjectKeys(resDataValue[0]).map(item => {
            return {
              prop: item,
              label: item == "name" ? "变量的取值" : item,
              "min-width": 40,
              sort: false,
              align: "center"
            };
          });
          data[0].data.colConfigs = resDataConfigs;

          // 存储表格数据
          data[0].data.tableData = resDataValue;
        }

        // 存储数据显示table
        this.$store.dispatch("setMultivariateRegressionData", data);
      });
    },
    huiGuiFenxi(variableCode1, variableCode2) {
      const data = {
        variableCode1: variableCode1,
        variableCode2: variableCode2
      };
      let value = statisticalAnalysis.huiGuiFenxi(data).then(res => {
        console.log(res.data, "huiGuiFenxi");
        // const data = res.data;

        if (res.code !== 1000) {
          return [];
        }
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

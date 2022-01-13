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
import { getObjectKeys } from "@/utils/objectArray";
import dataInterpretation from "@/utils/dataInterpretation";
import { getSessionStore } from "@/utils/mUtils";
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
      console.log(dataInterpretation, "dataInterpretation");
      console.log(startAnalysis, "startAnalysis");
      let data = [];
      startAnalysis.forEach((element, i) => {
        // 当前按照第一组数据push假数据，之后调用接口替换此数据
        data.push({
          id: i,
          name: element.value + descriptiveStatisticsData[0].name,
          data: descriptiveStatisticsData[0].data
        });

        console.log(getSessionStore("isMock"), "(getSessionStore(isMock)");

        if (getSessionStore("isMock") === 0) {
          this.$store.dispatch("setDescriptiveStatisticsData", data);
          return;
        }

        this.yiBanXingMiaoShu(element.variableCode).then(list => {
          if (list.length === 0) {
            data[i] = null;
            data.splice(i, 1);
          } else {
            if (data[i]) {
              data[i].data.tableData = list;
              data[i].data.colConfigs = getObjectKeys(list[0]).map(item => {
                return {
                  prop: item,
                  label: item ? dataInterpretation[item] : item,
                  "min-width": 40,
                  sort: false,
                  align: "center"
                };
              });
            }
          }
          // console.log(list, "list");

          this.$store.dispatch("setDescriptiveStatisticsData", data);
        });

        // this.zhengTaiJianYan(element.variableCode).then(res => {
        //   console.log(res, "reszhengTaiJianYan");

        //   // let resTable = getObjectKeysValues(res);
        //   // data[i].data.tableData2 = resTable;
        //   // data[i].data.colConfigs2 = getObjectKeys(resTable[0]).map(item => {
        //   //   return {
        //   //     prop: item,
        //   //     label: item == "name" ? "变量的取值" : item,
        //   //     "min-width": 40,
        //   //     sort: false,
        //   //     align: "center"
        //   //   };
        //   // });
        //   // // 最后一位移动到第一位
        //   // const last = data[i].data.colConfigs2.pop(); //取数组最后一项
        //   // data[i].data.colConfigs2.unshift(last); //插入数组第一位

        //   // this.$store.dispatch("setUnivariateAnalysisData", data);
        // });
      });
    },
    async yiBanXingMiaoShu(variableCode) {
      const data = {
        variableCode: variableCode
      };
      let value = await statisticalAnalysis.yiBanXingMiaoShu(data).then(res => {
        // console.log(JSON.parse(res.data), "yiBanXingMiaoShu");
        if (res.code !== 1000) {
          return [];
        }
        const data = res.data;
        return data;
      });
      return value;
    },

    // zhengTaiJianYan(variableCode) {
    //   const data = {
    //     lianXuCode: variableCode,
    //     fenZuCode: ""
    //   };
    //   let value = statisticalAnalysis.zhengTaiJianYan(data).then(res => {
    //     console.log(res.data, "zhengTaiJianYan");
    //     // const data = res.data;
    //     return res.data;
    //   });
    //   return value;
    // },

    // ---------------------------------废弃-------------------
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
        return res[0]["1time"][0];
      });
      console.log(value, "value");
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

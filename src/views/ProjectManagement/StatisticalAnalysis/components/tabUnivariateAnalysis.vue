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
import {
  unid,
  getObjectKeys,
  getObjectValues,
  getObjectParseValues,
  getObjectKeysValues
} from "@/utils/objectArray";
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
        prompt: "您可拖入1个分组变量，1个观察变量",
        draggableList: [
          { explanation: "分组变量", draggableNum: 1 },
          { explanation: "观察变量", draggableNum: 1 }
        ],
        returnGroup: true, // 按照分组返回分组变量和观察变量
        groupTableData: [],
        groupColConfigs: []
      }
    };
  },
  methods: {
    // 开始分析
    startAnalysis(startAnalysis) {
      let data = [];
      // 当前选择的分组为第一个
      const lianxuCode = startAnalysis[0][0].variableCode;
      startAnalysis[1].forEach((element, i) => {
        data.push({
          id: i,
          name: element.value + univariateAnalysisData[0].name, // 显示title
          data: univariateAnalysisData[0].data
        });

        if (getSessionStore("isMock") === 0) {
          this.$store.dispatch("setUnivariateAnalysisData", data);
          return;
        }
        // 一般性描述已经出来
        this.yiBanXingMiaoShu(element.variableCode).then(list => {
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
          this.$store.dispatch("setUnivariateAnalysisData", data);
        });

        this.zhengTaiJianYan(element.variableCode, lianxuCode).then(res => {
          let resTable = getObjectKeysValues(res);
          data[i].data.tableData2 = resTable;
          // 设置推荐数组
          data[i].data.recommendList2 = resTable.map(item => {
            return item.flag;
          });
          data[i].data.colConfigs2 = getObjectKeys(resTable[0]).map(item => {
            return {
              prop: item,
              label: item == "name" ? "变量的取值" : item,
              "min-width": 40,
              sort: false,
              align: "center"
            };
          });
          // 去除flag项
          data[i].data.colConfigs2.map((item, i) => {
            if (item.prop === "flag") {
              data[i].data.colConfigs2.splice(i, 1);
            }
          });
          // 最后一位移动到第一位
          const last = data[i].data.colConfigs2.pop(); //取数组最后一项
          data[i].data.colConfigs2.unshift(last); //插入数组第一位

          this.$store.dispatch("setUnivariateAnalysisData", data);
        });

        // 方差齐性已经出来
        this.fangChaQiXingJianYan(element.variableCode, lianxuCode).then(
          res => {
            data[i].data.tableData3 = res;
            data[i].data.colConfigs3 = getObjectKeys(res[0]).map(item => {
              return {
                prop: item,
                label: item,
                "min-width": 40,
                sort: false,
                align: "center"
              };
            });
            this.$store.dispatch("setUnivariateAnalysisData", data);
          }
        );

        // 组间比较：
        // this.zhiHeJianYan(element.variableCode, lianxuCode).then(res => {
        //   this.groupTableData = [];
        //   this.groupColConfigs = [];
        //   this.groupTableData = res;
        // });

        // this.TJianYan(element.variableCode, lianxuCode).then(res => {
        //   let resTable = getObjectParseValues(res);

        //   // resTable = [].concat.apply([], resTable);
        //   resTable = resTable.map(res => {
        //     return res[0];
        //   });
        //   // this.groupTableData.push();
        //   resTable.map(res => {
        //     this.groupTableData.push(res);
        //   });
        //   this.groupColConfigs = getObjectKeys(
        //     this.groupTableData[this.groupTableData.length - 1]
        //   ).map(item => {
        //     return {
        //       prop: item,
        //       label: item,
        //       "min-width": 40,
        //       sort: false,
        //       align: "center"
        //     };
        //   });
        //   data[i].data.tableData4 = this.groupTableData;
        //   data[i].data.colConfigs4 = this.groupColConfigs;
        //   this.$store.dispatch("setUnivariateAnalysisData", data);
        // });

        this.getCompareWay(element.variableCode, lianxuCode).then(res => {
          const resData = res;
          data[i].data.recommendList4 = resData["推荐"];
          delete resData["推荐"];

          let resTable = getObjectParseValues(resData);
          const a = getObjectKeys(resData);
          resTable = resTable.map((res, i) => {
            return { name: a[i], ...res[0] };
          });
          this.groupColConfigs = getObjectKeys(
            resTable[resTable.length - 1]
          ).map(item => {
            return {
              prop: item,
              label: item == "name" ? "变量的取值" : item,
              "min-width": 40,
              sort: false,
              align: "center"
            };
          });
          data[i].data.tableData4 = resTable;
          data[i].data.colConfigs4 = this.groupColConfigs;
          this.$store.dispatch("setUnivariateAnalysisData", data);
        });
      });
    },
    yiBanXingMiaoShu(variableCode) {
      const data = {
        variableCode: variableCode
      };
      let value = statisticalAnalysis.yiBanXingMiaoShu(data).then(res => {
        // console.log(JSON.parse(res.data), "yiBanXingMiaoShu");
        const data = res.data;
        return data;
      });
      return value;
    },
    zhengTaiJianYan(variableCode, fenZuCode) {
      const data = {
        lianXuCode: variableCode,
        fenZuCode: fenZuCode
      };
      let value = statisticalAnalysis.zhengTaiJianYan(data).then(res => {
        console.log(res.data, "zhengTaiJianYan");
        // const data = res.data;
        return res.data;
      });
      return value;
    },
    fangChaQiXingJianYan(variableCode, fenZuCode) {
      const data = {
        lianXuCode: variableCode,
        fenZuCode: fenZuCode
      };
      let value = statisticalAnalysis.fangChaQiXingJianYan(data).then(res => {
        return res.data;
      });
      return value;
    },
    async zhiHeJianYan(variableCode, fenZuCode) {
      const data = {
        lianXuCode: variableCode,
        fenZuCode: fenZuCode
      };
      let value = await statisticalAnalysis.zhiHeJianYan(data).then(res => {
        const data = res.data;
        return data;
      });
      return value;
    },
    async TJianYan(variableCode, fenZuCode) {
      const data = {
        lianXuCode: variableCode,
        fenZuCode: fenZuCode
      };
      let value = await statisticalAnalysis.TJianYan(data).then(res => {
        // const data = res.data;
        return res.data;
      });
      return value;
    },
    async getCompareWay(variableCode, fenZuCode) {
      const data = {
        lianXuCode: variableCode,
        fenZuCode: fenZuCode
      };
      let value = await statisticalAnalysis.getCompareWay(data).then(res => {
        // const data = res.data;
        return res.data;
      });
      return value;
    }
    // async fangChaFenXi(variableCode, fenZuCode) {
    //   const data = {
    //     lianXuCode: variableCode,
    //     fenZuCode: fenZuCode
    //   };
    //   let value = await statisticalAnalysis.fangChaFenXi(data).then(res => {
    //     console.log(res.data, "fangChaFenXi");
    //     const data = res.data;
    //     return data;
    //   });
    //   return value;
    // },
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

<template>
  <div>
    <el-scrollbar style="height: 440px" ref="scroll">
      <div class="describe-block">
        <h1 style="margin-bottom:15px;font-size:15px">Age的描述性统计</h1>
        <el-table :data="tableData" header-cell-class-name="tableTH">
          <el-table-column prop="col1" label="有效频数（%）"> </el-table-column>
          <el-table-column prop="col2" label="缺失值（%）"> </el-table-column>
          <el-table-column prop="col3" label="均值"> </el-table-column>
          <el-table-column prop="col4" label="标准差"> </el-table-column>
          <el-table-column prop="col5" label="最小值"> </el-table-column>
          <el-table-column prop="col6" label="Q1"> </el-table-column>
          <el-table-column prop="col7" label="中间位"> </el-table-column>
          <el-table-column prop="col8" label="Q3"> </el-table-column>
          <el-table-column prop="col9" label="最大值"> </el-table-column>
          <!-- <el-table-column prop="col10"
                           label="Sha piro-Wilk正态性">
          </el-table-column> -->
        </el-table>
        <div class="text">
          <p style="font-size:14px"><b>统计结果说明: </b></p>
          <p style="font-size:13px">
            1、Shapiro-Wilk正态性检验：Shapiro-Wilk正态性检验的P值>0.05，接受原假设，说明Age变量服从正态分布。通常适用于样本量小于2000的情况。<br />
            2、Kolmogorov-Smirnov正态性检验：Kolmogorov-Smirnov正态性检验的P值=
            0.05，拒绝原假设，说明Age变量不服从正态分布。通常适用于样本量大于2000的情况。
          </p>
        </div>
        <div class="describe-chart">
          <div class="chartsBar">
            <VerticalAxisBar
              height="400px"
              width="100%"
              id="3"
              :titleShow="true"
              title="Smoking history在不同Gender分组中的堆积柱形图"
              :data="data1"
            />
          </div>
          <el-row style="display:none">
            <el-col :span="12">
              <div class="chartsBar">
                <Bar
                  height="400px"
                  width="100%"
                  id="9"
                  titleLocal="left"
                  title="Age频数直方图"
                  :dataX="barDataX"
                  :dataY="barDataY"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="chartsBar">
                <Pie
                  height="400px"
                  width="100%"
                  title="Drinking History 频数饼图"
                  titleLocal="left"
                  labelPosition="center"
                  id="7"
                  :data="pieData"
                />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import Pie from "@/components/echarts/Pie";
import Bar from "@/components/echarts/Bar";
import VerticalAxisBar from "@/components/echarts/VerticalAxisBar";
export default {
  components: { Pie, Bar, VerticalAxisBar },
  data() {
    return {
      tableData: [
        {
          col1: "200(100%)",
          col2: "0(0.0%)",
          col3: "45.31",
          col4: "11.04",
          col5: "17.00",
          col6: "38.00",
          col7: "45.00",
          col8: "53.25",
          col9: "73.00"
        }
      ],
      pieData: [
        { value: 435, name: "是" },
        { value: 310, name: "否" }
      ],
      barDataY: [123, 456, 1102, 4230, 3520, 1102, 123],
      barDataX: [17, 28, 45, 88, 100, 200, 300],
      data1: {
        name: ["待录入", "录入中", "已提交"],
        color: [
          "rgba(0,112,244,0.5)",
          "rgba(76,204,161,0.5)",
          "rgba(255,149,64,0.5)"
        ],
        allData: [
          {
            title: "合计",
            value: [320, 302, 301]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          },
          {
            title: "合计",
            value: [10, 382, 591]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          },
          {
            title: "合计",
            value: [10, 382, 591]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          },
          {
            title: "合计",
            value: [420, 332, 501]
          }
        ]
      }
    };
  }
};
</script>
<style scoped lang="scss">
.describe-block {
  background: #ffffff;
  // margin-top: 15px;
  padding: 15px 20px;
  h1 {
    font-size: 15px;
    color: #333333;
  }
  .text {
    padding-top: 5px;
    color: #666666;
    line-height: 25px;
    padding-bottom: 10px;
  }
  .describe-chart {
    border-top: 1px solid #e6e6e6;
    padding: 15px 0;
  }
}
</style>

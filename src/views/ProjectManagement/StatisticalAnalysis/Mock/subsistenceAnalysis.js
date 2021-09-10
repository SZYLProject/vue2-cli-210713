
const subsistenceAnalysisData = [
    {
      id: 1,
      name: "的描述性统计",
      data: {
        colConfigs: [
          {
            prop: "col1",
            label: "有效频数",
            "min-width": 40,
            sort: false,
            align: "center"
          },
          {
            prop: "col2",
            label: "缺失值(%)",
            "min-width": 40,
            sort: false,
            align: "center"
          },
          {
            prop: "col3",
            label: "均值",
            "min-width": 40,
            sort: false,
            align: "center"
          },
          {
            prop: "col4",
            label: "标准差",
            "min-width": 40,
            sort: false,
            align: "center"
          },
          {
            prop: "col5",
            label: "最小值",
            "min-width": 40,
            sort: false,
            align: "center"
          },
          {
            prop: "col6",
            label: "Q1",
            "min-width": 40,
            sort: false,
            align: "center"
          },
          {
            prop: "col7",
            label: "中间位",
            "min-width": 40,
            sort: false,
            align: "center"
          },
          {
            prop: "col8",
            label: "Q3",
            "min-width": 40,
            sort: false,
            align: "center"
          },
          {
            prop: "col9",
            label: "最大值",
            "min-width": 40,
            sort: false,
            align: "center"
          }
        ],
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
        },
        statisticalResultsData: {
          name: "统计结果说明:",
          data: [
            "1、Shapiro-Wilk正态性检验：Shapiro-Wilk正态性检验的P值>0.05，接受原假设，说明Age变量服从正态分布。通常适用于样本量小于2000的情况。<br />",
            "2、Kolmogorov-Smirnov正态性检验：Kolmogorov-Smirnov正态性检验的P值=0.05，拒绝原假设，说明Age变量不服从正态分布。通常适用于样本量大于2000的情况。"
          ]
        }
      }
    },
  ];
  
  export default subsistenceAnalysisData;
  
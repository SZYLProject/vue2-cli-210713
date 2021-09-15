// 生存分析mock数据
const subsistenceAnalysisData = [
  {
    id: 1,
    name: "分析多个因素对结局发生的影响程度",
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
      discountData: {
        xAxisData: ["100", "200", "300", "400", "500", "600", "700", "800"],
        seriesData: [
          {
            name: "Step Start",
            value: [0.98, 0.88, 0.8, 0.45, 0.19, 0.1, 0.08, 0.08]
          },
          {
            name: "Step Middle",
            value: [0.95, 0.9, 0.85, 0.8, 0.69, 0.6, 0.02, 0.08]
          },
          {
            name: "Step End",
            value: [0.9, 0.88, 0.8, 0.6, 0.49, 0.32, 0.2, 0.08]
          }
        ]
      },
      statisticalResultsData: {
        name: "统计结果说明:",
        data: [
          "1、所有自变量的P值均>0.05，说明它们对Gender(男)的影响无统计学意义。"
        ]
      }
    }
  }
];

export default subsistenceAnalysisData;

// 描述性统计mock数据
const descriptiveStatisticsData = [
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
      barDataY: [40, 60, 30, 85, 35, 70, 18],
      barDataX: [17, 23, 29, 35, 41, 47, 53, 59],
      statisticalResultsData: {
        name: "统计结果说明:",
        data: [
          "1、Shapiro-Wilk正态性检验：Shapiro-Wilk正态性检验的P值>0.05，接受原假设，说明Age变量服从正态分布。通常适用于样本量小于2000的情况。",
          "2、Kolmogorov-Smirnov正态性检验：Kolmogorov-Smirnov正态性检验的P值=0.05，拒绝原假设，说明Age变量不服从正态分布。通常适用于样本量大于2000的情况。"
        ]
      }
    }
  }
];

export default descriptiveStatisticsData;

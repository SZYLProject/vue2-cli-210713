// 单因素分析mock数据
const relatedAnalysisData = [
  {
    id: 1,
    name: "相关性分析",
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
      scatterData: [
        [-1.067732, -1.176513],
        [-0.42781, -1.0816464],
        [0.995731, 4.550095],
        [0.738336, 4.256571],
        [0.981083, 4.560815],
        [0.526171, 3.929515],
        [0.378887, 3.52617],
        [0.033859, 3.156393],
        [0.132791, 3.110301],
        [0.138306, 3.149813],
        [0.247809, 3.476346],
        [0.64827, 4.119688],
        [0.731209, 4.282233],
        [-0.236833, -1.0486582],
        [0.969788, 4.655492]
      ],
      statisticalResultsData: {
        name: "统计结果说明:",
        data: [
          "1、Logistics回归模型检验采用卡方检验，p值< 0.05 ，说明模型有统计学意义。"
        ]
      },
      recommendValue: "" // 存储推荐的值
    }
  }
];

export default relatedAnalysisData;

// 单因素分析mock数据
const univariateAnalysisData = [
  {
    id: 1,
    name: "的描述性统计",
    data: {
      name1: "一般性描述",
      name2: "正态性检验",
      name3: "方差齐性检验",
      name4: "组件比较",
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
      colConfigs2: [
        // {
        //   slot: "scope",
        // },
        {
          prop: "col1",
          label: "",
          "min-width": 40,
          sort: false,
          align: "center"
        },
        {
          prop: "col2",
          label: "统计量",
          "min-width": 40,
          sort: false,
          align: "center"
        },
        {
          prop: "col3",
          label: "值",
          "min-width": 40,
          sort: false,
          align: "center"
        },
        {
          prop: "col4",
          label: "P值",
          "min-width": 40,
          sort: false,
          align: "center"
        },
        {
          prop: "col5",
          label: "意义",
          "min-width": 40,
          sort: false,
          align: "center"
        }
      ],
      tableData2: [
        {
          col1: "Shapiro-Wilk正态性检验",
          col2: "W",
          col3: "0.9663",
          col4: "0.0694",
          col5: "正态性"
        },
        {
          col1: "One-sample Kolmogorov-Smirnov正态性检验",
          col2: "D",
          col3: "0.1184",
          col4: "0.3134",
          col5: "正态性"
        }
      ],
      colConfigs3: [
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
      tableData3: [
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
      colConfigs4: [
        // {
        //   slot: "scope",
        // },
        {
          prop: "col1",
          label: "",
          "min-width": 40,
          sort: false,
          align: "center"
        },
        {
          prop: "col2",
          label: "统计量",
          "min-width": 40,
          sort: false,
          align: "center"
        },
        {
          prop: "col3",
          label: "值",
          "min-width": 40,
          sort: false,
          align: "center"
        },
        {
          prop: "col4",
          label: "P值",
          "min-width": 40,
          sort: false,
          align: "center"
        },
        {
          prop: "col5",
          label: "意义",
          "min-width": 40,
          sort: false,
          align: "center"
        }
      ],
      tableData4: [
        {
          col1: "Shapiro-Wilk正态性检验",
          col2: "W",
          col3: "0.9663",
          col4: "0.0694",
          col5: "正态性"
        },
        {
          col1: "One-sample Kolmogorov-Smirnov正态性检验",
          col2: "D",
          col3: "0.1184",
          col4: "0.3134",
          col5: "正态性"
        }
      ],
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
      echartsTrue: false, // 是否展示echarts图
      statisticalResultsData: {
        name: "统计结果说明:",
        data: ["1、由于样本量不足或变量类型设置错误，导致无法统计"]
      }
    }
  }
];

export default univariateAnalysisData;

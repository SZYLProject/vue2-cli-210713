const types = {
  LEFT_DRAGGABLE_LIST: "LEFT_DRAGGABLE_LIST",
  DESCRIPTIVESTATISTICS_DATA: "DESCRIPTIVESTATISTICS_DATA",
  UNIVARIATEANALYSIS_DATA: "UNIVARIATEANALYSIS_DATA"
};
const statisticalAnalysis = {
  state: {
    leftDraggableList: [
      {
        name: "年龄",
        value: "100.0"
      },
      {
        name: "性别",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      }
    ],
    descriptiveStatisticsData: [],
    univariateAnalysisData: []
  },
  getters: {
    leftDraggableList: state => state.leftDraggableList,
    descriptiveStatisticsData: state => state.descriptiveStatisticsData,
    univariateAnalysisData: state => state.univariateAnalysisData
  },
  mutations: {
    [types.LEFT_DRAGGABLE_LIST](state, data) {
      state.leftDraggableList = data;
    },
    [types.DESCRIPTIVESTATISTICS_DATA](state, data) {
      state.descriptiveStatisticsData = data;
    },
    [types.UNIVARIATEANALYSIS_DATA](state, data) {
      state.univariateAnalysisData = data;
    }
  },
  actions: {
    setLeftDraggableList: ({ commit }) => {
      commit(types.LEFT_DRAGGABLE_LIST);
    },
    setDescriptiveStatisticsData: ({ commit }, data) => {
      commit("DESCRIPTIVESTATISTICS_DATA", data);
    },
    setUnivariateAnalysisData: ({ commit }, data) => {
      commit("UNIVARIATEANALYSIS_DATA", data);
    }
  }
};

export default statisticalAnalysis;

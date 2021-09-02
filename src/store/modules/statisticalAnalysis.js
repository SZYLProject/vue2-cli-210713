const types = {
  LEFT_DRAGGABLE_LIST: "LEFT_DRAGGABLE_LIST",
  DESCRIPTIVESTATISTICS_DATA: "DESCRIPTIVESTATISTICS_DATA",
  UNIVARIATEANALYSIS_DATA: "UNIVARIATEANALYSIS_DATA"
};
const statisticalAnalysis = {
  state: {
    leftDraggableList: [],
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
    setLeftDraggableList: ({ commit }, data) => {
      commit("LEFT_DRAGGABLE_LIST", data);
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

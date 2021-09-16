const types = {
  LEFT_DRAGGABLE_LIST: "LEFT_DRAGGABLE_LIST",
  DESCRIPTIVESTATISTICS_DATA: "DESCRIPTIVESTATISTICS_DATA",
  UNIVARIATEANALYSIS_DATA: "UNIVARIATEANALYSIS_DATA",
  SUBSISTENCEANALYSIS_DATA: "SUBSISTENCEANALYSIS_DATA",
  RELATEDANALYSIS_DATA: "RELATEDANALYSIS_DATA", // 生存分析
  TABLIST_INDEX: "TABLIST_INDEX"
};
const statisticalAnalysis = {
  state: {
    leftDraggableList: [],
    descriptiveStatisticsData: [],
    univariateAnalysisData: [],
    subsistenceAnalysisData: [],
    relatedAnalysisData: [], // 生存分析结果
    tabListIndex: "1"
  },
  getters: {
    leftDraggableList: state => state.leftDraggableList,
    descriptiveStatisticsData: state => state.descriptiveStatisticsData,
    univariateAnalysisData: state => state.univariateAnalysisData,
    subsistenceAnalysisData: state => state.subsistenceAnalysisData
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
    },
    [types.SUBSISTENCEANALYSIS_DATA](state, data) {
      state.subsistenceAnalysisData = data;
    },
    [types.RELATEDANALYSIS_DATA](state, data) {
      state.relatedAnalysisData = data;
    },

    [types.TABLIST_INDEX](state, data) {
      state.tabListIndex = data;
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
    },
    setSubsistenceAnalysisData: ({ commit }, data) => {
      commit("SUBSISTENCEANALYSIS_DATA", data);
    },
    setRelatedAnalysisData: ({ commit }, data) => {
      commit("RELATEDANALYSIS_DATA", data);
    },
    setTabListIndex: ({ commit }, data) => {
      commit("", data);
    }
  }
};

export default statisticalAnalysis;

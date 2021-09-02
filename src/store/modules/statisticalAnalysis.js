const types = {
  LEFT_DRAGGABLE_LIST: "LEFT_DRAGGABLE_LIST",
  DESCRIPTIVESTATISTICS_DATA: "DESCRIPTIVESTATISTICS_DATA"
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
    descriptiveStatisticsData: []
  },
  getters: {
    leftDraggableList: state => state.leftDraggableList,
    descriptiveStatisticsData: state => state.descriptiveStatisticsData
  },
  mutations: {
    [types.LEFT_DRAGGABLE_LIST](state, data) {
      state.leftDraggableList = data;
    },
    [types.DESCRIPTIVESTATISTICS_DATA](state, data) {
      state.descriptiveStatisticsData = data;
    }
  },
  actions: {
    setLeftDraggableList: ({ commit }) => {
      commit(types.LEFT_DRAGGABLE_LIST);
    },
    setDescriptiveStatisticsData: ({ commit }, data) => {
      commit("DESCRIPTIVESTATISTICS_DATA", data);
    }
  }
};

export default statisticalAnalysis;

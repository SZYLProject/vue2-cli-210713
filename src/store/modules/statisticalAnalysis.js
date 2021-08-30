const types = {
  LEFTDRAGGABLELIST: "LEFT_DRAGGABLE_LIST"
};
const statisticalAnalysis = {
  state: {
    leftDraggableList: [
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
      },
      {
        name: "Gendersds",
        value: "100.0"
      },
      {
        name: "Gendersds",
        value: "100.0"
      }
    ]
  },
  getters: {
    leftDraggableList: state => state.leftDraggableList
  },
  mutations: {
    [types.LEFT_DRAGGABLE_LIST](state, data) {
      state.leftDraggableList = data;
    }
  },
  actions: {
    setLeftDraggableList: ({ commit }) => {
      commit(types.LEFT_DRAGGABLE_LIST);
    }
  }
};

export default statisticalAnalysis;

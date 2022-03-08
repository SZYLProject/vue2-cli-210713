import Vue from "vue";
import Vuex from "vuex";
if (process.env.NODE_ENV === "development") {
  Vue.use(Vuex);
}

import statisticalAnalysis from "./modules/statisticalAnalysis";

export default new Vuex.Store({
  modules: {
    statisticalAnalysis
  }
});

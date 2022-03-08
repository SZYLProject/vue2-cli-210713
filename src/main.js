import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store/'
// 'development',use package;'production':use cdn;
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'mini'});
import('element-ui/lib/theme-chalk/index.css')

import './components/iconSvg' // iconSvg

import '@/router/permission' // permission control



// 分享功能集合
// import { shareConfig } from './utils/share';
// Vue.prototype.shareConfig = shareConfig;


Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

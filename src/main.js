// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from  'vue-infinite-scroll'
import {currency} from './util/currency'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'

Vue.use(infiniteScroll);
Vue.use(Vuex);

// Vue.config.productionTip=false
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg'
  // try: 3 // default 1
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  //render: h => h(App),
  components: { App }
});//.$mount('#app')

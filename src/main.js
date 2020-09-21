import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'

// MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import global_ from './components/global.vue' //引用文件
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面

Vue.use(MintUI)
Vue.use(VueCookies)
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.filter('dateFilter', function (ele) {
  //ele是之前记录的时间
  var lr = new Date(ele);

  var now = new Date;

  var dt = now - lr;

  var s = dt / 1000;

  if (s < 60) {

    return s + '秒前';

  } else if (s < 3600) {

    return parseInt(s / 60) + '分钟前';

  } else if (s < 86400) {

    return parseInt(s / 60 / 60) + '小时前';

  } else if (s < 604800) { //在一周内

    return parseInt(s / 60 / 60 / 24) + '天前';

  } else if (s < 2592000) {

    return parseInt(s / 60 / 60 / 24 / 7) + "周前"

  } else if (s < 2592000 && s > 604800) { //超过一周

    return parseInt(s / 60 / 60 / 24) + '天前';

  } else if (s < 31104000) {

    return parseInt(s / 60 / 60 / 24 / 30) + '月前';

  } else if (s < 311040000) {

    return parseInt(s / 60 / 60 / 24 / 30 / 12) + '年前';

  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
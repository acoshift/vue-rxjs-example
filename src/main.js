import Vue from 'vue'
import App from './App'
import router from './router'

import VueRx from 'vue-rx'
import { Observable, Subscription, Subject } from 'rxjs'

import 'skeleton-css/css/normalize.css'
import 'skeleton-css/css/skeleton.css'

Vue.config.productionTip = false

Vue.use(VueRx, { Observable, Subscription, Subject })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

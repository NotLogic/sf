import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/config/framework'
import '@/utils/http.js'
// 混入
import mixin from '@/mixin/index'
Vue.mixin(mixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

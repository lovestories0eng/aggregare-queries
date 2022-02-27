import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'

import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import "vis-network/dist/dist/vis-network.min.css"

Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  render: h => h(App),
}).$mount('#app')

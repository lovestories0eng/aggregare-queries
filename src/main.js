import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'

import 'normalize.css/normalize.css'

Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  render: h => h(App),
}).$mount('#app')

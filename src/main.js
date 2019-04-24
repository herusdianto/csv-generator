import Vue from 'vue'
import App from './App.vue'

import Field from 'buefy/dist/components/field'
import Input from 'buefy/dist/components/input'
import Button from 'buefy/dist/components/button'
import Switch from 'buefy/dist/components/switch'
import Select from 'buefy/dist/components/select'
import 'buefy/dist/buefy.css'

Vue.use(Field)
Vue.use(Input)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Select)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

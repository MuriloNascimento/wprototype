import { createApp } from 'vue'
import { createStore } from 'vuex'
import { Quasar } from 'quasar'
import components from './components/index'
import store from './store/index'
import 'quasar/dist/quasar.prod.css'

const app = createApp({components})

app.use(Quasar)
app.use(store)
const vmContent = app.mount('#vue-app')

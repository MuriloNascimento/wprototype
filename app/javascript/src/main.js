import { createApp, reactive } from 'vue'
import { Quasar } from 'quasar'
import components from './components/index'
import 'quasar/dist/quasar.prod.css'

const app = createApp({components})

app.use(Quasar)
app.provide('store', reactive({}))
const vmContent = app.mount('#vue-app')

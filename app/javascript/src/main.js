import { createApp } from 'vue'
import { Quasar } from 'quasar'
import * as components from './components'
import 'quasar/dist/quasar.prod.css'

const app = createApp({components})
app.use(Quasar)
const vmContent = app.mount('#vue-app')
import { createApp, reactive } from 'vue'
import { Quasar, Notify } from 'quasar'
import components from './components/index'
import 'quasar/dist/quasar.prod.css'
import filters from './filters'

// cria um novo app vue
// https://v3.vuejs.org/
const app = createApp({components})

// configura o quasar
// https://quasar.dev/
app.use(Quasar, {
    plugins: {
        Notify
    }
})

// cria um store de métodos seguindo o padrão provide/inject
app.provide('store', reactive({}))

// registra os filters
// https://v3.vuejs.org/guide/migration/filters.html#global-filters
app.config.globalProperties.$filters = filters

// cria uma instancia vue, para isolar o código Vue das demais bibliotecas javascript dentro do erp,
// talvez seja necessária a criação de outras instancias, como por exemplo: const vmSideBar = app.mount('#vue-side-bar')
const vmContent = app.mount('#vue-content')

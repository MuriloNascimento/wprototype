import { createApp, reactive } from 'vue'
import { Quasar, Notify } from 'quasar'
import components from './components/index'
import 'quasar/dist/quasar.prod.css'
import filters from './boot/filters'
import { createI18n } from 'vue-i18n'
import messages from './i18n'

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

// configura a internacionalização
// https://vue-i18n.intlify.dev/installation.html
// https://vue-i18n.intlify.dev/guide/advanced/composition.html
// const i18n = createI18n({
//     legacy: false,
//     locale: 'pt-BR',
//     fallbackLocale: 'pt-br',
//     globalInjection: true,
//     messages
// })
// app.use(i18n)

// cria um store seguindo o padrão provide/inject
// https://v3.vuejs.org/guide/composition-api-provide-inject.html
// https://vuejsdevelopers.com/2020/10/05/composition-api-vuex/
app.provide('store', reactive({}))

// registra os filters
// https://v3.vuejs.org/guide/migration/filters.html#global-filters
app.config.globalProperties.$filters = filters

// cria uma instancia vue, para isolar o código Vue das demais bibliotecas javascript dentro do erp,
// talvez seja necessária a criação de outras instancias, como por exemplo: const vmSideBar = app.mount('#vue-side-bar')
const vmContent = app.mount('#vue-content')

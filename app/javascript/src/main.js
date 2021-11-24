import { createApp, reactive } from 'vue'
import { Quasar } from 'quasar'
import components from './components/index'
import 'quasar/dist/quasar.prod.css'

// cria um novo app vue
const app = createApp({components})

// configura o quasar
app.use(Quasar)

// cria o banco de metodos seguindo o padrão provide/inject
// https://v3.vuejs.org/guide/composition-api-provide-inject.html
// https://vuejsdevelopers.com/2020/10/05/composition-api-vuex/
app.provide('store', reactive({}))

// cria uma instancia vue, para isolar o código Vue das demais bibliotecas javascript dentro do erp,
// talvez seja necessária a criação de outras instancias, como por exemplo: const vmSideBar = app.mount('#vue-side-bar')
const vmContent = app.mount('#vue-content')

import { createStore } from 'vuex'
import form from './modules/form'
import table from './modules/table'

export default createStore({
  modules: {
    form,
    table
  }
})
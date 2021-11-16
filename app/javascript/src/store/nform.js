import { reactive, readonly } from "vue"
import axios from 'axios'

const state = reactive({
	selected: {},
    title: null,
    error: null
})

const actions = {
    setError(payload) {
        state.error = payload
    },
    setSelected(payload) {
		state.selected = {...payload}
        state.title = (typeof payload.id != undefined && payload.id != null) ? 'Edit' : 'New'
        actions.setError(null)
	},
    async onSave (resource) {
      if (state.selected.id == undefined || state.selected.id == '' || state.selected.id == null) {
          try {
            const response = await axios.post(`/api/${resource}`, state.selected)
            //insertInList(response.data.data)
            actions.setSelected({})
          } catch (err) {
            console.log(err)
            actions.setError(err.response.data.message)
          }
      } else {
        try {
            const response = await axios.put(`/api/${resource}/${state.selected.id}`, state.selected)
            //updateInList(state.selected)
            actions.setSelected({})
        } catch (err) {
            console.log(err)
            actions.setError(err.response.data.message)
        }
      }
    },
    async onDelete (resource) {
      try {
        const response = await axios.delete(`/api/${resource}/${state.selected.id}`, state.selected)
        //deleteInList(state.selected)
        actions.setSelected({})
      } catch (err) {
        actions.setError(err.response.data.message)
      }
    }
}

export default { state, actions }
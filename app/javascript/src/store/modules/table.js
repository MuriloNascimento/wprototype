import axios from "axios"

// state
const state = () => ({
	rows: []
})

const getters = {
	getRows (state) {
	  return state.rows
	},
}
  

// actions
const actions = {
	async setRows ({state}, resource) {
		const response = await axios.get(`/api/${resource}`)
		if(typeof response.data != undefined) {
			state.rows = response.data
		}
	},
	insertInList (state, itemSelected) {
    	state.rows.push(itemSelected)
    },
    updateInList (state, itemSelected) {
		const index = state.rows.findIndex(item => item.id === itemSelected.id)
		state.rows.splice(index, 1, itemSelected)
    },
    deleteInList (state, itemSelected) {
		const index = state.rows.findIndex(item => item.id === itemSelected.id)
		state.rows.splice(index, 1)
    }
}

export default {
  namespaced: true,
  state,
  actions,
  getters
}
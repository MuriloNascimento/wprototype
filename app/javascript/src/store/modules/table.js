import axios from "axios"

// initial state
const state = () => ({
	rows: []
})

// getters
const getters = {
	getRows (state) {
		return state.rows
	}
}

// actions
const actions = {
	async setRows ({commit}, resource) {
		const response = await axios.get(`/api/${resource}`)
		if(typeof response.data != undefined) {
			commit('changeRows', response.data)
		}
	}
}

// mutations
const mutations = {
	changeRows (state, payload) {
		state.rows = payload
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
  getters,
  actions,
  mutations
}
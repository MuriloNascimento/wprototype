import axios from "axios"

// initial state
const state = () => ({
	selected: {},
  title: 'New',
  error: null
})

// getters
const getters = {
	getSelected (state) {
		return state.selected
	},
  getTitle (state) {
    return state.title
  },
  getError (state) {
    return state.error
  }
}

// actions
const actions = {
  setSelected ({commit}, payload) {
    commit('changeSelected', payload)
    commit('changeTitle', (typeof payload.id != undefined && payload.id != null) ? 'Edit' : 'New')
    commit('setError', null)
  },
  async onSave ({commit, dispatch, state}, resource) {
    if (state.selected.id == undefined || state.selected.id == '' || state.selected.id == null) {
        try {
          const response = await axios.post(`/api/${resource}`, state.selected)
          commit('table/insertInList', response.data.data, { root: true })
          dispatch('setSelected', {})
        } catch (err) {
          commit('setError', err.response.data.message)
        }
      } else {
        try {
          console.log(state.selected)
          await axios.put(`/api/${resource}/${state.selected.id}`, state.selected)
          commit('table/updateInList', state.selected, { root: true })
          dispatch('setSelected', {})
        } catch (err) {
          commit('setError', err.response.data.message)
      }
    }
  },
  async onDelete ({commit, dispatch, state}, resource) {
    try {
      await axios.delete(`/api/${resource}/${state.selected.id}`, state.selected)
      commit('table/deleteInList', state.selected, { root: true })
      dispatch('setSelected', {})
    } catch (err) {
      commit('setError', err.response.data.message)
    }
  }
}

// mutations
const mutations = {
	changeSelected (state, payload) {
		state.selected = payload
	},
  changeTitle (state, payload) {
    state.title = payload
  },
  setError (state, payload) {
    state.error =  payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
import axios from "axios"

// initial state
const state = () => ({
	selected: {},
  title: 'New',
  error: null
})

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
  setSelected ({state}, payload) {
    state.selected = payload
    state.title = (typeof payload.id != undefined && payload.id != null) ? 'Edit' : 'New'
    state.error = null
  },
  onSave ({commit, dispatch, state}, resource) {
  },
  onDelete ({commit, dispatch, state}, resource) {
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters
}
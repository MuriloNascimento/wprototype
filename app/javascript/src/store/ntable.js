import { reactive, readonly } from "vue"
import axios from 'axios'

const state = reactive({
	rows: []
})

const actions = {
	async setRows(resource) {
		const response = await axios.get(`/api/${resource}`)
		if(typeof response.data != undefined) {
			state.rows = response.data
		}
	}
}

export default { state: readonly(state), actions }
import { axios } from '../../boot/axios'

export default {
	get (resource, data = null) {
		return axios.get(`${resource}`, { params: data })
	},
	getById (resource, id) {
		return axios.get(`${resource}/${id}`)
	},
	create (resource, payload) {
		return axios.post(`${resource}`, payload)
	},
	update (resource, payload) {
		return axios.put(`${resource}/${payload.id}`, payload)
	},
	delete (resource, id) {
		return axios.delete(`${resource}/${id}`)
	}
}

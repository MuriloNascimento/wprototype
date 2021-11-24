import axiosInstance from 'axios'

// cria uma instancia do axios, permitindo adição de configurações globais nas chamadas ajax
const axios = axiosInstance.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json'
	}
})

export { axios }

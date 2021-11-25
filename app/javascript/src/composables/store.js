import {inject} from 'vue'

export function useStore(module) {
    const store = inject("store")
    store[module] = { ...store[module] }

    const get = (action) => {
        return (payload) => store[module][`${action}`](payload)
    }

    const save = (actions) => {
        store[module] = { ...store[module], 
			...actions
		}
    }

    return {
        get,
        save
    }
}
import {inject} from 'vue'

export function useStore(module) {
    // injeta o objeto store
    const store = inject("store")

    // cria ou busca o modulo de componentes
    store[module] = { ...store[module] }

    // busca uma ação desse módulo no store
    const get = (action) => {
        return store[module][`${action}`]
    }

    // salva uma ação desse módulo no store
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
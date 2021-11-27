import { inject } from 'vue'

export function useStore(module = 'commons') {

    
    // injeta o objeto store
    const store = inject("store")
    console.log(store)

    // Cria ou busca um módulo existente
    store[module] = { ...store[module] }

    // Retorna uma ação sem executar
    const get = (action) => {
        return (...args) => {
            if (store[module][action] != undefined){
                store[module][action](...args)
            }
        }
    }

    // Adiciona uma ação
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
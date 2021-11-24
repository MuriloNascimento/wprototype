<template>
	<div class="q-pa-md">
		<q-table v-bind:rows-per-page-options="[20]" v-bind:rows="rows" v-bind:columns="columns" row-key="id">
			<template v-slot:top>
				<div class="col-2 q-table__title">{{title}}</div>
				<q-space />
				<q-btn color="primary" round icon="add" v-on:click="setSelected({})"/>
			</template>
			<template v-slot:header="props">
				<q-tr :props="props">
					<q-th v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props">{{ col.label }}</q-th>
				</q-tr>
			</template>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props" v-on:click="setSelected({...props.row})" >
						<span v-if="col.type === undefined">{{ col.value }}</span>
						<span v-if="col.type === 'color'"><q-icon name="style" v-bind:style="{'color': `${col.value}`, 'font-size': '2em'}" /></span>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>

<script>
import { computed, onMounted, inject, reactive } from 'vue'
import api from '../services/api/commons'

export default {
	props: {
		module: {
			type: String,
			required: true
		},
		resource: {
			type: String,
			required: true
		},
		columns: {
			type: Array,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	setup (props) {

		// Injeta o banco de metodos
		const store = inject("store")

		// Busca no store, os metodos necessários para esse componente
		const setSelected = selected => store[props.module].setSelected(selected)

		// Atributos do componente
		const state = reactive({
			rows: []
		})

		// Métodos que manipulam os atributos deste componente
		const setRows = () => {
			api.get(`${props.resource}`).then((response) => {
				state.rows = response.data
			})
		}
		const insertRow = itemSelected => {
			state.rows.push(itemSelected)
		}
		const updateRow = itemSelected => {
			const index = state.rows.findIndex(item => item.id === itemSelected.id)
			state.rows.splice(index, 1, itemSelected)
		}
		const deleteRow = itemSelected => {
			const index = state.rows.findIndex(item => item.id === itemSelected.id)
			state.rows.splice(index, 1)
		}

		// Lifecycle hooks https://v3.vuejs.org/api/options-lifecycle-hooks.html
		onMounted(() => {
			setRows()
		})

		// Cria ou adiciona novo módulo, adiciona novos métodos no banco de metodos (somente os métodos que devem ser utilizados em outros componentes)
		store[props.module] = { ...store[props.module], 
			insertRow,
			updateRow,
			deleteRow
		}

		// Retorna os atributos e metodos que devem ser utilizados no template
		return {
			rows: computed(() => state.rows),
			setSelected
		}
	}
}
</script>

<style lang="css" scoped>
</style>
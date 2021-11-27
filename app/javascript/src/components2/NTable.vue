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
					<q-td v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props" v-on:click="setSelected({...props.row}, 'alo mundo')" >
						<span v-if="col.type === undefined">{{ col.value }}</span>
						<span v-if="col.type === 'color'"><q-icon name="style" v-bind:style="{'color': `${col.value}`, 'font-size': '2em'}" /></span>
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import api from '../services/commons'
import { useStore } from '../composables/useStore'

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
	setup (props, root) {

		// Instancia a composição store passando o módulo desse componente como parâmetro
		const { get, save } = useStore(props.module)

		// Busca no store, as ações necessárias para esse componente
		const setSelected = get('setSelected')

		// Atributos do componente
		const state = reactive({
			rows: []
		})

		// Ações que manipulam os atributos deste componente
		const setRows = () => {
			api.get(props.resource).then((response) => {
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

		// adiciona novas ações no store (somente as ações que devem ser utilizadas em outros componentes)
		save({
			insertRow,
			updateRow,
			deleteRow
		})

		// Retorna os atributos e ações que devem ser utilizados no template
		return {
			rows: computed(() => state.rows),
			setSelected
		}
	}
}
</script>

<style lang="css" scoped>
</style>
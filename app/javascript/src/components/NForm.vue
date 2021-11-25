<template>
	<div class="q-pa-md">
		<q-card class="my-card">
			<q-card-section>
				<div class="text-h6">{{title}}</div>
			</q-card-section>
			<q-separator />
			<q-card-section>
				<q-form id="form" v-on:submit.stop.prevent="onSave()" class="q-gutter-md">
					<q-banner v-if="error  != undefined && error != null" class="bg-red text-white q-mb-md">!{{error}}</q-banner>
					<div v-for="field in fields" v-bind:key="field.id">
						<q-input v-if="field.type == 'text'"  filled v-model="selected[`${field.name}`]" v-bind:label="field.label" />
						<q-color v-if="field.type == 'color'" v-model="selected[`${field.name}`]" v-bind:label="field.label" />
					</div>
					<div>
						<q-btn round icon="save" type="submit" color="primary"/>
						<q-btn v-if="selected.id != undefined && selected.id != '' && selected.id != null" round icon="delete" type="button" color="red" v-on:click="onDelete()"/>
					</div>
				</q-form>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
import { computed, onMounted, inject, reactive } from 'vue'
import api from '../services/api/commons'
import { useStore } from '../composables/store'

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
		fields: {
			type: Array,
			required: true
		}
	},
	setup (props) {

		// Injeta o banco de metodos
		const store = useStore(props.module)

		// Busca no store, os metodos necessários para esse componente
		const insertRow = store.get('insertRow')
		const updateRow = store.get('updateRow')
		const deleteRow = store.get('deleteRow')

		// Atributos do componente
		const state = reactive({
			selected: {},
			title: null,
			error: null
		})

		// Métodos que manipulam os atributos deste componente
		const setSelected = selected => {
			state.selected = selected
			state.title = (typeof selected.id != undefined && selected.id != null) ? 'Edit' : 'New'
			state.error = null
		}
		const onSave = () => {
			if (state.selected.id == undefined || state.selected.id == '' || state.selected.id == null) {
				api.create(props.resource, state.selected).then( response => {
					insertRow(response.data.data)
					setSelected({})
				}).catch( error => {
					state.error = error.response.data.message
				})
			} else {
				api.update(props.resource, state.selected).then( response => {
					updateRow(state.selected)
					setSelected({})
				}).catch( error => {
					state.error = error.response.data.message
				})
			}
		}
		const onDelete = () => {
			api.delete(props.resource, state.selected.id).then( response => {
				deleteRow(state.selected)
				setSelected({})
			}).catch( error => {
				state.error = error.response.data.message
			})
		}

		// Lifecycle hooks https://v3.vuejs.org/api/options-lifecycle-hooks.html
		onMounted(() => {
			setSelected({})
		})

		// Cria ou adiciona novos metodos no módulo do banco de metodos (somente os metodos necessários)
		store.save({
			setSelected
		})

		// Retorna os atributos e metodos que devem ser utilizados no template
		return {
			selected: computed(() => state.selected),
			title: computed(() => state.title),
			error: computed(() => state.error),
			onDelete,
			onSave
		}
	}
}
</script>

<style lang="css" scoped>
</style>
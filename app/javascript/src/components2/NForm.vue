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
import { computed, onMounted, reactive } from 'vue'
import api from '../services/commons'
import { useStore } from '../composables/useStore'
import { useQuasar } from 'quasar'

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

		// Se for preciso utilizar alguma funcionalidade do dentro do setup: https://quasar.dev/options/the-q-object
		const $q = useQuasar()

		// Instancia a composição store passando o módulo desse componente como parâmetro
		const { get, save } = useStore(props.module)

		// Busca no store, as ações necessárias para esse componente
		const insertRow = get('insertRow')
		const updateRow = get('updateRow')
		const deleteRow = get('deleteRow')

		// Atributos
		const state = reactive({
			selected: {},
			title: null,
			error: null
		})

		// Ações
		const setError = message => {
			state.error = message
			$q.notify({
				message: message,
				type: 'negative',
				position: 'top',
				timeout: 2000
			})
		}
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
					setError(error.response.data.message)
				})
			} else {
				api.update(props.resource, state.selected).then( response => {
					updateRow(state.selected)
					setSelected({})
				}).catch( error => {
					setError(error.response.data.message)
				})
			}
		}
		const onDelete = () => {
			api.delete(props.resource, state.selected.id).then( response => {
				deleteRow(state.selected)
				setSelected({})
			}).catch( error => {
				setError(error.response.data.message)
			})
		}

		// Lifecycle hooks https://v3.vuejs.org/api/options-lifecycle-hooks.html
		onMounted(() => {
			setSelected({})
		})

		// Adiciona novas ações no store (somente as ações que devem ser utilizadas em outros componentes)
		save({
			setSelected
		})

		// Retorna os atributos e ações que devem ser utilizados no template
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
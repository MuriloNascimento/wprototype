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
import api from '../services/commons'
import store from '../mixins/store'

export default {
	mixins: [store],
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
	data() {
		return {
			selected: {},
			title: null,
			error: null
		}
	},
	methods: {
		setError (message) {
			this.error = message
		},
		setSelected (selected) {
			console.log(selected)
			this.selected = selected
			this.title = (typeof selected.id != undefined && selected.id != null) ? 'Edit' : 'New'
			this.error = null
		},
		onSave () {
			if (this.selected.id == undefined || this.selected.id == '' || this.selected.id == null) {
				api.create(this.resource, this.selected).then( response => {
					this.emit('insertRow', response.data.data)
					this.setSelected({})
				}).catch( error => {
					this.setError(error.response.data.message)
				})
			} else {
				api.update(this.resource, this.selected).then( response => {
					this.emit('updateRow', this.selected)
					this.setSelected({})
				}).catch( error => {
					this.setError(error.response.data.message)
				})
			}
		},
		onDelete() {
			api.delete(this.resource, this.selected.id).then( response => {
				this.emit('deleteRow', this.selected)
				this.setSelected({})
			}).catch( error => {
				this.setError(error.response.data.message)
			})
		}
	},
	mounted () {
		this.save('setSelected', this.setSelected)
	},
	created () {
		this.setSelected({})
	}
}
</script>

<style lang="css" scoped>
</style>
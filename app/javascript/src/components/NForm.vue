<template>
	<q-dialog v-model="dialog">
		<q-card class="my-card">
			<q-card-section>
				<div class="text-h6">{{title}}</div>
			</q-card-section>
			<q-separator />
			<q-card-section>
				<q-form id="form" v-on:submit.stop.prevent="onSave()" class="q-gutter-md">
					<q-banner v-if="error  != undefined && error != null" class="bg-red text-white q-mb-md">!{{error}}</q-banner>
					<slot name="body" v-bind:selected="selected"></slot>
					<div>
						<q-btn round icon="save" type="submit" color="primary"/>
						<q-btn v-if="selected.id != undefined && selected.id != '' && selected.id != null" round icon="delete" type="button" color="red" v-on:click="onDelete()"/>
					</div>
				</q-form>
			</q-card-section>
		</q-card>
	</q-dialog>
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
	},
	data() {
		return {
			dialog: false,
			selected: null,
			title: null,
			error: null
		}
	},
	methods: {
		setError (message) {
			this.error = message
			this.$q.notify({
				message: message,
				type: 'negative',
				position: 'top',
				timeout: 2000
			})
		},
		setSelected (selected) {
			this.selected = selected
			this.title = (selected != null && typeof selected.id != undefined && selected.id != null) ? 'Edit' : 'New'
			this.error = null
			if (this.selected != null) {
				this.dialog = true
			} else {
				this.dialog = false
			}
		},
		onSave () {
			if (this.selected.id == undefined || this.selected.id == '' || this.selected.id == null) {
				api.create(this.resource, this.selected).then( response => {
					this.emitMethod('insertRow', response.data.data)
					this.setSelected(null)
				}).catch( error => {
					this.setError(error.response.data.message)
				})
			} else {
				api.update(this.resource, this.selected).then( response => {
					this.emitMethod('updateRow', this.selected)
					this.setSelected(null)
				}).catch( error => {
					this.setError(error.response.data.message)
				})
			}
		},
		onDelete() {
			api.delete(this.resource, this.selected.id).then( response => {
				this.emitMethod('deleteRow', this.selected)
				this.setSelected(null)
			}).catch( error => {
				this.setError(error.response.data.message)
			})
		}
	},
	mounted () {
		this.saveMethod('setSelected', this.setSelected)
	},
	created () {
		this.setSelected(null)
	}
}
</script>

<style lang="css" scoped>
</style>
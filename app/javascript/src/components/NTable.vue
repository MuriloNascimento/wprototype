<template>
	<div class="q-pa-md">
		<q-table v-bind:rows-per-page-options="[20]" v-bind:rows="rows" v-bind:columns="columns" row-key="id">
			<template v-slot:top>
				<div class="col-2 q-table__title">{{title}}</div>
				<q-space />
				<q-btn color="primary" round icon="add" v-on:click="this.emitMethod('setSelected', {})"/>
			</template>
			<template v-slot:header="props">
				<q-tr :props="props">
					<q-th v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props">{{ col.label }}</q-th>
				</q-tr>
			</template>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props" v-on:click="this.emitMethod('setSelected', { ...props.row})" >
						<span v-if="col.type === undefined">{{ col.value }}</span>
						<span v-if="col.type === 'color'"><q-icon name="style" v-bind:style="{'color': `${col.value}`, 'font-size': '2em'}" /></span>
					</q-td>
				</q-tr>
			</template>
		</q-table>
		<q-dialog v-model="itemTypeForm">
			<n-form title="ItemType" module="itemType" resource="item_types">
				<template v-slot:body="data">
					<div>
						<q-input filled type="text" label="Name" v-model="data.selected.name" />
					</div>
					<div>
						<q-color default-view="palette" label="Color" v-model="data.selected.color" />
					</div>
				</template>
			</n-form>
		</q-dialog>
	</div>
</template>

<script>
import api from '../services/commons'
import store from '../mixins/store'
import NForm from './NForm'

export default {
	mixins: [store],
	components: {NForm},
	props: {
		module: {
			type: String,
			required: false
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
	data() {
		return {
			rows: [],
			itemTypeForm: false
		}
	},
	methods: {
		setRows() {
			api.get(this.resource).then((response) => {
				this.rows = response.data
			})
		},
		insertRow(itemSelected) {
			this.rows.push(itemSelected)
		},
		updateRow(itemSelected) {
			const index = this.rows.findIndex(item => item.id === itemSelected.id)
			this.rows.splice(index, 1, itemSelected)
		},
		deleteRow(itemSelected) {
			const index = this.rows.findIndex(item => item.id === itemSelected.id)
			this.rows.splice(index, 1)
		}
	},
	mounted () {
		this.saveMethod('insertRow', this.insertRow)
		this.saveMethod('updateRow', this.updateRow)
		this.saveMethod('deleteRow', this.deleteRow)
	},
	created () {
		this.setRows()
	}
}
</script>

<style lang="css" scoped>
</style>

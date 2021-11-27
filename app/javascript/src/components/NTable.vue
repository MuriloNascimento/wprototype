<template>
	<div class="q-pa-md">
		<q-table v-bind:rows-per-page-options="[20]" v-bind:rows="rows" v-bind:columns="columns" row-key="id">
			<template v-slot:top>
				<div class="col-2 q-table__title">{{title}}</div>
				<q-space />
				<q-btn color="primary" round icon="add" v-on:click="this.emit('setSelected', {})"/>
			</template>
			<template v-slot:header="props">
				<q-tr :props="props">
					<q-th v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props">{{ col.label }}</q-th>
				</q-tr>
			</template>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props" v-on:click="this.emit('setSelected', {...props.row})" >
						<span v-if="col.type === undefined">{{ col.value }}</span>
						<span v-if="col.type === 'color'"><q-icon name="style" v-bind:style="{'color': `${col.value}`, 'font-size': '2em'}" /></span>
					</q-td>
				</q-tr>
			</template>
		</q-table>
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
			rows: []
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
		this.save('insertRow', this.insertRow)
		this.save('updateRow', this.updateRow)
		this.save('deleteRow', this.deleteRow)
	},
	created () {
		this.setRows()
	}
}
</script>

<style lang="css" scoped>
</style>

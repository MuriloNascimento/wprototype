<template>
	<div class="q-pa-md">
		<q-table 
			v-bind:rows-per-page-options="[20]" 
			v-bind:rows="rows" 
			v-bind:columns="columns" 
			row-key="id"
			v-bind:visible-columns="visibleColumns"
		>
			<template v-slot:top>
				<div class="col-2 q-table__title">{{title}}</div>
				<q-space />
				<q-select
					v-model="visibleColumns"
					multiple
					outlined
					dense
					options-dense
					:display-value="$q.lang.table.columns"
					emit-value
					map-options
					:options="columns"
					option-value="name"
					options-cover
					style="min-width: 150px"
				/>
			</template>
			<template v-slot:header="props">
				<q-tr :props="props">
					<q-th v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props">{{ col.label }}</q-th>
				</q-tr>
			</template>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props" v-on:click="this.show()" >
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
		visibleColumns: {
			type: Array,
			required: false
		},
		module: {
			type: String,
			required: false
		},
		rows: {
			type: Array,
			required: false
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
	methods: {
		show() {
			location.assign("/item_types/1")
		}
	},
	mounted () {
	},
	created () {
	}
}
</script>

<style lang="css" scoped>
</style>

<template>
  <div class="q-pa-md">
    <q-table
      v-bind:rows-per-page-options="[20]"
      v-bind:rows="rows"
      v-bind:columns="columns"
      row-key="id"
    >
      <template v-slot:top>
        <div class="col-2 q-table__title">{{title}}</div>
        <q-space />
        <q-btn color="primary" round icon="add" v-on:click="setSelected({})" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props" v-on:click="setSelected({ ...props.row })">
            <span v-if="col.type === undefined">
              {{ col.value }}
            </span>
            <span v-if="col.type === 'color'">
              <q-icon name="style" v-bind:style="{'color': `${col.value}`, 'font-size': '2em'}" />
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import NFormStore from '../store/nform.js'
import NTableStore from '../store/ntable.js'
import { computed, onMounted } from 'vue'

export default {
  props: {
    resource: String,
    columns: Array,
    title: String
  },
  setup (props) {
    onMounted(() => {
      NTableStore.actions.setRows(props.resource)
    })
    return {
      rows: computed(() => NTableStore.state.rows),
      setSelected: NFormStore.actions.setSelected
    }
  }
}
</script>

<style lang="css" scoped>
.my-card{
    width: 100%;
    max-width: 250px
}
</style>
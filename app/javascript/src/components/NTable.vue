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
        <q-btn color="primary" round icon="add" v-on:click="setSelected({})"/>
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
          <q-td v-for="col in props.cols" v-bind:key="col.name" v-bind:props="props" v-on:click="setSelected({...props.row})" >
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
import { computed, onMounted, inject } from 'vue'
import axios from 'axios'

export default {
  props: {
    module: String,
    resource: String,
    columns: Array,
    title: String
  },
  setup (props) {

    // injeta o banco de dados expostos pelos componentes
    const store = inject("store")

    // cria dinâmicamente um módulo para expor os dados e ações desta instância de componente
    store.modules[props.module] = { ...store.modules[props.module], ...{
      rows: [],
      async setRows () {
        const response = await axios.get(`/api/${props.resource}`)
        if(typeof response.data != undefined) {
          store.modules[props.module].rows = response.data
        }
      },
      insertRow (itemSelected) {
    	  store.modules[props.module].rows.push(itemSelected)
      },
      updateRow (itemSelected) {
        const index = store.modules[props.module].rows.findIndex(item => item.id === itemSelected.id)
        store.modules[props.module].rows.splice(index, 1, itemSelected)
      },
      deleteRow (itemSelected) {
        const index = store.modules[props.module].rows.findIndex(item => item.id === itemSelected.id)
        store.modules[props.module].rows.splice(index, 1)
      }
    }}

    onMounted(() => {
      store.modules[props.module].setRows()
    })

    return {
      rows: computed(() => store.modules[props.module].rows),
      setSelected: (payload) => store.modules[props.module].setSelected(payload)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
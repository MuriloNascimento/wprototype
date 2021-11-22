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
            <q-btn v-if="selected.id != undefined && selected.id != '' && selected.id != null" round icon="delete" type="button" color="red" v-on:click="onDelete()"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { computed, onMounted, inject } from 'vue'
import axios from "axios"

export default {
  props: {
    module: String,
    resource: String,
    fields: Array
  },
  setup (props) {

    // injeta o banco de dados expostos pelos componentes
    const store = inject("store")

    // cria dinâmicamente um módulo para expor os dados e ações desta instância de componente
    store[props.module] = { ...store[props.module], ...{
      selected: {},
      title: null,
      error: null,
      async onSave () {
        if (store[props.module].selected.id == undefined || store[props.module].selected.id == '' || store[props.module].selected.id == null) {
          try {
            const response = await axios.post(`/api/${props.resource}`, store[props.module].selected)
            store[props.module].insertRow(response.data.data)
            store[props.module].selected = {}
          } catch (err) {
            store[props.module].error = err
          }
        } else {
          try {
            await axios.put(`/api/${props.resource}/${store[props.module].selected.id}`, store[props.module].selected)
            store[props.module].updateRow(store[props.module].selected)
            store[props.module].selected = {}
          } catch (err) {
            store[props.module].error = err
          }
        }
      },
      async onDelete () {
        try {
          await axios.delete(`/api/${props.resource}/${store[props.module].selected.id}`)
          store[props.module].deleteRow(store[props.module].selected)
          store[props.module].selected = {}
        } catch (err) {
          store[props.module].error = err
        }
      },
      setSelected (payload) {
        store[props.module].selected = payload
        store[props.module].title = (typeof payload.id != undefined && payload.id != null) ? 'Edit' : 'New'
        store[props.module].error = null
      }
    }}

    onMounted(() => {
      store[props.module].setSelected({})
    })

    return {
      selected: computed(() => store[props.module].selected),
      title: computed(() => store[props.module].title),
      error: computed(() => store[props.module].error),
      onDelete: () => store[props.module].onDelete(),
      onSave: () => store[props.module].onSave()
    }
  }
}
</script>

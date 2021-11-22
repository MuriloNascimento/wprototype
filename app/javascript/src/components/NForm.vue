<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{getTitle}}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form id="form" v-on:submit.stop.prevent="onSave(resource)" class="q-gutter-md">
          <q-banner v-if="getError  != undefined && getError != null" class="bg-red text-white q-mb-md">!{{getError}}</q-banner>
          <div v-for="field in fields" v-bind:key="field.id">
            <q-input v-if="field.type == 'text'"  filled v-model="getSelected[`${field.name}`]" v-bind:label="field.label" />
            <q-color v-if="field.type == 'color'" v-model="getSelected[`${field.name}`]" v-bind:label="field.label" />
          </div>
          <div>
            <q-btn round icon="save" type="submit" color="primary"/>
            <q-btn v-if="getSelected.id != undefined && getSelected.id != '' && getSelected.id != null" round icon="delete" type="button" color="red" v-on:click="onDelete(resource)"
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
    fields: Array,
    title: String,
  },
  setup (props) {

    // injeta o banco de dados expostos pelos componentes
    const store = inject("store")

    // cria dinâmicamente um módulo para expor os dados e ações desta instância de componente
    store.modules[props.module] = { ...store.modules[props.module], ...{
      selected: {},
      title: null,
      error: null,
      async onSave () {
          if (store.modules[props.module].selected.id == undefined || store.modules[props.module].selected.id == '' || store.modules[props.module].selected.id == null) {
            try {
              const response = await axios.post(`/api/${props.resource}`, store.modules[props.module].selected)
              store.modules[props.module].insertRow(response.data.data)
              store.modules[props.module].selected = {}
            } catch (err) {
              store.modules[props.module].error = err
            }
          } else {
            try {
              await axios.put(`/api/${props.resource}/${store.modules[props.module].selected.id}`, store.modules[props.module].selected)
              store.modules[props.module].updateRow(store.modules[props.module].selected)
              store.modules[props.module].selected = {}
            } catch (err) {
              store.modules[props.module].error = err
          }
        }
      },
      async onDelete () {
        try {
          await axios.delete(`/api/${props.resource}/${store.modules[props.module].selected.id}`)
          store.modules[props.module].deleteRow(store.modules[props.module].selected)
          store.modules[props.module].selected = {}
        } catch (err) {
          store.modules[props.module].error = err
        }
      },
      setSelected (payload) {
        store.modules[props.module].selected = payload
        store.modules[props.module].title = (typeof payload.id != undefined && payload.id != null) ? 'Edit' : 'New'
        store.modules[props.module].error = null
      }
    }}

    onMounted(() => {
      store.modules[props.module].setSelected({})
    })

    return {
      getSelected: computed(() => store.modules[props.module].selected),
      getTitle: computed(() => store.modules[props.module].title),
      getError: computed(() => store.modules[props.module].error),
      onDelete: (payload) => store.modules[props.module].onDelete(payload),
      onSave: (payload) => store.modules[props.module].onSave(payload)
    }
  }
}
</script>

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
import { computed, onMounted, inject, reactive } from 'vue'
import axios from "axios"

export default {
  props: {
    module: String,
    resource: String,
    fields: Array
  },
  setup (props) {

    // Armazena em uma constante o nome deste módulo
    const self = props.module

    // Injeta o banco de metodos
    const store = inject("store")
    
    // Atributos do componente
    const state = reactive({
      selected: {},
      title: null,
      error: null,
    })

    // Métodos que manipulam os atributos deste componente
    const actions = {
      setSelected (selected) {
        state.selected = selected
        state.title = (typeof selected.id != undefined && selected.id != null) ? 'Edit' : 'New'
        state.error = null
      },
      async onSave () {
        if (state.selected.id == undefined || state.selected.id == '' || state.selected.id == null) {
          try {
            const response = await axios.post(`/api/${props.resource}`, state.selected)
            store[self].insertRow(response.data.data)
            state.selected = {}
          } catch (err) {
            state.error = err
          }
        } else {
          try {
            await axios.put(`/api/${props.resource}/${state.selected.id}`, state.selected)
            store[self].updateRow(state.selected)
            state.selected = {}
          } catch (err) {
            state.error = err
          }
        }
      },
      async onDelete () {
        try {
          await axios.delete(`/api/${props.resource}/${state.selected.id}`)
          store[self].deleteRow(state.selected)
          state.selected = {}
        } catch (err) {
          state.error = err
        }
      },
    }

    // Lifecycle hooks https://v3.vuejs.org/api/options-lifecycle-hooks.html
    onMounted(() => {
      actions.setSelected({})
    })

    // Cria ou adiciona novos metodos no módulo do banco de metodos (somente os metodos necessários)
    store[self] = { ...store[self], 
      setSelected: (selected) => actions.setSelected(selected)
    }

    // Retorna os atributos e metodos que devem ser utilizados no template
    return {
      selected: computed(() => state.selected),
      title: computed(() => state.title),
      error: computed(() => state.error),
      onDelete: () => actions.onDelete(),
      onSave: () => actions.onSave()
    }
  }
}
</script>

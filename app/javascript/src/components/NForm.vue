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
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import form from '../store/form'

export default {
  props: {
    resource: String,
    fields: Array,
    title: String,
  },
  setup (props) {

    const store = useStore()
    store.registerModule(`${props.resource}::form`, form)

    onMounted(() => {
      store.dispatch(`${props.resource}::form/setSelected`, {})
    })
  
    return {
      getSelected: computed(() => store.getters[`${props.resource}::form/getSelected`]),
      getTitle: computed(() => store.getters[`${props.resource}::form/getTitle`]),
      getError: computed(() => store.getters[`${props.resource}::form/getError`]),
      onDelete: (payload) => store.dispatch(`${props.resource}::form/onDelete`, payload),
      onSave: (payload) => store.dispatch(`${props.resource}::form/onSave`, payload)
    }
  }
}
</script>

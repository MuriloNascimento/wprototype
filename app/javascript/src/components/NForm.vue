<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form id="form" v-on:submit.stop.prevent="onSave(resource)" class="q-gutter-md">
          <q-banner v-if="error != undefined && getError != null" class="bg-red text-white q-mb-md">!{{error}}</q-banner>
          <div v-for="field in fields" v-bind:key="field.id">
            <q-input v-if="field.type == 'text'"  filled v-model="selected[`${field.name}`]" v-bind:label="field.label" />
            <q-color v-if="field.type == 'color'" v-model="selected[`${field.name}`]" v-bind:label="field.label" />
          </div>
          <div>
            <q-btn round icon="save" type="submit" color="primary"/>
            <q-btn 
              v-if="selected.id != undefined && selected.id != '' && selected.id != null" 
              round icon="delete" type="button" color="red" v-on:click="onDelete(resource)"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import NFormStore from '../store/nform.js'
import { computed } from 'vue'

export default {
    props: {
        resource: String,
        fields: Array,
        title: String,
    },
    setup (props) {
        return {
            selected: computed(() => NFormStore.state.selected),
            error: computed(() => NFormStore.state.error),
            title: computed(() => NFormStore.state.title),
            onSave: NFormStore.actions.onSave,
            onDelete: NFormStore.actions.onDelete
        }
    }
}
</script>

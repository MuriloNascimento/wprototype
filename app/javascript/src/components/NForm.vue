<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form id="form" class="q-gutter-md">
          <q-banner v-if="error != undefined && getError != null" class="bg-red text-white q-mb-md">!{{error}}</q-banner>
          <div v-for="field in fields" v-bind:key="field.id">
            <q-input v-if="field.type == 'text'"  filled v-model="selected[`${field.name}`]" v-bind:label="field.label" />
            <q-color v-if="field.type == 'color'" v-model="selected[`${field.name}`]" v-bind:label="field.label" />
          </div>
          <div>
            <q-btn round icon="save" type="submit" color="primary"/>
            <q-btn 
              v-if="selected.id != undefined && selected.id != '' && selected.id != null" 
              round icon="delete" type="button" color="red" 
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { computed, toRef, reactive, provide } from 'vue'

export default {
    props: {
        resource: String,
        fields: Array,
        title: String,
    },
    setup (props) {
        const state = reactive({
          selected: {},
          title: null,
          error: null
        })
        const setSelected = (payload) => {
          state.selected = toRef(payload)
        }

        provide('setSelected', setSelected)

        return {
          selected: computed(() => state.selected),
          title: computed(() => state.title),
          error: computed(() => state.error)
        }
    }
}
</script>

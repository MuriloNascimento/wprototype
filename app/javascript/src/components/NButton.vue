<template>
  <div class="q-pa-md">
    <q-btn icon="save" type="button" color="primary" label="Limpar forms" v-on:click="limparForms"/>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  props: {
    resources: Array,
  },
  setup (props) {

    const store = useStore()
    const limparForms = () => {
      props.resources.forEach(function(resource) {
        store.dispatch(`form/${resource}/setSelected`, {}, { root: true })
      })
    }
  
    return {
      limparForms
    }
  }
}
</script>

<style lang="css" scoped>
</style>
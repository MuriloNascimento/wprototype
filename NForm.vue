<template>
  <div class="q-pa-md">
    {{selected}}
  </div>
</template>

<script>
import NFormStore from '../store/nform.js'

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
        selected: computed(() => NFormStore.state.selected)
    }
  }
}
</script>

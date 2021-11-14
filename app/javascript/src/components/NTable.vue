<template>
  <div class="q-pa-md">
    <q-table
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import {computed} from 'vue'

export default {
  props: {
    resource: String,
    columns: Array,
    title: String
  },
  setup () {
    return {
      rows: computed(() => { return [{
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      }] })
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
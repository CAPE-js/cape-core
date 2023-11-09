<template>
  <div class="col-sm-2 text-sm-right">
    <label
        v-if="filter.field.description != null"
        :for="'filter-'+filter.field.id"
        :title="filter.field.description"
        data-toggle="tooltip"
    >{{ filter.field.label }}</label>
    <label
        v-else
        :for="'filter-'+filter.field.id"
    >{{ filter.field.label }}</label>
  </div>
</template>

<script>
export default {
  name: "FilterFieldLabel",
  props: {filter: {type: Object, default: null}}
}
</script>

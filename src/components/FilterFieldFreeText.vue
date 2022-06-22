
<template>
  <div class="form-row mb-1">
    <filter-field-label :filter="filter" />
    <div class="col-sm-10">
      <debounced-input
        :id="'filter-'+filter.field.id"
        v-model.trim="filter.term"
        :type="'text'"
        class="form-control form-control-sm"
      />
    </div>
  </div>
</template>

<script>
import DebouncedInput from "./DebouncedInput.vue"
import FilterFieldLabel from "./FilterFieldLabel.vue"
export default {
    name: "FilterFieldFreetext",
    components: { DebouncedInput, FilterFieldLabel },
    props: { filter: { type: Object, default: null } }
}
</script>




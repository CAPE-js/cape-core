
<template>
  <div class="form-row mb-1" />
</template>

<script>
import DebouncedInput from "./DebouncedInput.vue"
import FilterFieldLabel from "./FilterFieldLabel.vue"
export default {
    name: "filter-field-freetext",
    components: { DebouncedInput, FilterFieldLabel },
    props: ["filter"]
}
</script>




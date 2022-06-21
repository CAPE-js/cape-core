
<template>
            <div class="form-row mb-1">
                <filter-field-label v-bind:filter="filter"></filter-field-label>
                <div class="col-sm-10">
                    <debounced-input v-bind:type="'text'" v-model.trim="filter.term" class="form-control form-control-sm" v-bind:id="'filter-'+filter.field.id"></debounced-input>
                </div>
            </div>
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




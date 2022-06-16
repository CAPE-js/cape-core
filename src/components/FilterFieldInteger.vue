
<template>
  <div class="form-row mb-1">
    <filter-field-label :filter="filter" />
    <div
      v-if="filter.change_filter_mode"
      class="col-sm-2"
    >
      <select
        v-model.trim="filter.mode"
        class="form-control form-control-sm"
      >
        <option value="is">
          is
        </option>
        <option value="between">
          is between
        </option>
        <option value="set">
          is present
        </option>
        <option value="not-set">
          is not present
        </option>
      </select>
    </div>
    <div :class="'col-sm-'+num_of_cols_for_main_search_area">
      <template v-if="filter.mode=='is'">
        <debounced-input
          :id="'filter-'+filter.field.id"
          v-model.trim="filter.term"
          :type="'number'"
          :placeholder="filter.placeholder.is"
          class="form-control form-control-sm"
          :min="filter.field.min"
          :max="filter.field.max"
          :step="filter.field.step"
        />
      </template>
      <template v-if="filter.mode=='between'">
        <debounced-input
          :id="'filter-'+filter.field.id"
          v-model.number="filter.term"
          :type="'number'"
          :placeholder="filter.placeholder.between[0]"
          class="form-control form-control-sm between-number-filter"
          :min="filter.field.min"
          :max="filter.field.max"
          :step="filter.field.step"
        />
        and
        <debounced-input
          :id="'filter-'+filter.field.id"
          v-model.number="filter.term2"
          :type="'number'"
          :placeholder="filter.placeholder.between[1]"
          class="form-control form-control-sm between-number-filter"
          :min="filter.field.min"
          :max="filter.field.max"
          :step="filter.field.step"
        /> 
      </template>
    </div>
  </div>
</template>


<script>
import DebouncedInput from "./DebouncedInput.vue"
import FilterFieldLabel from "./FilterFieldLabel.vue"
export default {
    name: "filter-field-integer",
    components: { DebouncedInput, FilterFieldLabel },
    props: ["filter"],
    computed: {
        num_of_cols_for_main_search_area: function () {
		return( this.filter.change_filter_mode ? 8 : 10 );
        }
    }
}
</script>




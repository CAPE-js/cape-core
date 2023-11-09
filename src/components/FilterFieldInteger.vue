<template>
  <div class="form-row mb-1">
    <filter-field-label :filter="filter"/>
    <div
        v-if="filter.change_filter_mode"
        class="col-sm-2"
    >
      <select
          :id="'filter-mode-'+filter.field.id"
          v-model.trim="filter.mode"
          aria-label="Type of number filter"
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
            :max="filter.field.max"
            :min="filter.field.min"
            :placeholder="filter.placeholder.is"
            :step="filter.field.step"
            :type="'number'"
            class="form-control form-control-sm"
            label="Number to filter"
        />
      </template>
      <template v-if="filter.mode=='between'">
        <debounced-input
            :id="'filter-min-'+filter.field.id"
            v-model.number="filter.term"
            :max="filter.field.max"
            :min="filter.field.min"
            :placeholder="filter.placeholder.between[0]"
            :step="filter.field.step"
            :type="'number'"
            class="form-control form-control-sm cape-between-number-filter"
            label="Min number from range to filter."
        />
        and
        <debounced-input
            :id="'filter-max-'+filter.field.id"
            v-model.number="filter.term2"
            :max="filter.field.max"
            :min="filter.field.min"
            :placeholder="filter.placeholder.between[1]"
            :step="filter.field.step"
            :type="'number'"
            class="form-control form-control-sm cape-between-number-filter"
            label="Max number from range to filter."
        />
      </template>
    </div>
  </div>
</template>


<script>
import DebouncedInput from "./DebouncedInput.vue"
import FilterFieldLabel from "./FilterFieldLabel.vue"

export default {
  name: "FilterFieldInteger",
  components: {DebouncedInput, FilterFieldLabel},
  props: {filter: {type: Object, default: null}},
  computed: {
    num_of_cols_for_main_search_area: function () {
      return (this.filter.change_filter_mode ? 8 : 10);
    }
  }
}
</script>




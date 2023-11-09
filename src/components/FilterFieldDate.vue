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
          aria-label="Type of date filter"
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
            :placeholder="filter.placeholder.is"
            :type="'text'"
            class="form-control form-control-sm"
            label="Date filter"
        />
      </template>
      <template v-if="filter.mode=='between'">
        <debounced-input
            :id="'filter-from-'+filter.field.id"
            v-model.trim="filter.term"
            :placeholder="filter.placeholder.between[0]"
            :type="'text'"
            class="form-control form-control-sm cape-between-number-filter"
            label="First date in filter"
        />
        and
        <!-- TODO is the following in the wrong position? this is named 'from' and the box above is named 'to' -->
        <debounced-input
            :id="'filter-to-'+filter.field.id"
            v-model.trim="filter.term2"
            :placeholder="filter.placeholder.between[1]"
            :type="'text'"
            class="form-control form-control-sm cape-between-number-filter"
            label="Last date in filter"
        />
      </template>
    </div>
  </div>
</template>

<script>
import DebouncedInput from "./DebouncedInput.vue"
import FilterFieldLabel from "./FilterFieldLabel.vue"

export default {
  name: "FilterFieldDate",
  components: {DebouncedInput, FilterFieldLabel},
  props: {filter: {type: Object, default: null}},
  computed: {
    num_of_cols_for_main_search_area: function () {
      return (this.filter.change_filter_mode ? 8 : 10);
    }
  }
}
</script>




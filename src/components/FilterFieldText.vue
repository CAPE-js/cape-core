<template>
  <div class="form-row mb-1">
    <filter-field-label :filter="filter" />
    <div
      v-if="filter.change_filter_mode"
      class="col-sm-2"
    >
      <select
        :id="'filter-text-mode-'+filter.field.id"
        v-model.trim="filter.mode"
        class="form-control form-control-sm"
      >
        <option value="is">
          is
        </option>
        <option value="contains">
          contains
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
      <template v-if="filter.mode=='is' || filter.mode=='contains'">
        <debounced-input
          :id="'filter-'+filter.field.id"
          v-model.trim="filter.term"
          :type="'text'"
          :placeholder="filter.placeholder[filter.mode]"
          class="form-control form-control-sm"
        />
      </template>
    </div>
  </div>
</template>

<script>
import DebouncedInput from "./DebouncedInput.vue"
import FilterFieldLabel from "./FilterFieldLabel.vue"
export default {
    name: "FilterFieldText",
    components: { DebouncedInput, FilterFieldLabel },
    props: { filter: { type: Object, default: null } },
    computed: {
        num_of_cols_for_main_search_area: function () {
		return( this.filter.change_filter_mode ? 8 : 10 );
        }
    }
}
</script>


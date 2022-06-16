
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
        <option value="one-of">
          one of
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
        <div v-if="filterStyle['is'] == 'radio'">
          <div
            v-for="option in filter.field.options"
            :key="option"
            class="form-check form-check-inline"
          >
            <input
              :id="'filter-'+filter.field.id+'-'+option"
              v-model="filter.term"
              class="form-check-input"
              type="radio"
              :value="option"
            >
            <label
              class="form-check-label"
              :for="'filter-'+filter.field.id+'-'+option"
            >{{ option }}</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              :id="'filter-'+filter.field.id+'-'"
              v-model="filter.term"
              class="form-check-input"
              type="radio"
              value=""
            >
            <label
              class="form-check-label"
              :for="'filter-'+filter.field.id+'-'"
            ><em>any</em></label>
          </div>
        </div>
        <div v-if="filterStyle['is'] == 'select'">
          <select
            :id="'filter-'+filter.field.id"
            v-model="filter.term"
            class="form-control form-control-sm"
          >
            <option
              selected="selected"
              value=""
            >
              Select
            </option>
            <option
              v-for="option in filter.field.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </template>
    
      <template v-if="filter.mode=='one-of'">
        <div v-if="filterStyle['one-of'] == 'checkbox'">
          <div
            v-for="option in filter.field.options"
            :key="option"
            class="form-check form-check-inline"
          >
            <input
              :id="'filter-'+filter.field.id+'-'+option"
              v-model="filter.terms"
              class="form-check-input"
              type="checkbox"
              :value="{'name':option}"
            >
            <label
              class="form-check-label"
              :for="'filter-'+filter.field.id+'-'+option"
            >{{ option }}</label>
          </div>
        </div>
        <div v-if="filterStyle['one-of'] == 'multiselect'">
          <!--
          <multiselect
            v-model="filter.terms"
            :options="filter.field.multiselectOptions"
            :multiple="true"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Select (1 or more)"
            label="name"
            track-by="name"
          >
            <template #tag="{ option, remove }">
              <span class="custom__tag"><span>{{ option.name }}</span><span
                class="custom__remove"
                @click="remove(option)"
              >❌</span></span>
            </template>
          </multiselect>
-->
        </div>
      </template>
    </div>
  </div>
</template>



<script>
import DebouncedInput from "./DebouncedInput.vue"
import FilterFieldLabel from "./FilterFieldLabel.vue"
export default {
    name: "filter-field-enum",
    components: { DebouncedInput, FilterFieldLabel },
    props: ["filter"],
    computed: {
        // some of the filter modes for enum have an optional alternate style
        filterStyle: function() {
            // default styles
            var style = { 
                'is': 'select', 
                'one-of': 'multiselect' 
            };
            // only accept valid options
            if( this.filter.field['style'] ) {
                if( this.filter.field['style']['is']     == 'radio' )    { style['is'] = "radio"; }
                if( this.filter.field['style']['one-of'] == 'checkbox' ) { style['one-of'] = "checkbox"; }
            };
            return style;
        },
        num_of_cols_for_main_search_area: function () {
		return( this.filter.change_filter_mode ? 8 : 10 );
        }
    }
}
</script>




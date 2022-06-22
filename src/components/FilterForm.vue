

<template>
  <div class="filter-form">
    <div
      v-for="filter in filters"
      :key="filter.field.id"
    >
      <filter-field-text
        v-if="filter.field.type=='text'"
        :filter="filter"
      />
      <filter-field-integer
        v-else-if="filter.field.type=='integer'"
        :filter="filter"
      />
      <filter-field-date
        v-else-if="filter.field.type=='date'"
        :filter="filter"
      />
      <filter-field-enum
        v-else-if="filter.field.type=='enum'"
        :filter="filter"
      />
      <filter-field-freetext
        v-else-if="filter.field.type=='freetext'"
        :filter="filter"
      />
      <template v-else>
        <div class="col-sm-10">
          Unknown filter type.
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import FilterFieldText from "./FilterFieldText.vue"
import FilterFieldInteger from "./FilterFieldInteger.vue"
import FilterFieldDate from "./FilterFieldDate.vue"
import FilterFieldEnum from "./FilterFieldEnum.vue"
import FilterFieldFreetext from "./FilterFieldFreetext.vue"
export default {
    name: "FilterForm",
    components: { FilterFieldText, FilterFieldInteger, FilterFieldDate, FilterFieldEnum, FilterFieldFreetext },
    props: { filters: { type: Array, default: null } }
}
</script>

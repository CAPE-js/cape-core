<template>
  <form @keypress.enter.prevent="ignoreEnter">
    <cape-intro /> 
    <div class="row">
      <div class="col text-right">
        <div>
          <button
            id="new-search-top"
            class="btn btn-sm btn-secondary "
            @click="resetFilters"
          >
            New search
          </button>
        </div>
        <div class="switch switch-sm mb-3 mt-3">
          <input
            id="show-all-filters-top"
            v-model="settings.show_all_filters"
            type="checkbox"
            class="switch"
          >
          <label for="show-all-filters-top">Advanced search</label>
        </div>
      </div>
    </div>
    <div class="row mb-1">
      <div class="col">
        <filter-form :filters="visible_filters" />
      </div>
    </div>

    <template v-if="showResults">
      <div class="row mb-1 form-row">
        <div class="col-sm-2 text-sm-right">
          Order results by 
        </div>
        <div class="col-sm-4">
          <select
            id="order-key"
            key="sort_field"
            v-model="settings.sort_field"
            style="width:auto; display: inline-block"
            class="form-control form-control-sm"
          >
            <option
              v-for="field in settings.sort_fields"
              :key="field"
              :value="field.id"
            >
              {{ field.label }}
            </option>
          </select>
          <select
            id="order-direction"
            key="sort_dir"
            v-model="settings.sort_dir"
            style="width:auto; display: inline-block"
            class="form-control form-control-sm"
          >
            <option value="asc">
              Ascending
            </option><option value="desc">
              Decending
            </option>
          </select>
        </div>
        <div
          v-if="settings.show_all_filters"
          class="col-sm-6 text-sm-right"
        >
          <div>
            <button
              id="new-search-bottom"  
              class="btn btn-sm btn-secondary "
              @click="resetFilters"
            >
              New search
            </button>
          </div>
          <div class="switch switch-sm mb-3 mt-3">
            <input
              id="show-all-filters-bottom"
              v-model="settings.show_all_filters"
              type="checkbox"
              class="switch"
            >
            <label for="show-all-filters-bottom">Advanced search</label>
          </div>
        </div>
      </div>
      <div class="row mb-1">
        <div class="col">
          <cape-results
            :options="settings"
            :results="filteredAndSortedResults"
          />
        </div>
      </div>
    </template>
    <div
      v-else
      class="row"
    >
      <div class="col">
        <div class="card">
          <div class="card-body">
            Use the form above to search this dataset.
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
//import jQuery from 'jquery'
import FilterForm from './FilterForm.vue'
import CapeResults from './CapeResults.vue'
import CapeIntro from './CapeIntro.vue'

export default {
    name: "HomePage",
    components: { FilterForm, CapeResults, CapeIntro },
    // runs every time the route changes
    beforeRouteEnter: function( to, from, next ) {
        next((vm)=>{ vm.onRouteUpdate(to); });
    },
    data: function () {
        var data = {};
        data.dataset = this.$root.defaultDataset;
        data.settings = this.$root.defaultDatasetSettings;
        data.visible_filters = [];
        data.browse = null;
        return data;
    },
    computed: {
        // more efficient to have this as a computed as the results are cached
        filteredAndSortedResults: function() {
            var results = this.filterResults();
            results = this.sortResults(results);
            // argh, this is a side effect! It lets the record view know the prev and next result 
            // eslint-disable-next-line
            this.$root.currentSearchResults = {};
            return results;
        },
        // show the results if either result_mode is "filter" (default is filter)
        // or else "search" mode only show results IF one or more filters is specified
        showResults: function() {  
            if( this.dataset.config["result_mode"] != "search" ) {
                // filter mode starts showing everything
                return true;
            }
            // search mode only shows results once they start typing
            var active_filters = this.activeFilters();
            return( active_filters.length > 0 );
        }
    },
    watch: {
        '$route': function(to) {
            // triggered when the fragment changes
            this.onRouteUpdate( to );
        },
        'settings.show_all_filters': function() {
            this.setVisibleFilters();
        }
    },
    mounted: function() { 
        // triggered when the template dom is rendered the first time
        this.setVisibleFilters();
    },
    updated: function() {
        // enable tooltips
//TODO tooltips need enabling 
        // jQuery('[data-toggle="tooltip"]').tooltip();
    },
    methods: {
        onRouteUpdate: function(to) {
            // this is called when a route is updated including on page load.
            // when the route is updated, update the filters
            if( to.name=="browse" && to.params.field != null && to.params.value != null ) {
                this.settings.show_all_filters = false;
                this.resetFilters();
                this.browse= { field: to.params.field, value: to.params.value };
                this.settings.filters_by_id[ this.browse.field ].mode = "is";
                this.settings.filters_by_id[ this.browse.field ].term = this.browse.value;
            } else {
                this.browse = null;
            }
            this.setVisibleFilters();
        },
        setVisibleFilters: function() {
            this.visible_filters = this.visibleFilters();
        },
        visibleFilters: function() {
            let visible_filters = [];
            for (var i = 0; i < this.settings.filters.length; i++) {
                var filter = this.settings.filters[i];
                if( Object.prototype.hasOwnProperty.call( filter.field, 'search' ) && filter.field['search']===false ) {
                    continue;
                }
                if (( this.settings.show_all_filters 
                   || filter.field.quick_search 
                   || ( this.browse!=null && filter.field.id==this.browse.field) )) {
                    visible_filters.push( filter );
                }
            } 
            return visible_filters;
        },
        activeFilters: function() {  
            // build a list of filters to be applied. Which is all the visible filters that have a non-default value
            // or a non-blank value
            var active_filters = [];
            this.visibleFilters().forEach( filter => {
                if( filter.isActive() ) {
                    active_filters.push(filter);
                }
            } );
            return active_filters;
        },
        filterResults: function() {
            var active_filters = this.activeFilters();

            // iterate over each record
            var records_to_show = [];
            for (var i = 0; i < this.dataset.records.length; i++) {
                var record = this.dataset.records[i];

                // iterate over each active filter
                var all_match = true;
                for (var j = 0; j < active_filters.length; j++) {
                    // does the filter pass?
                    var filter = active_filters[j];
                    if (!filter.matchesRecord(record)) {
                        all_match = false;
                        break;
                    }
                }

                // if all filters pass then add to array of matching records
                if (all_match) {
                    records_to_show.push(record);
                }
            }

            return records_to_show;
        },
        sortResults: function(results) {
            // sort records based on sort field
            var component = this;
            results.sort( function(a,b) {
                var aValue = a[component.settings.sort_field].value;
                var bValue = b[component.settings.sort_field].value;

                // if the value is a list of values, we sort by the first
                if(Array.isArray(aValue)) { aValue = aValue[0]; }
                if(Array.isArray(bValue)) { bValue = bValue[0]; }

                // null and empty values always sort last no matter the sort_dir
                if( aValue == null || aValue.trim() == "" ) { return 1; }
                if( bValue == null || bValue.trim() == "" ) { return -1; }

                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
                if( aValue==bValue ) { return 0; }
                if( component.settings.sort_dir == 'asc'  && aValue>bValue ) { return 1; }
                if( component.settings.sort_dir == 'desc' && aValue<bValue ) { return 1; }
                return -1;
            });
            return results;
        },
        resetFilters: function() {
            for (var i = 0; i < this.settings.filters.length; i++) {
                this.settings.filters[i].reset();
            }
        },
        ignoreEnter: function(e) { e.stopPropagation(); return true; }
    }
}
</script>



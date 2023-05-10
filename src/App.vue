
<template>
  <div>    
    <cape-header />
    <template v-if="siteData.status == 'ERROR'">
      <div class="row content">
        <div class="col">
          <div class="card bg-error my-2">
            <div class="card-body text-center">
              <h2>Unable to load data</h2>
              <p>An error has occurred. The error was: {{ siteData.error_message }}.</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="siteData.status == 'LOADING'">
      <div class="row content">
        <div class="col">
          <div class="card bg-primary text-white my-2">
            <div class="card-body text-center">
              <div
                class="spinner-border"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <p>Please wait while the data loads.</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="siteData.status == 'OK'">
      <cape-dataset :dataset="defaultDataset" />
    </template>
  </div>
</template>


<script>
import { CapeTools } from './CapeTools'
import CapeDataset from './components/CapeDataset.vue'
import { useEnvironmentStore } from './stores/environmentStore';
import { mapState } from 'pinia';
import CapeHeader from './components/CapeHeader.vue';

export default {
    el: '#app',
    name: 'CapeApp',
    components: {
      CapeDataset,        
      CapeHeader
},
    props: {
        
        siteData: {
            type: Object,
            default: null 
        }
    },

    computed: {
      ...mapState(useEnvironmentStore, ['appStatus'])
    },

    created: function () {
/*
        if (typeof this.data_location === 'undefined') {
            this.siteData.status = "ERROR";
            this.siteData.error_message = "Please ensure that local.js sets the property data_location";
            return;
        }

TODO fix load error messages
        if (!CapeTools.is_object(data)) {
            this.siteData.status = "ERROR";
            this.siteData.error_message = "Downloaded data is not a JSON object";
            return;
        }

        if (response.body.status == "ERROR") {
            return;
        }
*/

        this.datasets_by_id = {};
        // populate records by ID. Nb. This is using the wrong ID data for now. TODO
        for (let ds_i = 0; ds_i < this.siteData.datasets.length; ++ds_i) {
            // build the dataset to be consumed by the website.
            // contains

            // config - the config from the json data
            // raw_records - records from the json data. Used when downloading json
            // fields_by_id - dictonary of fields keyed on string identifier (value is the field details).
            // records_by_id - dictionary of processed records keyed on value of the id field. 
            // records - array of processed records
            // Notes:
            //  Processed records is a dictionary mapping field id (e.g. author) to an object: { value (e.g. 'David Pepper') , field (field configuration from config.json)
            let destinationDataset = {};

            // single dataset in config.json file
            let sourceDataset = this.siteData.datasets[ds_i];

            // add config to dataset
            destinationDataset.config = sourceDataset.config;
            // this is used for outputting as a JSON dataset
            destinationDataset.raw_records = sourceDataset.records;

            // initialise enum registries
            let enums = {};
            let intmax = {};
            let intmin = {};

            // add fields mapped by ID, and populate the filter object
            destinationDataset.fields_by_id = {};

            for (let field_i = 0; field_i < sourceDataset.config.fields.length; ++field_i) {
                let field = sourceDataset.config.fields[field_i];
                destinationDataset.fields_by_id[field.id] = field;

                if (field.type == "enum") {
                    // init enum registry for an enum field
                    enums[field.id] = {};
                }
                if (field.type == "integer") {
                    intmin[field.id] = null;
                    intmax[field.id] = null;
                }
            }

            // create a lookup table for record by id
            destinationDataset.records_by_id = {};
            destinationDataset.records = [];
            let prev_id=null;
            sourceDataset.records.sort( (a,b)=>{
                if( Number(a[destinationDataset.config.id_field]) < Number(b[destinationDataset.config.id_field]) ) {
                    return -1;
                }
                if( Number(a[destinationDataset.config.id_field]) > Number(b[destinationDataset.config.id_field]) ) {
                    return 1;
                }
                return 0;
            });
                
            for (let record_i = 0; record_i < sourceDataset.records.length; ++record_i) {
                let source_record = sourceDataset.records[record_i];
                let record = {};
                for (let field_i = 0; field_i < sourceDataset.config.fields.length; ++field_i) {
                    let field = sourceDataset.config.fields[field_i];
                    let value = source_record[field.id];
                    if (field.type == 'date' && value) {
                        // convert 25/12/2001 to 2001-12-25 TODO: this should use sprintf or date functions
                        value = value.split("/").reverse().join("-");
                    }
                    if (field.type == "enum") {
                        let enum_values = value;
                        if( !field.multiple ) { enum_values = [ enum_values ]; }
                        for( let i=0;i<enum_values.length;i++ ) { 
                            if( enum_values[i] != "" && enum_values[i] != null ) {
                                enums[field.id][enum_values[i]] = 1;
                            } 
                        } 
                    }
                    if (field.type == "integer" && value !== null ) {
                        value = parseInt( value );
                        if( isNaN(value) ) {
                            value = null; 
                        } else {
                            if( intmin[field.id]==null || value < intmin[field.id] ) {
                                intmin[field.id] = value;
                            }
                            if( intmax[field.id]==null || value > intmax[field.id] ) {
                                intmax[field.id] = value;
                            }
                            value = ""+value;
                        }
                    }

                    record[field.id] = {value: value, field: field};
                }
                let id = source_record[destinationDataset.config.id_field];
                if( prev_id !== null ) {
                    record.prev = prev_id;
                    destinationDataset.records_by_id[prev_id].next = id;
                } 
                destinationDataset.records_by_id[id] = record;
                destinationDataset.records.push(record);
                prev_id = id;
            }

            // add this list of enum values to each enum field
            let enum_fields = Object.keys(enums);
            for (let enum_i = 0; enum_i < enum_fields.length; enum_i++) {
                let fieldname = enum_fields[enum_i];
                destinationDataset.fields_by_id[fieldname].options = Object.keys(enums[fieldname]).sort(function(a, b) {
                    let a_value = a.toLowerCase();
                    let b_value = b.toLowerCase();
                    return a_value.localeCompare(b_value);
            })}

            // add integer max and mins to each integer field
            let int_fields = Object.keys(intmin);
            for (let int_i = 0; int_i < int_fields.length; int_i++) {
                let fieldname = int_fields[int_i];
                // nb. force these to be strings
                destinationDataset.fields_by_id[fieldname].min = ""+intmin[fieldname];
                destinationDataset.fields_by_id[fieldname].max = ""+intmax[fieldname];
            }

            // add dataset to our dataset collection
            this.datasets_by_id[destinationDataset.config.id] = destinationDataset;

            // first dataset becomes the default
            if (ds_i == 0) {
                this.defaultDataset = destinationDataset;                
            }



            // ==============
            // settings

            /* Init settings for this dataset, used by subcomponents */
            let settings = {};
            settings.filters_by_id = {};
            settings.filters = [];
            settings.show_all_filters = false;
    

            let free_text_filter = CapeTools.makeFilter( { label:"Search", quick_search:true, type:"freetext", id:"freetext", description:"Search for terms anywhere in the record" } );
            settings.filters.push(free_text_filter);
            let field_ids = Object.keys( destinationDataset.fields_by_id );
            // iterate over fields and make filter per field - add to settings
            for (let i=0; i<field_ids.length; ++i ) {
                let field = destinationDataset.fields_by_id[field_ids[i]];
                // don't include filter if it is set to false (undefined equates to true)
                // refactor? 
                if( field.filter === undefined ) { 
                    field.filter = true; 
                }
                if( !field.filter ) { 
                    continue; 
                }
                let filter = CapeTools.makeFilter( field );
                if( !filter ) { 
                    continue; 
                }
                settings.filters_by_id[field.id] = filter;
                settings.filters.push(filter);                
            }
    
            // expand sort field names into actual field objects for MVC
            settings.sort_dir = "asc"; // or desc
            settings.sort_fields = [];
            for( let i=0; i<destinationDataset.config.sort.length; ++i ) {
                 let field = destinationDataset.fields_by_id[ destinationDataset.config.sort[i] ];
                 settings.sort_fields.push( field );
            }
            settings.sort_field = settings.sort_fields[0].id;

            if (ds_i == 0) {
                this.defaultDatasetSettings = settings;
            }
        }
    }
}

</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css'
</style>

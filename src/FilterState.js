import {CapeTools} from "@/CapeTools";


export class FilterState {

    constructor(dataset) {
        this.filters_by_id = {};         // filter objects by ID
        this.filters = [];               // filter objects in order
        this.show_all_filters = true;   // are advanced search fields being used
        this.sort_dir = "asc";           // or desc. sort direction.
        this.sort_fields = [];           // fields that may be used for sorting
        this.sort_field = "";            // id of current sort fields

        let free_text_filter = CapeTools.makeFilter( { label:"Search", quick_search:true, type:"freetext", id:"freetext", description:"Search for terms anywhere in the record" } );
        this.filters.push(free_text_filter);
        let field_ids = Object.keys( dataset.fields_by_id );
        // iterate over fields and make filter per field - add to filterState
        for (let i=0; i<field_ids.length; ++i ) {
            let field = dataset.fields_by_id[field_ids[i]];
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
            this.filters_by_id[field.id] = filter;
            this.filters.push(filter);
        }

        // expand sort field names into actual field objects for MVC
        for( let i=0; i<dataset.config.sort.length; ++i ) {
            let field = dataset.fields_by_id[ dataset.config.sort[i] ];
            this.sort_fields.push( field );
        }
        this.sort_field = this.sort_fields[0].id;
    }
}
import {CapeTools} from "@/CapeTools";


export class FilterFormState {

    filters_by_id = {};         // filter objects by ID
    filters = [];               // filter objects in order
    show_all_filters = false;   // are advanced search fields being used
    sort_dir = "asc";           // or desc. sort direction.
    sort_fields = [];           // fields that may be used for sorting
    sort_field = "";            // id of current sort fields

    constructor(dataset) {

        const free_text_filter = CapeTools.buildFilterState({
            label: "Search",
            quick_search: true,
            type: "freetext",
            id: "freetext",
            description: "Search for terms anywhere in the record"
        });
        this.filters.push(free_text_filter);
        const field_ids = Object.keys(dataset.fields_by_id);
        // make default options implicit
        field_ids.forEach((field_id) => {
            let field = dataset.fields_by_id[field_id];
            if (field.filter === undefined) {
                field.filter = true;
            }
        })

        // iterate over fields and make filter per field - add to filterState
        field_ids.forEach((field_id) => {
            let field = dataset.fields_by_id[field_id];
            // don't include filter if it is set to false (undefined equates to true)
            // refactor?

            if (!field.filter) {
                return;
            }
            let filter = CapeTools.buildFilterState(field);
            if (!filter) {
                return;
            }
            this.filters_by_id[field.id] = filter;
            this.filters.push(filter);
        })


        // expand sort field names into actual field objects for MVC
        dataset.config.sort.forEach((fieldname)=>{
            const field = dataset.fields_by_id[fieldname];
            this.sort_fields.push(field);
        })
        this.sort_field = this.sort_fields[0].id;
    }
}
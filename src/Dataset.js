import { distinct, caseInsensitiveLocalComparer, notEmptyOrNull } from "./utils/collectionUtils";


export class Dataset {


    // config - the config from the json data
    // raw_records - records from the json data. Used when downloading json
    // fields_by_id - dictonary of fields keyed on string identifier (value is the field details).
    // records_by_id - dictionary of processed records keyed on value of the id field.
    // records - array of processed records
    // Notes:
    //  Processed records is a dictionary mapping field id (e.g. author) to an object: { value (e.g. 'David Pepper') , field (field configuration from config.json)


    // process a single dataset in config.json file
    constructor(sourceDataset) {
        // build the dataset to be consumed by the website.
        // contains

        // add config to dataset
        this.config = sourceDataset.config;
        // this is used for outputting as a JSON dataset
        this.raw_records = sourceDataset.records;

        // add fields mapped by ID
        this.fields_by_id = {};
        for (let field_i = 0; field_i < sourceDataset.config.fields.length; ++field_i) {
            const field = sourceDataset.config.fields[field_i];
            this.fields_by_id[field.id] = field;
        }

        sourceDataset.config.fields.forEach((field)=> {
            if (field.type == "enum") {
                this.setEnumFieldOptions(sourceDataset, field);
            }
            if (field.type == "integer") {
                this.setIntegerFieldMinMax(sourceDataset, field);
            }
        });

        // create a lookup table for record by id
        this.records_by_id = {};
        this.records = [];
        let prev_id = null;
        sourceDataset.records.sort((a, b) => {
            if (Number(a[this.config.id_field]) < Number(b[this.config.id_field])) {
                return -1;
            }
            if (Number(a[this.config.id_field]) > Number(b[this.config.id_field])) {
                return 1;
            }
            return 0;
        });

        sourceDataset.records.forEach( (source_record) => {
            let record = {};
            for (let field_i = 0; field_i < sourceDataset.config.fields.length; ++field_i) {
                let field = sourceDataset.config.fields[field_i];
                let value = source_record[field.id];
                if (field.type == 'date' && value) {
                    // convert 25/12/2001 to 2001-12-25 TODO: this should use sprintf or date functions
                    value = value.split("/").reverse().join("-");
                }

                if (field.type == "integer" && value !== null) {
                    value = parseInt(value);
                    if (isNaN(value)) {
                        value = null;
                    } else {
                        value = "" + value;
                    }
                }

                record[field.id] = {value: value, field: field};
            }
            let id = source_record[this.config.id_field];
            if (prev_id !== null) {
                record.prev = prev_id;
                this.records_by_id[prev_id].next = id;
            }
            this.records_by_id[id] = record;
            this.records.push(record);
            prev_id = id;
        })

        return this;
    }

    // sets the field.min and field.max values to the smallest and largest numeric values in that field.
    setIntegerFieldMinMax(sourceDataset, field) {
        const numbers = sourceDataset.records
            .map(record => parseInt(record[field.id]))
            .filter(item => !isNaN(item));
        
        // get the max and min values
        field.min = Math.min(...numbers).toString() ?? null;
        field.max = Math.max(...numbers).toString() ?? null;
    }

    // sets the field.options value to a distinct set of values from that field.
    setEnumFieldOptions(sourceDataset, field) {
        field.options = sourceDataset.records
                        .map(record => record[field.id]) 
                        .flat() 
                        .filter(notEmptyOrNull) 
                        .filter(distinct) 
                        .sort(caseInsensitiveLocalComparer);
    }
}
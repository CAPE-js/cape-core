
export class DatasetBuilder {

    // process a single dataset in config.json file
    static build(sourceDataset) {
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
        let prev_id = null;
        sourceDataset.records.sort((a, b) => {
            if (Number(a[destinationDataset.config.id_field]) < Number(b[destinationDataset.config.id_field])) {
                return -1;
            }
            if (Number(a[destinationDataset.config.id_field]) > Number(b[destinationDataset.config.id_field])) {
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
                    if (!field.multiple) {
                        enum_values = [enum_values];
                    }
                    for (let i = 0; i < enum_values.length; i++) {
                        if (enum_values[i] != "" && enum_values[i] != null) {
                            enums[field.id][enum_values[i]] = 1;
                        }
                    }
                }
                if (field.type == "integer" && value !== null) {
                    value = parseInt(value);
                    if (isNaN(value)) {
                        value = null;
                    } else {
                        if (intmin[field.id] == null || value < intmin[field.id]) {
                            intmin[field.id] = value;
                        }
                        if (intmax[field.id] == null || value > intmax[field.id]) {
                            intmax[field.id] = value;
                        }
                        value = "" + value;
                    }
                }

                record[field.id] = {value: value, field: field};
            }
            let id = source_record[destinationDataset.config.id_field];
            if (prev_id !== null) {
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
            destinationDataset.fields_by_id[fieldname].options = Object.keys(enums[fieldname]).sort(function (a, b) {
                let a_value = a.toLowerCase();
                let b_value = b.toLowerCase();
                return a_value.localeCompare(b_value);
            })
        }

        // add integer max and mins to each integer field
        let int_fields = Object.keys(intmin);
        for (let int_i = 0; int_i < int_fields.length; int_i++) {
            let fieldname = int_fields[int_i];
            // nb. force these to be strings
            destinationDataset.fields_by_id[fieldname].min = "" + intmin[fieldname];
            destinationDataset.fields_by_id[fieldname].max = "" + intmax[fieldname];
        }
        return destinationDataset;
    }

}
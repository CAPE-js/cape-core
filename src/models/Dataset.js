export class Dataset {

    config = {}; // the config from the json data
    raw_records = []; // records from the json data. Used when downloading json
    fields_by_id = {}; // dictionary of fields keyed on string identifier (value is the field details).
    records_by_id = {}; // dictionary of processed records keyed on value of the id field.
    records = []; // array of processed records

    // Notes:
    //  Processed records is a dictionary mapping field id (e.g. author) to an object: { value (e.g. 'David Pepper') , field (field configuration from config.json)


}
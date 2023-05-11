import {CapeTools} from '../CapeTools.js'
import {Filter} from "./Filter.js";

export class FreeTextFilter extends Filter {

    matchesRecord(record) {
        // check that all the terms are found in the record

        const terms = this.state.term.toLowerCase().split(/\s+/);

        for (let i = 0; i < terms.length; i++) {
            const term = CapeTools.make_pattern(terms[i]);
            let term_found = false;
            const fieldnames = Object.keys(record);
            fieldnames.forEach((fieldname) => {
                let values = record[fieldname].value;
                if (values == undefined) {
                    return;
                }
                if (!record[fieldname].field.multiple) {
                    values = [values];
                }
                for (let k = 0; k < values.length; k++) {
                    const value = "" + values[k]; // force it into a string
                    if (value.match(term)) {
                        term_found = true;
                        return;
                    }
                }
            })

            // has to match all terms
            if (!term_found) {
                return false;
            }

        }

        return true;
    }


}

    

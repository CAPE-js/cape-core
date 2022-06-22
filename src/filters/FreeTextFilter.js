import { CapeTools } from '../CapeTools.js'
import { CapeFilter } from "./CapeFilter.js";

export class FreeTextFilter extends CapeFilter {

    constructor( field ) {
        super( field );
    
        if( Object.prototype.hasOwnProperty.call( field,  'default_filter_mode' ) ) {
            this.default_mode = field['default_filter_mode'];
        } else {
            this.default_mode = "contains";
        }
    
        if( Object.prototype.hasOwnProperty.call( field,  'default' ) ) {
            this.default_term  = field['default'][0];
        } else {
            this.default_term  = "";
        }
    
        this.reset();
    }
    
    reset() {
        this.mode = this.default_mode;
        this.term = this.default_term;
    }
    
    matchesRecord(record) {
        // check that all the terms are found in the record
        
        var terms = this.term.toLowerCase().split(/\s+/);
    
        for (var i = 0; i < terms.length; i++) {
            var term = CapeTools.make_pattern(terms[i]);
            var term_found = false;
            var fieldnames = Object.keys( record );
            fieldloop: for( var j=0; j<fieldnames.length; j++ ) {
    
                var values = record[fieldnames[j]].value;
                if (values == undefined) {
                    continue;
                }
                if (!record[fieldnames[j]].field.multiple) {
                    values = [values];
                }
                for (var k = 0; k < values.length; k++) {
                    var value = "" + values[k]; // force it into a string
                    if (value.match(term)) {
                        term_found = true;
                        break fieldloop;
                    }
                }
            }
    
            // has to match all terms
            if (!term_found) {
                return false;
            }
    
        }
    
        return true;
    }
    

}

    

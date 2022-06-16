import { CapeTools } from '../CapeTools.js'
/*
 *  Filter
 *  abstract base class, should not be instantiated directly
 */
export class CapeFilter {

    constructor( field ) {
        this.field = field;
        this.placeholder = { "is":"" };
        if( field["placeholder"] && field["placeholder"]["is"] ) {
            this.placeholder.is = field["placeholder"]["is"];
        }
        this.change_filter_mode = true;
        if( field["change_filter_mode"] === false ) {
            this.change_filter_mode = false;
        }
    }

    // return true if the field term is set (including a default setting)
    isActive() {
        if( this.isSet() ) { return true; }
        return (this.term != '' );
    }
    
    // return true if the field term is not the default setting.
    isSet() {
        if( this.mode == "set" || this.mode == "not-set" ) { return true; }
        return (this.term != this.default_term);
    }
    
    reset() {
        console.warn( "Filter.prototype.reset  should be overridden. Field info:", this.field );
    }
    
    matchesValuesIs(values) {
        var term = this.term.toLowerCase()
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            if (value.toLowerCase() == term) {
                return true;
            }
        }
        return false;
    }

    matchesValuesContains(values) {
        // check that all the terms are found in the record
        
        var terms = this.term.toLowerCase().split(/\s+/);
    
        for (var i = 0; i < terms.length; i++) {
            var term = CapeTools.make_pattern(terms[i]);
            var term_found = false;
            for (var j = 0; j < values.length; j++) {
                if (values[j].match( term ) ) {
                    term_found = true;
                    break;
                }
            }
    
            // has to match all terms
            if (!term_found) {
                return false;
            }
    
        }
    
        return true;
    }

    matchesValuesSet(values) {
        for (var j = 0; j < values.length; j++) {
            if( values[j] !== null && values[j] !== "" ) {
                return true;
            }
        }
        return false;
    }

    matchesValuesNotSet(values) {
        return ! this.matchesValuesSet(values);
    }
    
    matchesRecord(record) {
        /* Assumes that the filter is set */
        
        var values = record[this.field.id].value;
        if ( values === null || (this.field.multiple && values.length==0) ) {
            // special case for not-set where not matching is a success
            if( this.mode=="not-set" ) { return true; }
            return false;
        }
    
        // to simplify things always work with arrays.
        if (!this.field.multiple) {
            values = [values];
        }
    
        return this.matchesValues( values );
    }
    
    matchesValues(values) {
        console.log( "matchesValues must be overridden!");
        console.log( values );
        return false;
    }
}

    

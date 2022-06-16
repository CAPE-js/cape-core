
import { CapeFilter } from "./CapeFilter.js";

export class IntegerFilter extends CapeFilter {
    constructor( field ) {
        super( field );
    
        if( Object.prototype.hasOwnProperty.call( this.field, 'default_filter_mode' ) ) {
            this.default_mode = this.field['default_filter_mode'];
        } else {
            this.default_mode = "between";
        }
    
        if( Object.prototype.hasOwnProperty.call( field, 'default' ) ) {
            this.default_term  = field['default'][0];
            if( field['default'].length >= 2 ) {
                this.default_term2 = field['default'][1];
            } else {
                this.default_term2 = "";
            }
        } else {
            this.default_term  = "";
            this.default_term2  = "";
        }
    
        if( field["placeholder"] && field.placeholder["between"] && field.placeholder.between[0] && field.placeholder.between[1] ) {
            this.placeholder.between = field.placeholder.between;
        } else {
            this.placeholder.between = ["Minimum "+field.min,"Maximum "+field.max];
        }
    
        this.reset();
    }
    
    
    isSet() {
        if( this.mode == "set" || this.mode == "not-set" ) { return true; }
        return (this.term != this.default_term || (this.mode == "between" && this.term2 != this.default_term2));
    }
    isActive() {
        if( this.isSet() ) { return true; }
        return (this.term != '' || (this.mode == "between" && this.term2 != ''));
    }
    
    reset() {
        this.mode = this.default_mode;
        this.term = this.default_term;
        this.term2 = this.default_term2;
    }
    
    matchesValues(values) {
        if( this.mode == "is" ) {
            return this.matchesValuesIs( values );
        } else if( this.mode == "between" ) {
            return this.matchesValuesBetween( values );
        } else if( this.mode == "set" ) {
            return this.matchesValuesSet( values );
        } else if( this.mode == "not-set" ) {
            return this.matchesValuesNotSet( values );
        }
        console.log( "Unknown search mode "+this.mode+" on ", this );
        return false;
    }
    
    matchesValuesIs(values) {
        // is a match if any of the supplied values are exact match
        for(var i = 0; i < values.length; i++) {
            if (values[i] == this.term) {
                return true;
            }
        }
    
        return false;
    }
    
    matchesValuesBetween(values) {
        var term = this.term;
        var term2 = this.term2;
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            // null terms are treated as not being bounded so up-to- or from- if only one term is set
            if ((term=="" || value >= term) && (term2=="" || value <= term2 )) {
                return true;
            }
        }
        return false;
    }
    

}

    

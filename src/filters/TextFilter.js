
import { CapeFilter } from "./CapeFilter.js";

export class TextFilter extends CapeFilter {

    constructor( field ) {
        super( field );
    
        if( Object.prototype.hasOwnProperty.call( field, 'default_filter_mode' ) ) {
            this.default_mode = field['default_filter_mode'];
        } else {
            this.default_mode = "contains";
        }
    
        if( Object.prototype.hasOwnProperty.call( field, 'default' ) ) {
            this.default_term  = field['default'][0];
        } else {
            this.default_term  = "";
        }
    
        if( field["placeholder"] && field.placeholder["contains"] ) {
            this.placeholder.contains = field.placeholder.contains;
        } else {
            this.placeholder.contains = "";
        }
    
        this.reset();
    }
    
    reset() {
        this.mode = this.default_mode;
        this.term = this.default_term;
    }
    
    matchesValues(values) {
        if( this.mode == "is" ) {
            return this.matchesValuesIs( values );
        } else if( this.mode == "contains" ) {
            return this.matchesValuesContains( values );
        } else if( this.mode == "set" ) {
            return this.matchesValuesSet( values );
        } else if( this.mode == "not-set" ) {
            return this.matchesValuesNotSet( values );
        }
        console.log( "Unknown search mode "+this.mode+" on ", this );
        return false;
    }
    

}

    

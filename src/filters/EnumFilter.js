
import { CapeFilter } from "./CapeFilter.js";

export class EnumFilter extends CapeFilter {
    
    constructor( field ) {
        super( field );
    
        if( Object.prototype.hasOwnProperty.call( this.field, 'default_filter_mode' ) ) {
            this.default_mode = this.field['default_filter_mode'];
        } else {
            this.default_mode = "one-of";
        }
    
        if( Object.prototype.hasOwnProperty.call( field, 'default' ) ) {
            this.default_term  = field['default'][0];
            this.default_terms = [];
            field['default'].forEach( (term) => { this.default_terms.push( { 'name': term } ); } );
        } else {
            this.default_term  = "";
            this.default_terms = [];
        }
    
        // prep options just the way multiselect likes them
        this.field.multiselectOptions = [];
        for( var i=0;i<field.options.length;i++ ) {
            this.field.multiselectOptions.push( { name: field.options[i] } );
        }
    
        this.reset();
    }
    
    
    isSet() {
        if( this.mode == "set" || this.mode == "not-set" ) { return true; }
        if (this.mode == "is") {
            return this.term != this.default_term;
        } else if (this.mode == "one-of") {
            // this one is the pain. We need to compare the name properties of two unordered object lists
            let current_terms_code = this.terms.map( item => item["name"] ).sort().join(":");
            let default_terms_code = this.default_terms.map( item => item["name"] ).sort().join(":");
            return current_terms_code != default_terms_code;
        }
    }
    isActive() {
        if( this.isSet() ) { return true; }
        if (this.mode == "is") {
            return this.term != '';
        } else if (this.mode == "one-of") {
            return this.terms.length > 0;
        }
    }
    
    reset() {
        this.mode  = this.default_mode;
        this.term  = this.default_term;
        // need to ensure it's not the same actual list reference
        this.terms = this.default_terms.map( item=>item );
    }
    
    matchesValues(values) {
        if( this.mode == "is" ) {
            // find a value that matches the term
            for(var i = 0; i < values.length; i++) {
                if (values[i] == this.term) {
                    return true;
                }
            }
            return false;
        } else if( this.mode == "one-of" ) {
            // do any of the terms match any of the values?
            for(var i = 0; i < values.length; i++) {
                for(var j = 0; j < this.terms.length; j++)
                // nb terms works differently in multiselect and is a list of objects
                if (values[i] == this.terms[j].name) {
                    return true;
                }
            }
            return false;
        } else if( this.mode == "set" ) {
            return this.matchesValuesSet( values );
        } else if( this.mode == "not-set" ) {
            return this.matchesValuesNotSet( values );
        }
    
        console.log( "Unknown search mode "+this.mode+" on ", this );
        return false;
    }
    

}

    

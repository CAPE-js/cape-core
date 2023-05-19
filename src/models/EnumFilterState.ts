import {FilterState} from "@/models/FilterState";
import {FilterMode} from '@/models/FilterMode';
import {FilterTerm} from '@/models/FilterTerm';

export class EnumFilterState extends FilterState {

    // CHRIS - are terms strings or objects or both? If both then when is each type used?
    terms: Array<FilterTerm>;    
    
    default_term = "";
    
    default_terms = Array<FilterTerm>;
    default_mode = FilterMode.OneOf;
    
    constructor( field ) {
        super( field );

        if( field.default_filter_mode !== undefined ) {
                this.default_mode = this.field['default_filter_mode'];
        }

        if( field.default !== undefined ) {
            this.default_term  = field['default'][0];
            this.default_terms = FilterTerm[0];
            field['default'].forEach( (term) => { this.default_terms.push( { 'name': term } ); } );
        }

        // prep options just the way multiselect likes them
        // but ugh, this should not live on the field
        this.field.multiselectOptions = [];
        field.options.forEach( (option) => {  this.field.multiselectOptions.push( { name: option }) })

        this.reset();
    }

    isSet() {
        if( this.mode === FilterMode.Set || this.mode === FilterMode.NotSet) { return true; }
        if (this.mode === FilterMode.Is) {
            return this.term != this.default_term;
        } else if (this.mode === FilterMode.OneOf) {
            // this one is the pain. We need to compare the name properties of two unordered object lists
            const current_terms_code = this.terms.map( item => item["name"] ).sort().join(":");
            const default_terms_code = this.default_terms.map( item => item["name"] ).sort().join(":");
            return current_terms_code != default_terms_code;
        }
    }
    isActive() {
        if( this.isSet() ) { return true; }
        if (this.mode === FilterMode.Is) {
            return this.term != '';
        } else if (this.mode === FilterMode.OneOf) {
            return this.terms.length > 0;
        }
    }

    reset() {
        this.mode  = this.default_mode;
        this.term  = this.default_term;
        // need to ensure it's not the same actual list reference
        this.terms = this.default_terms.map(item => item);
    }
}
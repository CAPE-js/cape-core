
export class FilterState {
    placeholder = { "is":""}; // placeholders to appear in/near input elements. sub elements depend on filter
    change_filter_mode = true; // can the is/between/one-of mode be changed?
    mode = "is"; // the current mode of this filter
    term = ""; // the first parameter
    field;  // the field associated with this filter state

    constructor( field ) {
        if( field["placeholder"] && field["placeholder"]["is"] ) {
            this.placeholder.is = field["placeholder"]["is"];
        }
        if( field["change_filter_mode"] === false ) {
            this.change_filter_mode = false;
        }
        this.field = field;
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
}
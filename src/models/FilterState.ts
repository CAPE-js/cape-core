import { FilterMode } from "./FilterMode";
import { FilterModeTermState } from "./FilterModeTermState";
import { FilterPlaceholder } from "./FilterPlaceholder";
import { FilterModeState } from "./filterModeStates/FilterModeState";

type modeId = string;

export abstract class FilterState {    

    change_filter_mode: boolean = true; // can the is/between/one-of mode be changed?            
    currentMode: modeId; // todo change to something else? e.g. possible values as strings (chris doesn't like enums here)
    defaultMode: modeId;
    modeStates: Record<modeId, FilterModeTermState>;    
    
    
    // TODO 'field' should be a defined type.
    field;  // the field associated with this filter state

    constructor( field ) {

        

        if( field["placeholder"] && field["placeholder"]["is"] ) {
            this.placeholder_is = field["placeholder"]["is"];
        }
        if( field["change_filter_mode"] === false ) {
            this.change_filter_mode = false;
        }
        
        this.field = field;
    }

    // Should this field be included when filtering?
    isActive() {

        if( this.mode === FilterMode.Set || this.mode === FilterMode.NotSet ) { 
            return true; 
        }
        
        if (this.term != this.default_term) {
            return true;
        }

        return (this.term != '' );
    }

    reset() {
        console.warn( "Filter.prototype.reset  should be overridden. Field info:", this.field );
    }
}
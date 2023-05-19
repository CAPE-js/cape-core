import {FilterState} from "@/models/FilterState";
import { FilterMode } from "./FilterMode";
import { Is } from "./filterModeStates/Is";

export class DateFilterState extends FilterState {


    modeStates: { "is": Is };
    currentMode
    
    
    default_term = "";
    default_term2 = "";
    term2 = "";
    default_mode = FilterMode.Between;
    
    constructor( field ) {

        modeStates = { "is": new Is() }



        super( field );

        if( field.default !== undefined ) {
            this.modes.between.defaultTerm = field['default'][0];
            
            this.default_term  = field['default'][0];
            if( field['default'].length >= 2 ) {
                this.default_term2 = field['default'][1];
            }
        }

        if( field["placeholder"] && field.placeholder["between"] && field.placeholder.between[0] && field.placeholder.between[1] ) {
            this.placeholder.between = field.placeholder.between;
        }

        this.reset();
    }

    isSet() {
        if( this.mode === FilterMode.Set || this.mode === FilterMode.NotSet ) { return true; }
        return (this.term != this.default_term || (this.mode === FilterMode.Between && this.term2 != this.default_term2));
    }
    isActive() {
        if( this.isSet() ) { return true; }
        return (this.term != '' || (this.mode === FilterMode.Between && this.term2 != ''));
    }

    reset() {
        this.mode = this.default_mode;
        this.term = this.default_term;
        this.term2 = this.default_term2;
    }

}
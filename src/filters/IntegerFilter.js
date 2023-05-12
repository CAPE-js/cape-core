
import { Filter } from "./Filter.js";

export class IntegerFilter extends Filter {

    matchesValues(values) {
        switch(this.state.mode) {
            case "is": return this.matchesValuesIs(values);
            case "between": return this.matchesValuesBetween(values);
            case "set": return this.matchesValuesSet(values);
            case "not-set": return this.matchesValuesNotSet(values);
        }
        console.log( "Unknown search mode "+this.state.mode+" on ", this );
        return false;
    }
    
    matchesValuesIs(values) {
        // is a match if any of the supplied values are exact match
        for(let i = 0; i < values.length; i++) {
            if (values[i] == this.state.term) {
                return true;
            }
        }
    
        return false;
    }
    
    matchesValuesBetween(values) {
        const term = this.state.term;
        const term2 = this.state.term2;
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            // null terms are treated as not being bounded so up-to- or from- if only one term is set
            if ((term=="" || value >= term) && (term2=="" || value <= term2 )) {
                return true;
            }
        }
        return false;
    }
    

}

    

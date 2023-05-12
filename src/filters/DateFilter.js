import {Filter} from "./Filter.js";

export class DateFilter extends Filter {

    matchesValues(values) {
        switch(this.state.mode) {
            case "is": return this.matchesValuesIs(values);
            case "between": return this.matchesValuesBetween(values);
            case "set": return this.matchesValuesSet(values);
            case "not-set": return this.matchesValuesNotSet(values);
        }
        console.log("Unknown search mode " + this.state.mode + " on ", this);
        return false;
    }

    // for dates, date "is" actually is 'starts with' so that 1990-02-02 "is" 1990
    matchesValuesIs(values) {
        const term = this.state.term.toLowerCase()
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            if (value.indexOf(term) == 0) {
                return true;
            }
        }
        return false;
    }

    matchesValuesBetween(values) {
        // Pad dates if they are missing month and day
        let term = this.state.term;
        if (term.length == 4) {
            term += "-00";
        }
        if (term.length == 7) {
            term += "-00";
        }
        let term2 = this.state.term2.toLowerCase();
        if (term2.length == 4) {
            term2 += "-99";
        }
        if (term2.length == 7) {
            term2 += "-99";
        }
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            // null terms are treated as not being bounded so up-to- or from- if only one term is set
            if ((term == "" || value >= term) && (term2 == "" || value <= term2)) {
                return true;
            }
        }
        return false;
    }

}

    

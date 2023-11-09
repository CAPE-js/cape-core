import {Filter} from "./Filter.js";

export class EnumFilter extends Filter {

    matchesValues(values) {

        switch (this.state.mode) {
            case "is":
                return this.matchesValuesIs(values);
            case "one-of":
                return this.matchesValuesOneOf(values);
            case "set":
                return this.matchesValuesSet(values);
            case "not-set":
                return this.matchesValuesNotSet(values);
        }

        console.log("Unknown search mode " + this.state.mode + " on ", this);
        return false;
    }

    matchesValuesOneOf(values) {
        // do any of the terms match any of the values?
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < this.state.terms.length; j++)
                // nb terms works differently in multiselect and is a list of objects
                if (values[i] == this.state.terms[j].name) {
                    return true;
                }
        }
        return false;
    }

    matchesValuesIs(values) {
        // find a value that matches the term
        for (let i = 0; i < values.length; i++) {
            if (values[i] == this.state.term) {
                return true;
            }
        }
        return false;
    }
}

    

import { FilterModeTermState } from "../FilterModeTermState";

export abstract class FilterModeState {
    
    // define the filter terms
    terms: Array<FilterModeTermState>;

    // should the filter be included in a query?
    abstract isActive(): boolean;

    constructor() {
        this.terms = [];
    }
}
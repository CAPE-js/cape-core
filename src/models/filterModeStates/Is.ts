import { FilterModeTermState } from "../FilterModeTermState";
import { FilterModeState } from "./FilterModeState";

export class Is extends FilterModeState {
    
    constructor() {
        super();
        this.terms = [new FilterModeTermState("", "")]; // todo populate terms from config
    }

    isActive(): boolean {
        const term = this.terms[0];
        return term.currentValue != "" && term.currentValue != term.defaultValue;
    }
}
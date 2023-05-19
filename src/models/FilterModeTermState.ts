export class FilterModeTermState {
    
    currentValue: string;
    readonly defaultValue: string;
    readonly placeholderText: string;

    constructor(defaultValue: string, placeholderText: string) {
        this.defaultValue = defaultValue;
        this.currentValue = defaultValue;
        this.placeholderText = placeholderText;
    }
}
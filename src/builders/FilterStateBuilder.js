import {TextFilterState} from "@/models/TextFilterState";
import {IntegerFilterState} from "@/models/IntegerFilterState";
import {EnumFilterState} from "@/models/EnumFilterState";
import {DateFilterState} from "@/models/DateFilterState";
import {FreeTextFilterState} from "@/models/FreeTextFilterState";

export class FilterStateBuilder {

    // filter state factory
    static build(field) {
        switch (field.type) {
            case "text":    return new TextFilterState( field );
            case "integer": return new IntegerFilterState( field );
            case "enum":    return new EnumFilterState( field );
            case "date":    return new DateFilterState( field );
            case "freetext":return new FreeTextFilterState( field );
            case "ignore":  return false;
        }
        throw new Error("Could not create a search filter state for field type '"+field.type+"'");
    }
}
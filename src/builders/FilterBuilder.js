// filter factory
import {TextFilter} from "@/filters/TextFilter";
import {IntegerFilter} from "@/filters/IntegerFilter";
import {EnumFilter} from "@/filters/EnumFilter";
import {DateFilter} from "@/filters/DateFilter";
import {FreeTextFilter} from "@/filters/FreeTextFilter";

export class FilterBuilder {

    static build(state) {
        switch (state.field.type) {
            case "text":
                return new TextFilter(state);
            case "integer":
                return new IntegerFilter(state);
            case "enum":
                return new EnumFilter(state);
            case "date":
                return new DateFilter(state);
            case "freetext":
                return new FreeTextFilter(state);
            case "ignore":
                return false;
        }
        throw new Error("Could not create a search filter for field type '" + state.field.type + "'");
    }
}
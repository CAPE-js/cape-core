

<template>
  <input
    :id="input_id"
    :placeholder="input_placeholder"
    :type="input_type"
    :value="input_value"
    @input="debounce_input"
  >
</template>

<script>
import { debounce } from "lodash"
export default {
    name: "DebouncedInput", 
    props: { 
        type: { type: String, default: "text" } , 
        value:{ type: [String,Number], default: "" }, 
        id:   { type: String, default: null },
        placeholder: { type:String, default: ""}
    },
    // note: use computed to expose props as local values, this avoids bad practice vue warning.
    computed: {
        input_type: function() {
            return this.type;
        },
        input_value: function() {
            return this.value;
        },
        input_id: function() {
            return this.id;
        },
        input_placeholder: function() {
            return this.placeholder;
        }
    },
    created: function() {
        var this_component = this;
        this.debounce_input= debounce(function (e) {
            this_component.$emit('input', e.target.value);
        }, 500);
    }
}
</script>


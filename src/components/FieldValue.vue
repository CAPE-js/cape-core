<script>
import moment from 'moment'
import { h } from 'vue'
export default {
    name: "FieldValue",
    props: { typedValue: { type: Object, default: null }, linkValue: { type: Boolean, default: true } },
    methods: {
        renderSingleValue: function( value ) {
            let rvalue = value;
            if( this.typedValue.field.type == 'date' ) {
                const day = moment( rvalue );
                rvalue = day.format("dddd, D MMMM YYYY");
            }
            if( this.linkValue ) {
                const path = "/browse/" + this.typedValue.field.id + "/" + value;
                rvalue = h( "router-link", {attrs:{to: path}}, rvalue );
            }
            return rvalue;
        }
    },
    render: function () {
        let rendered_value;
        let classList = ["cape-field-value"];
        if (!this.typedValue.value || (this.typedValue.field.multiple===true&&this.typedValue.value.length==0)) {
            rendered_value = "unspecified";
            classList.push( "cape-field-null" );
        } else if (this.typedValue.field.multiple === true) {
            rendered_value = [];
            for (let i = 0; i < this.typedValue.value.length; ++i) {
                if (rendered_value.length) {
                    rendered_value.push("; ");
                }
                rendered_value.push( this.renderSingleValue( this.typedValue.value[i] ) );
            }
        } else {
            rendered_value = [this.renderSingleValue( this.typedValue.value )];
        }
        return h("div", {class: classList }, rendered_value);
    }
}
</script>






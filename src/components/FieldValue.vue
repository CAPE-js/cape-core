<script>
export default {
    name: "field-value",
    props: {"typedValue": Object, "linkValue":{type:Boolean,default:true}},
    methods: {
        renderSingleValue: function( createElement, value ) {
            var rvalue = value;
            if( this.typedValue.field.type == 'date' ) {
                var day = moment( rvalue );
                rvalue = day.format("dddd, D MMMM  YYYY");
            }
            if( this.linkValue ) {
                var path = "/browse/" + this.typedValue.field.id + "/" + value;
                rvalue = createElement( "router-link", {attrs:{to: path}}, rvalue );
            }
            return rvalue;
        }
    },
    render: function (createElement) {
        var rendered_value;
        var classList = ["field-value"];
        if (!this.typedValue.value || (this.typedValue.field.multiple===true&&this.typedValue.value.length==0)) {
            rendered_value = "unspecified";
            classList.push( "field-null" );
        } else if (this.typedValue.field.multiple === true) {
            rendered_value = [];
            for (var i = 0; i < this.typedValue.value.length; ++i) {
                if (rendered_value.length) {
                    rendered_value.push("; ");
                }
                rendered_value.push( this.renderSingleValue( createElement, this.typedValue.value[i] ) );
            }
        } else {
            rendered_value = [this.renderSingleValue( createElement, this.typedValue.value )];
        }
        return createElement("div", {class: classList }, rendered_value);
    }
}
</script>






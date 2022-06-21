
<template>
<div>
  <div v-if="!typedValue" class="cape-error">[Error, trying to render non-existant field]</div>
  <field-label-and-value v-else-if="typedValue.value != '' && typedValue.value != null && !(typeof typedValue.value=='array' && typedValue.value.length==0)" v-bind:typedValue="typedValue" v-bind:linkValue="linkValue"></field-label-and-value>
</div>
</template>

<script>
import FieldLabelAndValue from "./FieldLabelAndValue.vue"
export default {
    name: "field-label-and-value-if-set",
    components: { FieldLabelAndValue },
    props: ["typedValue","linkValue"]
}
</script>


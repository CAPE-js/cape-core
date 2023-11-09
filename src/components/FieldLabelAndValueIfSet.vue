<template>
  <div>
    <div
        v-if="!typedValue"
        class="cape-error"
    >
      [Error, trying to render non-existant field]
    </div>
    <field-label-and-value
        v-else-if="typedValue.value != '' && typedValue.value != null && !(typeof typedValue.value=='array' && typedValue.value.length==0)"
        :link-value="linkValue"
        :typed-value="typedValue"
    />
  </div>
</template>

<script>
import FieldLabelAndValue from "./FieldLabelAndValue.vue"

export default {
  name: "FieldLabelAndValueIfSet",
  components: {FieldLabelAndValue},
  props: {typedValue: {type: Object, default: null}, linkValue: {type: Boolean, default: true}}
}
</script>


<template>
  <div>
    <div class="cape-field-label-and-value">
      <div
        v-if="!typedValue"
        class="cape-error"
      >
        [Error, trying to render non-existant field]
      </div>
      <template v-else-if="typedValue.field.value != ''">
        <div
          v-if="typedValue.field.description != null"
          class="cape-field-label"
          data-toggle="tooltip"
          :title="typedValue.field.description"
        >
          {{ typedValue.field.label }}
        </div>
        <div
          v-else
          class="cape-field-label"
        >
          {{ typedValue.field.label }}
        </div>
        <field-value
          :typed-value="typedValue"
          :link-value="linkValue"
        />
      </template>
    </div>
  </div>
</template>


<script>
import FieldValue from "./FieldValue.vue"
export default {
    name: "FieldLabelAndValue",
    components: { FieldValue },
    props: { typedValue: { type: Object, default: null }, linkValue: { type: Boolean, default: true } }
}
</script>



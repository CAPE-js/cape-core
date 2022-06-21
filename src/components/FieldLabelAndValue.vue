<template>
  <div>
    <div class="field-label-and-value">
      <div
        v-if="!typedValue"
        class="cape-error"
      >
        [Error, trying to render non-existant field]
      </div>
      <template v-else-if="typedValue.field.value != ''">
        <div
          v-if="typedValue.field.description != null"
          class="field-label"
          data-toggle="tooltip"
          :title="typedValue.field.description"
        >
          {{ typedValue.field.label }}
        </div>
        <div
          v-else
          class="field-label"
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
    name: "field-label-and-value",
    components: { FieldValue },
    props: ["typedValue","linkValue"]
}
</script>



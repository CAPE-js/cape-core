

<template>
  <input @input="debounceInput">
</template>

<script>
export default {
    name: "DebouncedInput", 
    props: { modelValue: { type: String, default: "" } },
    emits: [ "update:modelValue" ],
    data: () => ({
        debounce: null
    }),
    methods: {
        debounceInput(event) {
            this.message = null
            this.typing = 'You are typing'
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                this.typing = null
                this.message = event.target.value
            this.$emit('update:modelValue', event.target.value);
            }, 100)
        }
    }
}
</script>


<template>
  <div class="mb-3">
    <label :for="name" class="form-label">{{label}}</label>
    <input
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :min="max"
        :max="max"
        :autocomplete="name + '-new'"

        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"

        class="form-control"
    />

    <div class="form-text">{{help}}</div>

  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    name: String,
    type: String,
    label: String,
    placeholder: String,
    required: String,
    min: String,
    max: String,
    modelValue: String,
    help: String
  },
}
</script>

<style scoped>

</style>
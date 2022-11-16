<template>
  <div class="form-check">
    <input type="checkbox" :checked="checked" :required="required" class="form-check-input">
    <label :for="name" class="form-check-label">
      {{label}}
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckInput",
  props: ["items", "name", "required", "label", "checked"]

}
</script>

<style scoped>

</style>
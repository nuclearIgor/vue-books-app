<template>
  <div class="container">
    <div class="row">
      <div class="col">

        <h1 class="mt-3">book edit</h1>

      </div>
    </div>
  </div>
</template>

<script>
import Security from "@/components/security";

export default {
  name: "BookEdit",
  beforeMount() {
    Security.requireToken()
  }
}
</script>

<style scoped>

</style>
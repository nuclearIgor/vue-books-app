<template>
  <footer class="d-flex align-items-center justify-content-center mt-5">
  Copyright IGAO PROGRAMADOR ESTRELA &copy; {{new Date().getFullYear()}}
  </footer>
</template>

<script>
export default {
  name: "FooterComponent"
}
</script>

<style scoped>
  footer {
    background: black;
    color: white;
    min-height: 3em;
    font-size: 0.8em;
  }
</style>
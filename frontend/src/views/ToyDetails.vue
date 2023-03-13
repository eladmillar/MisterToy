<template>
  <section>
    <pre>
     {{toy}}
     </pre>
    <br />
    <RouterLink to="/toy">Close</RouterLink>
  </section>
</template>

<script>
export default {
  computed: {
    toy() {
      return this.$store.getters.toyById(this.$route.params.toyId);
    }
  }
};
</script>
<template>
  <section>
    <AppHeader />
    <RouterView />
    <AppFooter />
  </section>
</template>

<script >
import AppFooter from "./components/AppFooter.vue";
import AppHeader from "./components/AppHeader.vue";
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  created() {
    this.$store.dispatch({ type: "loadToys" });
  }
};
</script>


<style></style>

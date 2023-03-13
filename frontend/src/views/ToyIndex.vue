<template>
  <section>
    <h1>toy index</h1>
    {{ msg }}
    <!-- {{ toys }} -->
    <ToyList :toys="toys" />
  </section>
</template>

<script>
import ToyList from "@/components/ToyList.vue";
export default {
  name: "ToyIndex",
  components: {
    ToyList
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    msg() {
      console.log(this.$store.getters.getMsg);
      return this.$store.getters.getMsg;
    },
    toys() {
    //   console.log(this.$store.getters.toysToDisplay);
      return this.$store.getters.toysToDisplay;
    }
  }
};
</script>

<style></style>
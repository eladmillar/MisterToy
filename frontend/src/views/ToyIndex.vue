<template>
  <section class="main">
    <h1>toy index</h1>
    <ToyFilter @filter="debounceHandler" />

    <RouterLink to="/toy/edit" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">Add Toy</button>
    </RouterLink>
    <ToyList :toys="toys" />
  </section>
</template>

<script>
import ToyList from "@/components/ToyList.vue";
import ToyFilter from "@/components/ToyFilter.vue";
import { utilService } from "../services/util-service";
export default {
  name: "ToyIndex",
  components: {
    ToyList,
    ToyFilter
  },
  data() {
    return {};
  },
  created() {
    // this.$store.dispatch({ type: "loadToys", filterBy });
    this.debounceHandler = utilService.debounce(this.setFilter, 500);
  },
  computed: {
    msg() {
      console.log(this.$store.getters.getMsg);
      return this.$store.getters.getMsg;
    },
    toys() {
      return this.$store.getters.toysToDisplay;
    }
  },
  methods: {
    setFilter(filterBy) {
      //   console.log("filterBy", filterBy);
      this.$store.dispatch({ type: "setFilter", filterBy }).catch(err => {
        showErrorMsg("Cannot set filter");
      });
    }
  }
};
</script>

<style></style>
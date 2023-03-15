<template>
  <section class="toy-list">
    <h1>Toy List</h1>
    <!-- <RouterLink class="btn btn-add" to="/toy/edit">Add</RouterLink> -->
    <ul class="clean-list">
      <ToyPreview v-for="toy in toys" :key="toy._id" :toy="toy" />
    </ul>
    <!-- <pre>{{ toys }}</pre> -->
  </section>
</template>

<script>
import ToyPreview from "./ToyPreview.vue";
export default {
  name: "ToyList",
  props: ["toys"],
  components: {
    ToyPreview
  }
};
</script>

<style>
</style>


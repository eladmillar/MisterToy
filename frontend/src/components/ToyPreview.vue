<template>
  <li class="toy-preview">
    <section>
      <p>{{ toy.name }}</p>
      <p>Price: ${{toy.price}}</p>
      <p>In stock: {{ toy.inStock }}</p>
      <!-- <pre>{{ toy }}</pre> -->
    </section>
    <br />
    <RouterLink :to="'/toy/edit/'+toy._id" custom v-slot="{ navigate }">
      <button class="btn-edit" @click="navigate" role="link">Edit</button>
    </RouterLink>

    <RouterLink :to="'/toy/details/'+toy._id" custom v-slot="{ navigate }">
      <button class="btn-details" @click="navigate" role="link">Details</button>
    </RouterLink>
    <button class="btn-delete" @click="removeToy">Delete</button>
  </li>
</template>

<script>
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
export default {
  name: "ToyPreview",
  props: ["toy"],
  methods: {
    removeToy() {
      this.$store
        .dispatch({ type: "removeToy", toyId: this.toy._id })
        .then(() => {
          showSuccessMsg("Toy removed");
        })
        .catch(err => {
          showErrorMsg("Cannot remove toy");
        });
    }
  }
};
</script>

<style>
</style>
<template>
  <li class="toy-preview">
    <section>
      Toy name: {{ toy.name }}
      <br />
      Price: {{toy.Price}}
      <br />
      In stock: {{ toy.inStock }}
      <!-- <pre>{{ toy }}</pre> -->
    </section>
    <br />
    <RouterLink :to="'/toy/edit/'+toy._id">Edit</RouterLink>|
    <RouterLink :to="'/toy/details/'+toy._id">Details</RouterLink>
  </li>
</template>

<script>
export default {
  name: "ToyPreview",
  props: ["toy"]
};
</script>

<style>
</style>
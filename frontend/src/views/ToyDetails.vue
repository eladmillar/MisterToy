<template>
  <section class="toy-details flex flex-column">
    <p>Product name: {{toy.name}}</p>
    <p>Price: ${{toy.price}}</p>
    <p>In stock: {{ toy.inStock }}</p>
    <p>created: {{ toy.createdAt }}</p>
    <p>Labels: {{ toy.labels }}</p>

    <br />
    <span>
      <RouterLink to="/toy">Close</RouterLink>
    </span>
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
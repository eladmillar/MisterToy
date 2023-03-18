<template>
  <section v-if="toy" class="toy-details flex flex-column">
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
import { toyService } from "../services/toy.service";
export default {
  data() {
    return {
      toy: null
    };
  },
  async created() {
    const { toyId } = this.$route.params;
    const toy = await toyService.getById(toyId);
    this.toy = toy;
  }
};
</script>
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
  created() {
    const { toyId } = this.$route.params;
    console.log("this.$route.params", this.$route.params);
    toyService.getById(toyId).then(toy => {
      this.toy = toy;
    });
  }
};
</script>
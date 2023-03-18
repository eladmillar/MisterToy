<template>
  <section v-if="toy" @submit.prevent="saveToy" class="toy-edit">
    <form>
      <section>
        <label for="name">Name:</label>
        <input v-model="toy.name" />
      </section>
      <section>
        <label for="price">Price:</label>
        <input v-model="toy.price" />
      </section>
      <button @click="saveToy">Save</button>
    </form>
    <br />
    <RouterLink to="/toy">Close</RouterLink>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import ToyPreview from "../components/ToyPreview.vue";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export default {
  name: "toy-edit",
  async created() {
    const { toyId } = this.$route.params;
    if (toyId) {
      const toy = await toyService.getById(toyId);
      this.toy = toy;
    } else this.toy = toyService.getEmptyToy();
  },
  data() {
    return {
      toy: null
    };
  },
  methods: {
    async saveToy() {
      try {
        this.$store.dispatch({ type: "saveToy", toy: this.toy });
        showSuccessMsg("Toy saved", console.log("Toy saved"));
        this.$router.push("/toy");
      } catch {
        showErrorMsg("Cannot save toy");
      }
    },
    computed: {
      labels() {
        return this.$store.getters.labels;
      }
    },
    components: {
      ToyPreview
    }
  }
};
</script>

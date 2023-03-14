<template>
  <div class="toy-edit">
    <div>
      <section>
        <label for="name">Name:</label>
        <input v-model="toy.name" />
      </section>
      <section>
        <label for="price">Price:</label>
        <input v-model="toy.price" />
      </section>
      <button @click="saveToy">Save</button>
    </div>
    <br />
    <RouterLink to="/toy">Close</RouterLink>
  </div>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import ToyPreview from "../components/ToyPreview.vue";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

export default {
  created() {
    this.toy = !this.existingToy._id ? this.emptyToy : this.existingToy;
  },
  data() {
    return {
      toy: null
    };
  },
  methods: {
    saveToy() {
      this.$store
        .dispatch({ type: "saveToy", toy: this.toy })
        .then(toy => {
          showSuccessMsg("Toy saved", console.log("Toy saved"));
          this.$router.push("/toy");
        })
        .catch(err => {
          showErrorMsg("Cannot save toy");
        });
    }
  },
  computed: {
    existingToy() {
      return this.$store.getters.toyById(this.$route.params.toyId);
    },
    emptyToy() {
      const emptyToy = toyService.getEmptyToy();
      return emptyToy;
    }
  },
  components: {
    ToyPreview
  }
};
</script>

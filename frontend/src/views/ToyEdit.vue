<template>
  <section class="toy-edit">
    <label for="name">Name:</label>
    <input v-model="toy.name" />
    <br />
    <label for="price">Price:</label>
    <input v-model="toy.price" />
    <pre>{{ toy }}</pre>
    <button v-if="toy._id" @click="removeToy">X</button>
    <br />
    <button @click="saveToy">Save</button>
    <br />
    <RouterLink to="/toy">Close</RouterLink>
  </section>
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
          showSuccessMsg("Toy saved");
          this.$router.push("/toy");
        })
        .catch(err => {
          showErrorMsg("Cannot save toy");
        });
    },
    removeToy() {
      this.$store
        .dispatch({ type: "removeToy", toyId: this.toy._id })
        .then(toy => {
          showSuccessMsg("Toy removed");
          this.$router.push("/toy");
        })
        .catch(err => {
          showErrorMsg("Cannot remove toy");
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

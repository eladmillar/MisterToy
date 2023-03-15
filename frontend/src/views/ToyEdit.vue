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
  created() {
    const { toyId } = this.$route.params;
    console.log("this.$route.params", this.$route.params);
    if (toyId) {
      toyService.getById(toyId).then(toy => {
        this.toy = toy;
      });
    } else this.toy = toyService.getEmptyToy();
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
    labels() {
      return this.$store.getters.labels;
    }
  },
  components: {
    ToyPreview
  }
};
</script>

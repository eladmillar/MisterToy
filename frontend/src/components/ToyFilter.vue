<template>
  <section class="toy-filter flex space-between">
    <h1>Filter</h1>
    <section class="inputs flex space-between">
      <section>
        <label for="search">Search:</label>
        <input
          id="search"
          name="search"
          v-model="filterBy.name"
          @input="setFilter"
          type="text"
          placeholder="Find toy.."
        />
      </section>
      <label for="labels">Labels:</label>
      <select name="labels" id="labels" @input="setFilter" v-model="filterBy.labels" multiple>
        <option value="On wheels">On wheels</option>
        <option value="Box game">Box game</option>
        <option value="Art">Art</option>
        <option value="Baby">Baby</option>
        <option value="Doll">Doll</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Outdoor">Outdoor</option>
      </select>
      <section>
        <label for="stock">In Stock:</label>
        <select name="stock" id="stock" @input="setFilter" v-model="filterBy.inStock">
          <option value selected="selected">All</option>
          <option :value="true">In Stock</option>
        </select>
      </section>
      <section>
        <label for="sort">Sort By:</label>
        <select name="sort" id="sort" @input="setFilter" v-model="filterBy.sortBy">
          <option value>All</option>
          <option value="price">price</option>
          <option value="name">Name</option>
          <option value="createdAt">Created</option>
        </select>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: "",
        inStock: null,
        labels: [],
        sortBy: ""
      }
    };
  },
  methods: {
    setFilter() {
      this.$emit("filter", this.filterBy);
    }
  }
};
</script>

<style>
</style>

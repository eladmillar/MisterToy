<template>
  <li class="toy-preview flex space-between">
    <pre>{{ toy }}</pre>
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
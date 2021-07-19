<template>
  <main>
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      repositories: null,
    };
  },
  async mounted() {},
  computed: {
    user() {
      return this.repositories;
    },
  },
};
</script>

<style lang="scss" scoped></style>

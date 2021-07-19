<template>
  <div class="card">
    <div class="card__header">
      <h3 class="card__header-title">{{ r.name }}</h3>
      <span class="card__header-link">
        <a :href="r.html_url">Ссылка на пользователя</a></span
      >
    </div>

    <div class="card__body">
      <p class="card__body-text"></p>
      <p class="card__body-starts">Наблюдатели: {{ r.watchers }}</p>
      <p class="card__body-forks">Количество форков: {{ r.forks_count }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    repo: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const r = props;
    return { r: r.repo };
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid $basic-white;
  margin-bottom: 20px;
  width: 40%;
  padding: 20px;
  min-height: 100px;
}
.card__header-title {
  margin-bottom: 10px;
}
</style>

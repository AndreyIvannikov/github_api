import { createRouter, createWebHistory } from "vue-router";
import RepositoriesFork from "../components/RepositoriesFork.vue";
import RepositoriesList from "../components/RepositoriesList.vue";

const routes = [
  { path: "/forks/:id", component: RepositoriesFork },
  { path: "/", component: RepositoriesList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

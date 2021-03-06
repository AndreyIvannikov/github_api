import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/index";
import "normalize.css";
import "./main.scss";
createApp(App).use(router).use(store).mount("#app");

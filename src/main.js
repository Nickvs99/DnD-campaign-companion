import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/styles/_globals.scss";
import "@/styles/themes.scss";

import "./prototypeOverrides.js";

createApp(App).use(router).mount("#app");

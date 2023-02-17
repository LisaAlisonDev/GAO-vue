import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import ComputerBoxVue from "./components/ComputerBox.vue";

const app = createApp(App);

app.use(router);
app.component('ComputerBox', ComputerBoxVue); 


app.mount("#app");

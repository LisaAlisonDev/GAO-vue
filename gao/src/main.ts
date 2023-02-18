import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Vuetify
import 'vuetify/styles' 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "./assets/main.css";
import ComputerBox from "./components/ComputerBox.vue";
import AddComputer from "./components/AddComputer.vue";

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import EditComputer from "./components/EditComputer.vue";
import DeleteComputer from "./components/DeleteComputer.vue";

const app = createApp(App);
const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        }
      },
    components,
    directives,
  })
  

app.use(router);
app.component('ComputerBox', ComputerBox); 
app.component('AddComputer', AddComputer)
app.component('EditComputer', EditComputer)
app.component('DeleteComputer', DeleteComputer)

app.use(vuetify).mount("#app");

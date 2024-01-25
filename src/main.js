import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import VueGoogleMaps from "@fawmi/vue-google-maps";

// primevue
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";

//core
import "primevue/resources/primevue.min.css";

import PrimeVue from "primevue/config";

import ToastService from "primevue/toastservice";

import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

const vuetify = createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  components,
  directives,
});

import VueI18n from "vue-i18n";
import i18n from "./i18n";
// import bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
// import bootstrap vue
// import { BootstrapVue } from 'bootstrap-vue'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const options = {
  confirmButtonColor: "#41b882",
  cancelButtonColor: "#ff7674",
  timer: 2000,
};

// import fontawesome
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far, fab);
dom.watch();

// import axios
import axios from "axios";
axios.defaults.baseURL = "https://backend.maak-lancer.com/api/v1";
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.lang = localStorage.getItem("lang");

import GoogleMap from "vue-google-maps-ui";



// moment js
import moment from 'moment'

// Vue.prototype.moment = moment

createApp(App)
  .use(store)
  .use(vuetify)
  .use(PrimeVue)
  .use(moment)
  .use(GoogleMap)
  .use(ToastService)
  .use(VueTelInput)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBNLoYGrbnQI_GMqHt6m0PSN9yA7Zvq7gA",
      // language: 'de',
    },
  })
  .use(router)
  .use(VueI18n)
  .use(i18n)
  .use(VueSweetalert2, options)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");


<template>
  <v-app>
    <v-main>
      <pageHeader />

      <router-view />

      <pageFooter />
      <div class="all-notis"></div>
      <Toast />
    </v-main>
  </v-app>
</template>

<script>
import Toast from "primevue/toast";
// Initialize Firebase

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCFBA7suAAMG0vBIyes0KJme-6nXgIW5ds",
  authDomain: "minaset-maak.firebaseapp.com",
  projectId: "minaset-maak",
  storageBucket: "minaset-maak.appspot.com",
  messagingSenderId: "1034150776376",
  appId: "1:1034150776376:web:c9207a4e88b7a76aa8e0cd",
  measurementId: "G-H2L2ZHMD8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  let bigDiv = document.querySelector(".all-notis");
  let appendedNoti;
  if (payload.notification) {
    appendedNoti = `<div
          class="notification-box active mb-3 notification-box-spe" 
        >
          <router-link to="/notificationsView" class="flex-sm-gap-noti">
            <div class="noti-box-right"><i class="fa-solid fa-bell"></i></div>
            <p class="gray-col max-90 mb-0 clamp-main">
              ${payload.notification.body}              
            </p>
          </router-link>
          <div class="remove-noti red-col">
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>`;
  } else {
    appendedNoti = `<div
          class="notification-box active mb-3 notification-box-spe" 
        >
          <router-link to="/allchatsView" class="flex-sm-gap-noti">
            <div class="noti-box-right"><i class="fa-solid fa-bell"></i></div>
            <p class="gray-col max-90 mb-0 clamp-main">
              ارسل لك ${payload.data.sender_name} رسالة           
            </p>
          </router-link>
          <div class="remove-noti red-col">
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>`;
  }

  bigDiv.insertAdjacentHTML("beforeend", appendedNoti);
  let allRemoves = document.querySelectorAll(".remove-noti");

  // console.log(payload.notification.data);

  for (let i = 0; i < allRemoves.length; i++) {
    allRemoves[i].addEventListener("click", function () {
      this.closest(".notification-box").remove();
    });
  }
  setTimeout(function () {
    if (document.querySelector(".notification-box-spe")) {
      document.querySelector(".notification-box-spe").remove();
    }
  }, 4000);

  // ...
});
getToken(messaging, {
  PublicVapidKey:
    "AAAA8Mgwjjg:APA91bEkyd-9JfHg6y-r1wSbHuCaTGE72yALNqX8a-tp3KrErEOLjjL0dwlBHhEQHfpYN3N38dnaxT9ovkeSHJ9Wbu-oPES7SxSsEe0NKD2i5M6ox2tPXpYJJINWHHgl_ooElVG1brSM",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      console.log("current token is" + currentToken);
      localStorage.setItem("fcmtocken", currentToken);

      // ...
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

import "@/assets/css/style.css";
import "@/assets/css/style-ltr.scss";
import pageHeader from "@/components/pageHeader.vue";
import pageFooter from "@/components/pageFooter.vue";
export default {
  components: {
    pageHeader,
    pageFooter,
    Toast,
  },

  methods: {},
  mounted() {
    if (localStorage.getItem("locale") == "en") {
      document.querySelector("body").classList.add("ltr");
    } else {
      document.querySelector("body").classList.remove("ltr");
    }
    console.log(app);
  },
};
</script>
<style>
#app,
.p-component {
  font-family: "myfont", sans-serif !important;
}
a {
  text-decoration: none !important;
}
ul {
  margin-bottom: 0 !important;
}
</style>

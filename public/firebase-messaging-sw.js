// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCFBA7suAAMG0vBIyes0KJme-6nXgIW5ds",
  authDomain: "minaset-maak.firebaseapp.com",
  projectId: "minaset-maak",
  storageBucket: "minaset-maak.appspot.com",
  messagingSenderId: "1034150776376",
  appId: "1:1034150776376:web:c9207a4e88b7a76aa8e0cd",
  measurementId: "G-H2L2ZHMD8F",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.notification.title;

  const notificationOptions = {
    body: payload.notification.body,
    icon: "/Group 1 (1).png",
    vibrate: [400, 100, 400],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

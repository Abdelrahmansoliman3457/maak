import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object

// export const socket = io("https://maak-lancer.com:4738");
export const socket = io("https://maak-lancer.com:4738", {
  reconnection: true,
  reconnectionAttempts: 5, // Number of attempts
  reconnectionDelay: 1000, // Delay in milliseconds between attempts
  transports: ["websocket"]
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});

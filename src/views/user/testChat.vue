<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("shared.chats") }}</span>
      </div>
      <div class="row mb-5">
        <div class="col-lg-8">
          <div class="all-chat-cont">
            <div class="chat-head" v-if="!loadermember">
              <div class="info-flex">
                <img :src="visitorImg" class="user-chat-img" alt="" />
                <div class="default-m">
                  <div class="user-chat-name mt-2">
                    {{ visitorName }}
                  </div>
                </div>
              </div>
              <router-link
                :to="{
                  name: 'providerProfile',
                  params: { id: visitorid },
                }"
                class="link-best-de color-main"
                >{{ $t("shared.showprofile") }}</router-link
              >
            </div>
            <div class="chat-head" v-else>
              <div class="flex-sm-gap">
                <Skeleton
                  width="4rem"
                  shape="circle"
                  class="no-shrink"
                  height="4rem"
                ></Skeleton>
                <Skeleton
                  width="7rem"
                  class="no-shrink"
                  height="1rem"
                ></Skeleton>
              </div>
              <Skeleton width="8rem" class="no-shrink" height="1rem"></Skeleton>
            </div>
            <div class="chat-body" ref="chatBody">
              <!-- <div class="flex-date-top">
                <div class="line-chat"></div>
                <div class="day-message-sent font14 gray-col">اليوم</div>
                <div class="line-chat"></div>
              </div> -->
              <template v-if="!loader">
                <div
                  class="mt-3 mb-4"
                  v-for="message in messages"
                  :key="message"
                >
                  <div
                    class="flex-sm-gap-chat"
                    :class="{ reverse: !message.is_sender }"
                  >
                    <img :src="memberImg" class="sendresieve-img" alt="img" />
                    <div
                      v-if="message.type == 'text'"
                      class="senderMessage"
                      :class="{
                        senderMessage: message.is_sender,
                        recieverMessage: !message.is_sender,
                      }"
                    >
                      {{ message.body }}
                    </div>

                    <a
                      v-else-if="message.type == 'file'"
                      :href="message.body"
                      target="_blank"
                    >
                      <div class="file-preview">
                        <img :src="imgSPEPdf" alt="" />
                        <div class="font14 text-center">
                          {{ message.body.split(".")[2] }}
                        </div>
                      </div>
                    </a>

                    <div v-else-if="message.type == 'invoice'">
                      <div class="invoice-main">
                        <div class="invoice-top">
                          {{ $t("shared.invoiceTitle") }} 
                        </div>
                        <!-- {{ message.invoice.name }} -->
                        <div class="invoice-center">
                          <div class="flex-bet-main flex-invoice">
                            <div>{{ $t("shared.priceInvoice") }}</div>
                            <div>{{ message.invoice.price }} {{ $t("shared.reyal") }} </div>
                          </div>
                          <div class="flex-bet-main flex-invoice">
                            <div>{{ $t("shared.invoiceDur") }}</div>
                            <div>{{ message.invoice.duration }}</div>
                          </div>
                          <div class="flex-bet-main flex-invoice total">
                            <div>{{ $t("shared.invoiceAll") }}</div>
                            <div>{{ message.invoice.final_total }} {{ $t("shared.reyal") }}</div>
                          </div>
                        </div>
                        <div
                          v-if="user"
                          class="pay-invoice"
                          @click="getNegoId(message.invoice.negotaite_id)"
                          data-bs-target="#pay-main"
                          data-bs-toggle="modal"
                        >
                        {{ $t("shared.payNow") }}
                        </div>
                      </div>
                    </div>

                    <div v-else-if="message.type == 'image'">
                      <Image
                        :src="message.body"
                        class="img-chat-sm"
                        alt="Image"
                        preview
                      />
                    </div>
                    <div class="message-time">
                      {{ message.created_dt }}
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex-sm-gap mt-4">
                  <Skeleton
                    width="4rem"
                    shape="circle"
                    class="no-shrink"
                    height="4rem"
                  ></Skeleton>
                  <Skeleton
                    width="70%"
                    class="no-shrink"
                    height="7rem"
                  ></Skeleton>
                </div>
                <div class="flex-sm-gap-chat reverse mt-3">
                  <Skeleton
                    width="4rem"
                    shape="circle"
                    class="no-shrink"
                    height="4rem"
                  ></Skeleton>
                  <Skeleton
                    width="70%"
                    class="no-shrink"
                    height="7rem"
                  ></Skeleton>
                </div>
              </template>
            </div>
            <form action="" ref="sendform" @submit.prevent="sendMessage()">
              <div class="chat-foot">
                <div class="emoji-ico" v-click-outside="handleClickOutside">
                  <p @click="toggleEmoji" class="mb-0">&#128515;</p>
                  <EmojiPicker
                    v-if="showEmoji"
                    :native="true"
                    @select="onSelectEmoji"
                    theme="light"
                    :disable-sticky-group-names="true"
                    :hide-group-names="true"
                    :disable-skin-tones="true"
                  />
                </div>

                <label for="up-files" class="upload-any" v-if="showUpFile">
                  <font-awesome-icon :icon="['fas', 'camera']" />
                  <input
                    type="file"
                    accept="*"
                    hidden
                    id="up-files"
                    @change="uploadImage"
                    name="file"
                    ref="fileImgUp"
                  />
                </label>
                <textarea
                  type="text"
                  ref="fileupload"
                  @input="checkifEmpty"
                  rows="3"
                  v-model="messageText"
                  class="main-chat-input textareachat"
                  :placeholder="$t('shared.chatPlace')"
                  name="message"
                  :disabled="uploadedimg.length"
                ></textarea>
                <button
                  type="submit"
                  :disabled="!uploadedimg.length && !messageText.length"
                  class="main-chat-btn"
                >
                {{ $t("shared.send") }}
                </button>
              </div>
            </form>
          </div>
          <div class="img-file-preview" v-if="uploadedimg.length">
            <div class="abs-remove-preview" @click="removePreview">
              <i class="fa-solid fa-xmark"></i>
            </div>
            <img
              :src="uploadedimg"
              v-if="typeUploaded == 'image'"
              class="img-chat-sm"
              alt=""
            />
            <a
              v-else-if="typeUploaded == 'application'"
              :href="uploadedimg"
              target="_blank"
            >
              <div class="file-preview">
                <img :src="imgSPEPdf" alt="" />
                <div class="font14 text-center">
                  {{ uploadedName }}
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="all-rooms">
            <div class="rooms-head">
              <div class="mb-1">{{ $t("shared.messages") }}</div>
              <div class="font14 gray-col">
                {{ $t("shared.messagesInfo") }}
              </div>
            </div>
            <div class="rooms-body">
              <template v-if="!loader">
                <div
                  v-for="room in rooms"
                  :key="room"
                  class="room-main"
                  :class="{ active: room.id == this.$route.params.id }"
                  @click="joinRoom(room.id)"
                >
                  <div class="info-flex">
                    <img
                      :src="room.member.image"
                      class="sendresieve-img"
                      alt=""
                    />
                    <div class="default-m">
                      <div class="user-chat-name mb-1">
                        {{ room.member.name }}
                      </div>
                      <div class="user-status font14 gray-col">
                        {{ room.last_message_body }}
                      </div>
                    </div>
                  </div>
                  <div class="left-room no-shrink">
                    <!-- <div class="unread-num mb-1">2</div> -->
                    <!-- <div class="mb-2"></div> -->
                    <div class="time-last-message">
                      {{ room.last_message_created_dt }}
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="best-box">
                  <div class="flex-no-align">
                    <Skeleton
                      width="4rem"
                      shape="circle"
                      class="no-shrink"
                      height="4rem"
                    ></Skeleton>
                    <div class="left-best">
                      <div class="flex-bet-main mb-1">
                        <div class="right-sm-best">
                          <Skeleton width="8rem" height="1rem"></Skeleton>
                        </div>
                        <div class="right-sm-best d-block">
                          <Skeleton
                            width="2rem"
                            shape="circle"
                            class="mb-1"
                            height="2rem"
                          ></Skeleton>
                          <Skeleton width="4rem" height="1rem"></Skeleton>
                        </div>
                      </div>
                      <div class="flex-bet-main">
                        <div class="price-num gray-col">
                          <Skeleton width="8rem" height="1rem"></Skeleton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--pay choose modal-->
  <div
    class="modal fade"
    id="pay-main"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn success-cancel-pay"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-3 font-bold">{{ $t("shared.payword") }}</h5>
        <div class="gray-col mb-4 text-center font14">
          {{ $t("shared.choosePay") }}
        </div>
        <div class="flex-between-main mb-5">
          <div class="flex-filter-check check-rad">
            <input type="radio" name="paymain" id="online" />
            <label class="mb-0" for="online">{{ $t("shared.onlinePay") }}</label>
          </div>
          <div class="flex-filter-check check-rad">
            <input type="radio" name="paymain" id="wallet" />
            <label class="mb-0" for="wallet">{{ $t("shared.walletPay") }}</label>
          </div>
        </div>
        <button
          class="main-btn up full-wid mb-4"
          type="button"
          @click="payInvoice"
          :disabled="disabled"
        >
          <div v-if="!disabled">{{ $t("shared.send") }}</div>
          <div class="loading" role="status" v-if="disabled">
            {{ $t("footer.sending") }}
            <div class="spinner-small-white" v-if="disabled"></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import picker compopnent
import EmojiPicker from "vue3-emoji-picker";

// import css
import "vue3-emoji-picker/css";
import axios from "axios";
import Skeleton from "primevue/skeleton";
import moment from "moment";
import Image from "primevue/image";

// import io from 'socket.io';
// import { state } from "@/socket";
// import { socket } from "@/socket";
// import socket from "@/socket";
// import { io } from "socket.io-client";
import { socket } from "@/socket";
export default {
  data() {
    return {
      // visitor data
      visitorImg: "",
      visitorName: "",
      visitorid: null,
      loader: false,
      showEmoji: false,
      rooms: [],
      userImg: require("../../assets/imgs/user.jpg"),
      imgsender: require("../../assets/imgs/solia.jpg"),
      imgSPEPdf: require("../../assets/imgs/pdf.png"),
      messageText: "",
      messages: [],
      room: "",
      loadermember: true,
      user: false,
      provider: false,
      memberImg: "",
      uploadedimg: "",
      showUpFile: true,
      typeUploaded: "",
      uploadedName: "",
      disabled: false,
      negotaite_id: null,
      reciever_id: null,

      // socket: io(),
    };
  },
  components: { EmojiPicker, Skeleton, moment, Image },

  methods: {
    // api
    // payInvoice
    getNegoId(id) {
      this.negotaite_id = id;
    },
    async payInvoice() {
      this.disabled = true;
      const fd = new FormData();
      fd.append("negotiate_id", this.negotaite_id);
      fd.append("type", "wallet");
      await axios
        .post("/user/request-service/negotiates/pay", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".success-cancel-pay").click();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
            // this.$router.push("/");
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
      this.disabled = false;
    },
    async sendMessage() {
      const fd = new FormData(this.$refs.sendform);

      fd.append("room_id", this.$route.params.id);

      if (this.messageText.length > 0) {
        socket.emit("sendMessage", {
          is_sender: 1,
          sender_id: localStorage.getItem("userid"),
          sender_type: "User",
          receiver_type: `Provider`,
          sender_name: "solia",
          avater: this.imgsender,
          receiver_id: this.visitorid,
          room_id: this.$route.params.id,
          type: "text",
          body: this.messageText,
          created_dt: moment(new Date()).locale(localStorage.getItem('lang') || 'ar').fromNow(),
        });
        await axios
          .post(`/send-message`, fd, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.key == "success") {
              this.messages.push({
                id: 19,
                is_sender: 1,
                body: this.messageText,
                type: "text",
                duration: 0,
                name: "",
                created_dt: moment().locale(localStorage.getItem('lang') || 'ar').fromNow(),
              });
              this.messageText = "";
              this.$nextTick(() => {
                this.scrollToBottom();
              });
            } else {
              console.log("err");
            }
          });
      } else {
        await axios
          .post(`/upload-room-file/${this.$route.params.id}`, fd, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.key == "success") {
              if (this.typeUploaded == "image") {
                socket.emit("sendMessage", {
                  is_sender: 1,
                  sender_id: localStorage.getItem("userid"),
                  sender_type: "User",
                  receiver_type: `Provider`,
                  sender_name: "solia",
                  avater: this.imgsender,
                  receiver_id: this.visitorid,
                  room_id: this.$route.params.id,
                  type: "image",
                  body: this.uploadedimg,
                  created_dt: moment(new Date()).fromNow(),
                });
                this.messages.push({
                  id: 19,
                  is_sender: 1,
                  body: this.uploadedimg,
                  type: "image",
                  duration: 0,
                  name: "",
                  created_dt: moment(new Date()).fromNow(),
                });
              } else {
                socket.emit("sendMessage", {
                  is_sender: 1,
                  sender_id: localStorage.getItem("userid"),
                  sender_type: "User",
                  receiver_type: `Provider`,
                  sender_name: "solia",
                  avater: this.imgsender,
                  receiver_id: this.visitorid,
                  room_id: this.$route.params.id,
                  type: "file",
                  body: this.uploadedimg,
                  created_dt: moment(new Date()).fromNow(),
                });
                this.messages.push({
                  id: 19,
                  is_sender: 1,
                  body: this.uploadedimg,
                  type: "file",
                  duration: 0,
                  name: this.uploadedName,
                  created_dt: moment(new Date()).fromNow(),
                });
              }
              // console.log(this.messages);
              // this.messageText = "";
              this.$nextTick(() => {
                this.scrollToBottom();
              });
            } else {
              console.log("err");
            }
          });
      }
      this.showUpFile = true;
      this.uploadedimg = "";
      if (this.$refs.fileImgUp) {
        this.$refs.fileImgUp.value = "";
      }
    },
    // uploadImage
    uploadImage(e) {
      const file = e.target.files[0];
      if (e.target.files[0]) {
        this.uploadedimg = URL.createObjectURL(file);
        this.typeUploaded = file.type.split("/")[0];
        this.uploadedName = file.name;
      }
    },
    removePreview() {
      this.uploadedimg = "";
      if (this.$refs.fileImgUp) {
        this.$refs.fileImgUp.value = "";
      }
    },
    // get messages
    async getMessages(id) {
      this.loader = true;
      await axios
        .get(`/get-room-messages/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.messages = response.data.data.messages.data;
          this.memberImg = response.data.data.members[0].image;
        });
      this.loader = false;
    },
    // get rooms
    async getRooms() {
      this.loader = true;
      await axios
        .get("/get-rooms", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.rooms = response.data.data.rooms;
        });
      this.loader = false;
    },
    // join room
    async joinRoom(roomid) {
      socket.emit("enterChat", {
        user_id: 16,
        user_type: `User`,
        room_id: this.$route.params.id,
      });
      this.getMessages(roomid);
      this.loadermember = true;
      await axios
        .get(`/room-members/${roomid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          
          if (roomid) {
            this.$router.push(`/chatView/${roomid}`);
          }
          if (localStorage.getItem("visitor") == "provider") {
            this.visitorid = response.data.data[0].id;
            this.visitorName = response.data.data[0].user_name;
            this.visitorImg = response.data.data[0].image;
          } else if (localStorage.getItem("visitor") == "user") {
            this.visitorid = response.data.data[1].id;
            this.visitorName = response.data.data[1].name;
            this.visitorImg = response.data.data[1].image;
          }
        });
      this.loadermember = false;
    },
    handleClickOutside() {
      this.showEmoji = false;
    },
    toggleEmoji() {
      this.showEmoji = !this.showEmoji;
    },
    onSelectEmoji(emoji) {
      this.messageText += emoji.i;
    },
    scrollToBottom() {
      const chatBody = this.$refs.chatBody;
      chatBody.scrollTop = chatBody.scrollHeight;
    },
    // show and hide upload files
    checkifEmpty() {
      if (this.messageText.length > 0) {
        this.showUpFile = false;
      } else {
        this.showUpFile = true;
      }
    },
    // sendMessage() {
    //   if (this.messageText.length > 0) {
    //     // انا هنا ببعتله الاسم دا عشان يعمل LESTIN عليه
    //     socket.emit("newMessage", this.messageText, this.room);
    //     // هو هيستقبل الroom هناك
    //     console.log(socket);
    //     this.messages.push(this.messageText);
    //     // هنا ببوش اكتر من حاجة
    //     // this.messages.push([this.name , this.messageText]);
    //     this.messageText = "";
    //     this.$nextTick(() => {
    //       this.scrollToBottom();
    //     });
    //   }
    // },
    // joinRoom(roomName, roomid) {
    //   // هتتعدل
    //   // this.messages = [];
    //   if (this.room != "") {
    //     socket.emit("leaveRoom", this.room, roomid);
    //   }
    //   // انا هنا ببعتله الاسم دا عشان يعمل LESTIN عليه
    //   socket.emit("joinRoom", roomName, roomid);
    //   this.room = roomName;
    // },
  },
  created() {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("disconnect", () => {
      console.log("disconnected to server");
    });
    socket.on("connect_error", (error) => {
      console.error("Socket.io connection error:", error);
    });
  },
  mounted() {
    if (localStorage.getItem("visitor") == "user") {
      this.user = true;
      this.provider = false;
    } else if (localStorage.getItem("visitor") == "provider") {
      this.user = false;
      this.provider = true;
    }
    this.getRooms();
    this.joinRoom(this.$route.params.id);
    // this.getMessages(this.$route.params.id);
    // console.log(socket);
    // console.log(state.connected);

    // هو هنا هيبعتلي الاسم دا عشان اعمل LESTIN عليه
    // socket.on("sendMessageRes", function (data) {
    //   console.log(data);
    //   // ممكن الداتا دي تبقى array فناخد بالنا واحنا بنستدعيها فوق
    //   this.messages.push({
    //     created_dt: moment(new Date()).fromNow(),
    //     type: data.type,
    //     body: data.body,
    //   });
    // });

    socket.on("sendMessageRes", (data) => {
      console.log(data);
      console.log("new message");

      //var date = new Date(data.created_at);
      //date.toLocaleString("en-US", { timeZone: "Asia/Riyadh" });

      // this.messages.push({
      //     is_sender : 0,
      //     sent_by_me: false,
      //     type: data.type,
      //     body: data.body,
      //     // date: date.toDateString("en-US", { timeZone: "Asia/Riyadh" }),
      //     created_at: data.created_at,
      // });
      // this.getMessages(this.$route.params.id);
      // this.messages.push({
      //   created_dt: moment(new Date()).fromNow(),
      //   type: data.type,
      //   body: data.body,
      //   sent_by_me: false,
      //   is_sender: 0,
      // });
    });
  },
};
</script>

<style></style>

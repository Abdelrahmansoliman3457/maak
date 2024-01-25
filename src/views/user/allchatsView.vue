<template>
  <div class="noti-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("shared.chats") }}</span>
      </div>
      <template v-if="!loader">
        <div class="all-notifications col-md-9" v-if="chatRooms.length">
          <div v-for="room in chatRooms" :key="room.id">
            <router-link
              :to="{
                name: 'chatView',
                params: { id: room.id },
              }"
              class="notification-box mb-4 d-block"
            >
              <div class="flex-sm-gap-noti">
                <img
                  v-if="user"
                  :src="room.member.image"
                  class="img-noti"
                  alt="img"
                />
                <img
                  v-if="provider"
                  :src="defaultImg"
                  class="img-noti"
                  alt="img"
                />
                <div>
                  <div class="font-bold mb-2 black-col">
                    {{ room.member.name }}
                  </div>
                  <!-- {{ room.last_message_body.split('final_total').length > 1 }} -->
                  <p
                    class="gray-col max-90 mb-0 user-status min-wid-message"
                    v-if="
                      room.last_message_body.slice(-3) == 'png' ||
                      room.last_message_body.slice(-3) == 'jpg' ||
                      room.last_message_body.slice(-3) == 'jpeg'
                    "
                  >
                    قام بارسال صورة
                  </p>
                  <p
                    class="gray-col max-90 mb-0 user-status min-wid-message"
                    v-else-if="room.last_message_body.slice(-3) == 'pdf'"
                  >
                    قام بارسال ملف
                  </p>

                  <p
                    v-else-if="room.last_message_body.split('final_total').length > 1"
                    class="gray-col max-90 mb-0 user-status min-wid-message"
                  >
                    قام باصدار فاتورة
                  </p>

                  <p class="gray-col max-90 mb-0 user-status" v-else>
                    {{ room.last_message_body }}
                  </p>
                </div>
              </div>
              <div class="flex-end-main gray-col font14">
                <i class="fa-regular fa-clock"></i>
                {{ room.last_message_created_dt }}
              </div>
              <!-- <div class="unread-num mb-1 abs-top-left">2</div> -->
            </router-link>
          </div>
        </div>
        <div v-else class="nont-found-div">{{ $t("shared.noChats") }}</div>
      </template>
      <template v-else>
        <div class="row mb-5">
          <div class="col-md-9 mb-4">
            <div class="best-box">
              <div class="flex-no-align">
                <Skeleton
                  width="6rem"
                  shape="circle"
                  class="no-shrink"
                  height="6rem"
                ></Skeleton>
                <div class="left-best">
                  <div class="flex-bet-main mb-4">
                    <div class="right-sm-best">
                      <Skeleton width="8rem" height="1rem"></Skeleton>
                    </div>
                    <div class="right-sm-best">
                      <Skeleton
                        width="2rem"
                        shape="circle"
                        height="2rem"
                      ></Skeleton>
                    </div>
                  </div>
                  <div class="flex-bet-main">
                    <div class="price-num gray-col">
                      <Skeleton
                        width="12rem"
                        class="mb-1"
                        height="1rem"
                      ></Skeleton>
                      <Skeleton width="8rem" height="1rem"></Skeleton>
                    </div>
                    <Skeleton width="5rem" height="1rem"></Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Skeleton from "primevue/skeleton";

export default {
  data() {
    return {
      loginImg: require("../../assets/imgs/Group 101230.png"),
      defaultImg: require("../../assets/imgs/solia.jpg"),
      chatRooms: [],
      loader: false,
      provider: false,
      user: false,
    };
  },

  components: { Skeleton },
  methods: {
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
          if (response.data.data.rooms) {
            this.chatRooms = response.data.data.rooms;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.loader = false;
    },
  },
  mounted() {
    this.getRooms();

    if (localStorage.getItem("visitor") == "provider") {
      this.user = false;
      this.provider = true;
    } else {
      this.provider = false;
      this.user = true;
    }
  },
};
</script>

<style></style>

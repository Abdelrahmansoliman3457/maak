<template>
  <div v-if="!!rooms.length" class="row layout-shadow">
    <div class="col-md-4 p-2">
      <div class="rooms-cont">
        <div
          v-for="room in rooms"
          :key="room.id"
          @click="getRoom(room.id)"
          :class="{
            'px-2': true,
            room: true,
            'active-room': room.id == roomid,
          }"
        >
          <div class="px-3 mt-2 mb-2">
            <div class="row p-2 align-items-center">
              <div class="text-center">
                <img :src="room.members[0].image" class="room-image" alt="" />
              </div>
              <div class="col-md pt-2 pb-2">
                <h6 class="font-weight-bold font14">
                  {{ room.members[0].name }}
                </h6>
                <p
                  v-if="isValidHttpUrl(room.last_message_body)"
                  class="outer_room_message"
                >
                  attachment
                  <i class="fa fa-link mx-1"></i>
                </p>
                <p v-else class="outer_room_message">
                  {{ room.last_message_body.substring(0, 15) }}
                  {{ room.last_message_body.length > 15 ? " ... " : "" }}
                  <span style="color: #777">{{
                    room.last_message_created_dt
                  }}</span>
                </p>
                <h6 v-if="usertype == 'user'" class="text-center">
                  ( <i style="color: #eeee11" class="fa fa-star"></i>
                  {{ room.members[0].rate }} )
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md p-2">
      <loader v-if="loadingRoom" />
      <chat-component
        v-if="currentRoom"
        :usertype="usertype"
        :members="currentRoom.members"
        :messages="currentRoom.messages"
        :room="currentRoom.room"
        :type="type"
      />

      <div v-else-if="!currentRoom && !loadingRoom" class="w-100 text-center">
        <img
          draggable="false"
          class="w-75"
          style="opacity: 0.1"
          src="/site/img/chat_icon.png"
          alt=""
        />
      </div>
    </div>
  </div>

  <div v-else class="not-found-div">
    {{ notfound }}
  </div>
</template>

<script>
import Loader from "./Loader.vue";

export default {
  components: { Loader },
  props: {
    rooms: [],
    notfound: "",
    usertype: null,
    type: null,
    roomid: null,
  },
  data() {
    return {
      currentRoom: null,
      loadingRoom: false,
      imgSPE: "",
    };
  },
  mounted() {
    console.log(1111111, this.rooms);
    $(".room").on("click", function () {
      $(".room").removeClass("active-room");
      $(this).addClass("active-room");
    });
    if (this.roomid) {
      this.getRoom(this.roomid);
    }
  },
  methods: {
    isValidHttpUrl(string) {
      let url;
      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    },
    getRoom(roomId) {
      // console.log({roomId});
      this.imgSPE = window.imgSPE;
      console.log(this.imgSPE, window);
      this.currentRoom = null;
      this.loadingRoom = true;
      this.$http
        .get("/" + this.usertype + "/get-room/" + roomId)
        .then((response) => {
          console.log(response.body.data.messages);
          if (response.body.key == "success") {
            this.currentRoom = response.body.data;
            this.loadingRoom = false;
          }
        });
    },
  },
};
</script>

<style scoped>
.room-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.active-room {
  border: 2px solid rgb(213, 209, 209);
}
.txt {
  font-size: 14px !important;
}

.room {
  cursor: pointer;
  background: #eeeeee88;
  border-radius: 5px;
}

.rooms-cont {
  height: 500px;
  overflow-y: scroll;
}
</style>

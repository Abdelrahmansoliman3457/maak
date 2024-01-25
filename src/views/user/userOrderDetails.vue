<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} - {{ $t("nav.orders") }} -
        <span class="color-main">{{ $t("shared.orderDetails") }}</span>
      </div>
      <h5 class="mb-4 font-bold">{{ $t("shared.orderDetails") }}</h5>
      <template v-if="!loader">
        <div class="row mb-5">
          <div class="col-lg-7 col-12 mb-4">
            <div
              class="direct-accept"
              v-if="
                orderData.order_status == 2 &&
                orderData.type == 'direct' &&
                !orderData.is_negotiate
              "
            >
              <i class="fa-regular fa-clock"></i>
              <div>{{ $t("shared.acceptedDirect") }}</div>
            </div>
            <div
              class="direct-accept"
              v-if="orderData.order_status == 1 && orderData.type == 'direct'"
            >
              <i class="fa-regular fa-clock"></i>
              <div>{{ $t("shared.semiaccepted") }}</div>
            </div>
            <div class="or-det-flex mb-3">
              <div class="right-dt">
                {{ $t("shared.orderNum") }} :
                <span class="color-main">{{ orderData.number }}</span>
              </div>
              <div class="gray-col">
                {{ $t("shared.orderstate") }} :
                <span class="color-green" v-if="orderData.status">{{
                  orderData.status
                }}</span>
                <span class="color-main" v-else>
                  <span v-if="orderData.order_status == 3">{{
                    $t("shared.orderfinish")
                  }}</span>
                  <span
                    v-if="orderData.order_status == 2 && orderData.is_negotiate"
                    >{{ $t("shared.ordernego") }}</span
                  >
                  <span
                    class="color-green"
                    v-if="orderData.order_status == 4"
                    >{{ $t("shared.finishedall") }}</span
                  >
                </span>
              </div>
            </div>
            <div class="or-det-flex mb-3">
              <div class="right-dt">{{ $t("shared.orderDetails") }} :</div>
            </div>
            <div class="or-det-flex bg-def-or">
              <div class="right-dt">{{ $t("shared.orderType") }}</div>
              <div class="gray-col">{{ orderData.service }}</div>
            </div>
            <div class="or-det-flex">
              <div class="right-dt">{{ $t("shared.orderdate") }}</div>
              <div class="gray-col">{{ orderData.request_date }}</div>
            </div>
            <div class="or-det-flex bg-def-or">
              <div class="right-dt">{{ $t("shared.orderdur") }}</div>
              <div class="gray-col">
                {{ orderData.duration }} {{ $t("shared.day") }}
              </div>
            </div>
            <div class="or-det-flex">
              <div class="right-dt">{{ $t("shared.Pricework") }}</div>
              <div class="gray-col">
                {{ orderData.price }} {{ $t("shared.reyal") }}
              </div>
            </div>
            <div class="or-det-flex mb-3 font18 all-dt-orders">
              <div class="right-dt">{{ $t("shared.allplustax") }}</div>
              <div>{{ orderData.final_total }} {{ $t("shared.reyal") }}</div>
            </div>
            <div class="price-adds mt-4">
              <h6 class="mb-3 font-bold">{{ $t("shared.note") }} :</h6>
              <p class="main-p mb-0">
                {{ $t("shared.noteall") }}
              </p>
            </div>
            <div class="flex-group-me mt-5" v-if="orderData.order_status == 2">
              <button
                class="main-btn up xl"
                data-bs-target="#pay-main-cart"
                data-bs-toggle="modal"
              >
                {{ $t("shared.payminiword") }}
              </button>

              <button
                type="button"
                v-if="orderData.is_negotiate != 1"
                @click="negotiate"
                :disabled="disabledspe"
                class="main-btn2 up2 xl"
              >
                <div v-if="!disabledspe">{{ $t("shared.negWord") }}</div>
                <div class="loading" role="status" v-if="disabledspe">
                  <div class="spinner-small-white" v-if="disabledspe"></div>
                </div>
              </button>
            </div>
            <div class="flex-group-me mt-5" v-if="orderData.order_status == 3">
              <button
                type="button"
                @click="finishOrder"
                :disabled="disabledspe"
                class="main-btn up xl"
              >
                <div v-if="!disabledspe">{{ $t("shared.finishforce") }}</div>
                <div class="loading" role="status" v-if="disabledspe">
                  {{ $t("shared.finishing") }}
                  <div class="spinner-small-white" v-if="disabledspe"></div>
                </div>
              </button>
            </div>
            <div class="flex-group-me mt-5" v-if="orderData.order_status == 4">
              <button
                class="main-btn up xl"
                data-bs-target="#add-rate"
                data-bs-toggle="modal"
              >
                {{ $t("shared.addrate") }}
              </button>
            </div>
          </div>
          <div class="col-lg-5 col-12">
            <div class="or-det-flex mb-3">
              <div class="right-dt"> {{ $t("shared.orderDetails") }} :</div>
            </div>
            <div class="bg-reviews mb-3">
              <p class="main-p mb-3">
                {{ orderData.details }}
              </p>
              <div class="row">
                <div
                  class="col-lg-3 col-md-4 col-6 mb-3 or-det-img"
                  v-for="img in orderData.attachments"
                  :key="img"
                >
                  <Image
                    class="dt-img-order"
                    :src="img.link"
                    preview
                    alt="Image"
                  />
                </div>
              </div>
            </div>
            <div class="or-det-flex mb-3">
              <div class="right-dt">{{ $t("shared.prodata") }}</div>
            </div>
            <div class="bg-reviews">
              <div class="noti-sm-box">
                <div class="flex-sm-gap">
                  <img :src="provImg" class="user-m-img" alt="img" />
                  <div class="info-u-user">
                    <div class="mb-2">{{ provName }}</div>
                    <router-link
                      v-if="room_id != null"
                      :to="{
                        name: 'chatView',
                        params: { id: room_id },
                      }"
                      class="show-chats"
                    >
                      <font-awesome-icon
                        class="green-col"
                        :icon="['fas', 'comments']"
                      />
                      {{ $t("shared.showchat") }}
                    </router-link>
                  </div>
                </div>
                <!-- {{ provId }} -->
                <router-link
                  :to="{
                    name: 'providerProfile',
                    params: { id: provId },
                  }"
                  class="no-shrink font14 underline-link"
                >
                {{ $t("shared.showprofile") }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="small-loader mb-5" v-else>
        {{ $t("shared.loading") }}
        <div class="spinner-small-white red"></div>
      </div>
    </div>
  </div>

  <!--pay modal-->
  <div
    class="modal fade"
    id="pay-main-cart"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closePay"
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
            <input type="radio" disabled name="paymain" id="online" />
            <label class="mb-0" for="online">{{ $t("shared.onlinePay") }}</label>
          </div>
          <div class="flex-filter-check check-rad">
            <input type="radio" checked name="paymain" id="wallet" />
            <label class="mb-0" for="wallet">{{ $t("shared.walletPay") }}</label>
          </div>
        </div>
        <button
          type="button"
          @click="payNow"
          :disabled="disabled"
          class="main-btn up full-wid mb-4"
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

  <!--rate modal-->
  <div
    class="modal fade"
    id="add-rate"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closeRate"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-4 font-bold">{{ $t("shared.addratenew") }}</h5>
        <div class="gray-col mb-4 text-center">
          {{ $t("shared.addratephase") }}
        </div>
        <div class="big-rate mb-3">
          <star-rating
            :show-rating="false"
            :rtl="true"
            v-model:rating="valuemain"
            :star-size="40"
            :read-only="false"
            :rounded-corners="true"
            :increment="1"
            active-color="#548ede"
          ></star-rating>
        </div>
        <textarea name="" v-model="comment" rows="4" placeholder="اضف تعليق" class="main-textarea mt-3 mb-3"></textarea>
        <div class="flex-group-me mb-4 gap-sm yes-wrap">
          <button class="main-btn up" :disabled="disabledRate" @click="addRate">
            <div v-if="!disabledRate">{{ $t("shared.send") }}</div>
            <div class="loading" role="status" v-if="disabledRate">
              <div class="spinner-small-white" v-if="disabledRate"></div>
            </div>
          </button>
          <button class="main-btn up gray-bg" data-bs-dismiss="modal">
            {{ $t("shared.notnow") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import Image from "primevue/image";
import axios from "axios";
import i18n from "@/i18n";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/user.jpg"),
      successImg2: require("../../assets/imgs/succ.png"),
      loader: false,
      orderData: [],
      userData: [],
      disabled: false,
      provImg: "",
      provName: "",
      comment: "",
      provId: null,
      disabledspe: false,
      room_id: null,
      disabledRate: false,
      valuemain: null,
      offerId: null,
      is_direct: null,
      isNogisiate: false,
    };
  },
  components: { Image, StarRating },
  methods: {
    // rate user
    async addRate() {
      this.disabledRate = true;
      const fd = new FormData();
      fd.append("provider", this.provId);
      fd.append("value", this.valuemain);
      fd.append("comment", this.comment);
      await axios
        .post(`/rates/store`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key === "success") {
            document.querySelector(".closeRate").click();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 2000,
            });
            this.$router.push("/");
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 2000,
            });
          }
        });
      this.disabledRate = false;
    },
    // get order
    async getSingleOrder() {
      this.loader = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/user/request-service/show", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.orderData = response.data.data;
          if (response.data.data.provider.image != null) {
            this.provImg = response.data.data.provider.image;
          }
          this.provName = response.data.data.provider.name;
          this.provId = response.data.data.provider.id;
          this.room_id = response.data.data.room_id;
          this.isNogisiate = response.data.data.is_negotiate;
          this.offerId = response.data.data.offer_price_id;
          this.is_direct = response.data.data.is_direct;
        });
      this.loader = false;
    },
    // order negotiate
    async negotiate() {
      this.disabledspe = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      // fd.append("offer_price_id", this.$route.params.id);
      await axios
        .post("/user/request-service/negotiate", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.getSingleOrder();
            this.$toast.add({
              severity: "success",
              detail: i18n.global.t(`shared.cannego`),
              life: 3000,
            });
            this.$router.push(`/chatView/${response.data.data.room_id}`);
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
      this.disabledspe = false;
    },
    // order pay
    async payNow() {
      this.disabled = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      if (this.isNogisiate == 1) {
        fd.append("is_negotiate", 1);
      }
      if (this.offerId != null) {
        fd.append("offer_price_id", this.offerId);
      }
      fd.append("is_direct", this.is_direct);

      fd.append("type", "wallet");
      await axios
        .post("/user/request-service/pay", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            setTimeout(function () {
              document.querySelector(".closePay").click();
            }, 500);
            this.getSingleOrder();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
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
    // order finish
    async finishOrder() {
      this.disabled = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/user/request-service/finished", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.getSingleOrder();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
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
  },
  mounted() {
    this.getSingleOrder();
  },
};
</script>

<style></style>

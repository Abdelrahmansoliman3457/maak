<template>
  <div class="order-steps">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} - {{ $t("nav.orders") }} -
        <span class="color-main">{{ $t("shared.waitingorders") }}</span>
      </div>
      <div class="row justify-content-center mt-4 mb-5">
        <div class="col-lg-9 col-12">
          <div class="bg-steps">
            <div class="flex-all-new">
              <div class="circle-spe text-center main-cir">
                <div class="real-circle cir-active">
                  <!-- <i class="fa-solid fa-check"></i> -->
                </div>
                <div class="circle-text mt-2">
                  {{ $t("shared.waitingorders") }}
                </div>
              </div>
              <div class="circle-spe text-center">
                <div class="real-circle">
                  <!-- <i class="fa-solid fa-check"></i> -->
                </div>
                <div class="circle-text mt-2">
                  {{ $t("shared.waitingpay") }}
                </div>
              </div>
              <div class="circle-spe text-center">
                <div class="real-circle">
                  <!-- <i class="fa-solid fa-check"></i> -->
                </div>
                <div class="circle-text mt-2">
                  {{ $t("shared.currentorders") }}
                </div>
              </div>
              <div class="circle-spe text-center">
                <div class="real-circle">
                  <!-- <i class="fa-solid fa-check"></i> -->
                </div>
                <div class="circle-text mt-2">
                  {{ $t("shared.finishedorders") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-top-orders mb-4">
        <h5 class="font-bold">{{ $t("shared.offers") }} :</h5>
        <button
          class="main-btn up bg-red lg"
          data-bs-target="#refuse-order"
          data-bs-toggle="modal"
        >
          {{ $t("shared.cancelorder") }}
        </button>
      </div>

      <div class="row mb-5" v-if="offersArray.length > 0">
        <div
          class="col-lg-6 mb-4"
          v-for="offer in offers.offers"
          :key="offer.id"
        >
          <div class="best-box">
            <div class="flex-no-align yes-wrap-media">
              <img :src="offer.provider.image" class="best-img" alt="img" />
              <div class="left-best">
                <div class="flex-bet-main mb-3">
                  <div class="right-sm-best">
                    <div class="tlte-text">{{ offer.provider.name }}</div>
                  </div>
                  <router-link
                    :to="{
                      name: 'providerProfile',
                      params: { id: offer.provider.id },
                    }"
                    class="link-to"
                  >
                    {{ $t("shared.showprofile") }}
                  </router-link>
                </div>
                <div class="smgap-order mb-2">
                  <font-awesome-icon
                    class="icon-col"
                    :icon="['fas', 'hand-holding-dollar']"
                  />
                  <div class="peice-of-order gray-col font14">
                    {{ $t("shared.serviceprice") }} :
                    <span class="black-col"
                      >{{ offer.price }} {{ $t("shared.reyal") }}</span
                    >
                  </div>
                </div>
                <div class="smgap-order mb-3">
                  <font-awesome-icon
                    class="icon-col"
                    :icon="['fas', 'clock']"
                  />
                  <div class="peice-of-order gray-col font14">
                    {{ $t("shared.servicetime") }} :
                    <span class="black-col">{{ offer.duration }} يوم</span>
                  </div>
                </div>

                <div class="flex-bet-main yes-wrap mt-4">
                  <button
                    class="main-btn up order-now"
                    @click="showpay(offer.id)"
                    data-bs-target="#pay-modal"
                    data-bs-toggle="modal"
                  >
                    {{ $t("shared.accept") }}
                  </button>
                  <button
                    class="main-btn up order-now refuse"
                    @click="RejectRequest(offer.id)"
                  >
                    <div v-if="!disabled">{{ $t("shared.refusesevice") }}</div>
                    <div class="loading" role="status" v-if="disabled">
                      <div class="spinner-small-white" v-if="disabled"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-group-me mb-5" v-else>
        <img :src="loadImg" alt="loader" class="loader-img" />
      </div>
    </div>
  </div>

  <!--modals of this view-->
  <!--cancel modal-->
  <div
    class="modal fade"
    id="refuse-order"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-4 font-bold">
          {{ $t("shared.cancelorder") }}
        </h5>
        <div class="gray-col mb-4 text-center">
          {{ $t("shared.cancelsure") }}
        </div>
        <div class="flex-group-me mb-4">
          <img :src="imgFile" class="img-file" alt="image" />
        </div>
        <div class="flex-group-me mb-4 gap-sm yes-wrap">
          <button
            type="submit"
            @click="cancelRequest"
            :disabled="disabled"
            class="main-btn up"
          >
            <div v-if="!disabled">{{ $t("shared.cancelorder") }}</div>
            <div class="loading" role="status" v-if="disabled">
              <div class="spinner-small-white" v-if="disabled"></div>
            </div>
          </button>
          <button class="main-btn up bg-def" data-bs-dismiss="modal">
            {{ $t("shared.back") }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--success modal-->
  <div
    class="modal fade"
    id="success-order"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn success-cancel-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="successImg" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5">{{ $t("shared.canceldone") }}</div>
      </div>
    </div>
  </div>
  <input
    type="text"
    hidden
    class="success-cancel"
    data-bs-target="#success-order"
    data-bs-toggle="modal"
  />

  <!--pay modal-->
  <div
    class="modal fade"
    id="pay-modal"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content spe-pad">
        <button
          type="button"
          class="close-model-btn success-cancel-negotiate"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-3 font-bold">
          {{ $t("shared.ServiceRequest") }}
        </h5>
        <div class="gray-col mb-4 text-center font14">
          {{ $t("shared.chooseway") }}
        </div>
        <div class="flex-between-main mb-4">
          <div class="flex-filter-check check-rad">
            <input
              type="radio"
              checked
              value="pay"
              v-model="payNow"
              name="pay"
              id="payNow"
            />
            <label class="mb-0" for="payNow">{{ $t("shared.payword") }}</label>
          </div>
          <div class="flex-filter-check check-rad">
            <input
              type="radio"
              v-model="payNow"
              value="negotiate"
              name="pay"
              id="negotiate"
            />
            <label class="mb-0" for="negotiate">{{
              $t("shared.negWord")
            }}</label>
          </div>
        </div>
        <!--for pay-->
        <button
          class="main-btn up full-wid mb-4"
          type="button"
          data-bs-target="#pay-main"
          v-if="payNow == 'pay'"
          data-bs-toggle="modal"
        >
          {{ $t("shared.send") }}
        </button>
        <!--for negotiate-->
        <button
          class="main-btn up full-wid mb-4"
          v-if="payNow == 'negotiate'"
          @click="negotiateRequest"
          type="button"
        >
          {{ $t("shared.send") }}
        </button>
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
            <input type="radio" disabled name="paymain" id="online" />
            <label class="mb-0" for="online">{{ $t("shared.onlinePay") }}</label>
          </div>
          <div class="flex-filter-check check-rad">
            <input type="radio" checked name="paymain" id="wallet" />
            <label class="mb-0" for="wallet">{{ $t("shared.walletPay") }}</label>
          </div>
        </div>
        <button
          class="main-btn up full-wid mb-4"
          type="button"
          @click="payRequest"
          :disabled="disabledmain"
        >
          <div v-if="!disabledmain">{{ $t("shared.send") }}</div>
          <div class="loading" role="status" v-if="disabledmain">
            {{ $t("footer.sending") }}
            <div class="spinner-small-white" v-if="disabledmain"></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/user.jpg"),
      loadImg: require("../../assets/imgs/d07507a11c7c28e3b44624d3d2699cda.gif"),
      successImg: require("../../assets/imgs/succ.png"),
      imgFile: require("../../assets/imgs/file.png"),
      value: 4,
      productImagesReal: [],
      offers: [],
      offersArray: [],
      disabled: false,
      payNow: "pay",
      offerId: null,
      disabledmain: false,
    };
  },
  components: {},

  methods: {
    showpay(id) {
      this.offerId = id;
    },
    // get offers
    async GetOffers() {
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
          this.offers = response.data.data;
          if (response.data.data.offers) {
            this.offersArray = response.data.data.offers;
          }
        });
    },
    // cancel request
    async cancelRequest() {
      this.disabled = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/user/request-service/cancel", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".success-cancel").click();
            setTimeout(function () {
              document.querySelector(".success-cancel-close").click();
            }, 2000);
            this.$router.push("/");
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
    // pay request
    async payRequest() {
      this.disabledmain = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      fd.append("offer_price_id", this.offerId);
      fd.append("type", "wallet");
      await axios
        .post("/user/request-service/pay", fd, {
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
            this.$router.push("/");
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
      this.disabledmain = false;
    },
    // pay request
    async negotiateRequest() {
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      fd.append("offer_price_id", this.offerId);
      await axios
        .post("/user/request-service/negotiate", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            console.log(response.data);
            document.querySelector(".success-cancel-negotiate").click();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
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
    },
    // cancel request
    async RejectRequest(id) {
      console.log(id);
      this.disabled = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      fd.append("offer_price_id", id);
      await axios
        .post("/user/request-service/offers/reject", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
            this.GetOffers();
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
    this.GetOffers();

    console.log(this.payNow);
  },
};
</script>

<style></style>

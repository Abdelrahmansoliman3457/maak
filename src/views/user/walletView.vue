<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("nav.wallet") }}</span>
      </div>
      <h5 class="mb-4 font-bold">{{ $t("nav.wallet") }}</h5>
      <div class="col-md-10 margin-auto">
        <div class="row mb-4 align-items-center">
          <div class="col-md-6 col-12 mb-3">
            <div class="pad-main-pad">
              <div class="wallet-box">
                <div class="gray-col mb-3">{{ $t("shared.currentWallet") }}</div>
                <div class="wallet-price mb-3" v-if="!loading">
                  {{ balance }}
                </div>
                <div class="flex-group-me mb-3" v-else>
                  <Skeleton width="10rem" height="1rem"></Skeleton>
                </div>
                <div>{{ $t("shared.reyalsa") }}</div>
              </div>
            </div>
            <button type="button" class="main-btn up full-wid">
              {{ $t("shared.chargewallet") }}
            </button>
          </div>
          <div class="col-md-6 col-12 mb-3">
            <div class="img-wall">
              <img :src="bestImg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/wallet.png"),
      loading: false,
      balance: "0:00",
    };
  },
  components: { Skeleton },
  methods: {
    async getBalance() {
      this.loading = true;
      await axios
        .post(`/wallet/balance`, "", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.balance = response.data.data;
        });
      this.loading = false;
    },
  },
  mounted() {
    if(localStorage.getItem('token')){

      this.getBalance();
    }
  },
};
</script>

<style></style>

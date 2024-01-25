<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("nav.whous") }}</span>
      </div>
      <h5 class="mb-4 font-bold">{{ $t("nav.whous") }}</h5>
      <p class="main-p mb-5" v-if="!loader">
        {{ whous }}
      </p>
      <div v-else class="mb-5">
        <Skeleton width="50%" class="mb-2" height="10px"></Skeleton>
        <Skeleton width="20%" height="10px"></Skeleton>
      </div>
      <Toast />
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
      whous: "",
      loader: false,
    };
  },
  components: { Skeleton },
  methods: {
    async getWhous() {
      this.loader = true;
      await axios.get("/about").then((response) => {
        this.whous = response.data.data;
      });
      this.loader = false;
    },
  },
  mounted() {
    this.getWhous();
  },
};
</script>

<style></style>

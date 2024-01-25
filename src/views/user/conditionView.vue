<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("footer.terms") }}</span>
      </div>
      <h5 class="mb-4 font-bold">{{ $t("footer.terms") }}</h5>
      <p class="main-p mb-5" v-if="!loader">
        {{ conditions }}
      </p>
      <div v-else class="mb-5">
        <Skeleton width="50%" class="mb-2" height="10px"></Skeleton>
        <Skeleton width="20%" height="10px"></Skeleton>
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
      conditions: "",
      loader: false,
    };
  },
  components: { Skeleton },
  methods: {
    async getinfo() {
      this.loader = true;
      await axios
        .get("/settings")
        .then((response) => {
          console.log(response.data);
          if (localStorage.getItem("lang") == "en") {
            this.conditions = response.data.data.terms_en;
          } else {
            this.conditions = response.data.data.terms_ar;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.loader = false;
    },
  },
  mounted() {
    this.getinfo();
  },
};
</script>

<style></style>

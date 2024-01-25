<template>
  <div class="about-platform">
    <img :src="imgspe" class="plat-img" alt="img" />
    <div class="container">
      <div class="col-md-6 col-12">
        <div class="plat-note">
          <div class="left-square"></div>
          <div class="right-square"></div>
          <h4 class="font-bold mb-4">{{ $t("shared.platform") }}</h4>
          <p class="main-p clamp-main">
            {{ whous }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      platImg: require("../../assets/imgs/Rectangle 30471.png"),
      imgspe: "",
      whous: "",
    };
  },
  methods: {
    async getWhous() {
      await axios.get("/settings").then((response) => {
        console.log(response.data.data);
        if (localStorage.getItem("lang") == "en") {
          this.whous = response.data.data.about_content_en;
        } else {
          this.whous = response.data.data.about_content_ar;
        }
        this.imgspe = response.data.data.about_image;
      });
    },
  },
  components: {},
  mounted() {
    this.getWhous();
  },
};
</script>

<style></style>

<template>
  <div class="about-section section-pad">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-12">
          <div class="about-right">
            <h3 class="font-bold color-main mb-4">{{ $t("footer.about") }}</h3>
            <p class="main-p mb-4 clamp-main">
              {{ whous }}
            </p>
            <div class="row">
    
              <div class="col-md-6 col-12 mb-4">
                <div class="head-about-flex mb-4">
                  <img :src="aboutImgSmall2" alt="img" />
                  <h5 class="color-main2 font-bold">
                    {{ $t("nav.services") }}
                  </h5>
                </div>
                <p class="main-p">
                  {{ servicesText }}
                </p>
              </div>
              <div class="col-md-6 col-12 mb-4">
                <div class="head-about-flex mb-4">
                  <img :src="aboutImgSmall" alt="img" />
                  <h5 class="color-main2 font-bold">{{ $t("nav.stores") }}</h5>
                </div>
                <p class="main-p">
                  {{ storeText }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-12">
          <div class="about-left">
            <img :src="aboutImg" alt="about-img" />
          </div>
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
      aboutImg: require("../../assets/imgs/Group 80844.png"),
      aboutImgSmall: require("../../assets/imgs/Vectora.png"),
      aboutImgSmall2: require("../../assets/imgs/vectora2.png"),
      servicesText: "",
      storeText: "",
      whous: "",
    };
  },
  components: {},
  methods: {
    async getSections() {
      await axios
        .get("/app/sections")
        .then((response) => {
          this.storeText = response.data.data[1].description;
          this.servicesText = response.data.data[0].description;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getWhous() {
      await axios
        .get("/about")
        .then((response) => {
          this.whous = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getSections();
    this.getWhous();
  },
};
</script>

<style></style>

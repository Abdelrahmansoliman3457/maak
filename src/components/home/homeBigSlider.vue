<template>
  <div class="landing-main">
    <div class="slider-big" v-if="!loader">
      <swiper
        :pagination="pagination"
        :modules="modules"
        :navigation="false"
        :allowTouchMove="true"
        class="mySwiper"
        :autoplay="{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        :loop="true"
      >
        <swiper-slide
          class="home-item"
          v-for="slider in sliders"
          :key="slider.id"
        >
          <img class="home-img" :src="slider.image" alt="" />
        </swiper-slide>
      </swiper>
    </div>
    <template v-else>
      <div class="relative-parent">
        <Skeleton width="100%" height="540px"></Skeleton>
        <div class="abs-center">
          <div class="loading" role="status">
            <div class="spinner-small-white"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
// import "swiper/css";

import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";
import axios from "axios";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      sliders: [],
      loader: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    Skeleton,
  },
  setup() {
    return {
      pagination: {
        clickable: true,
      },

      modules: [Pagination, Autoplay],
    };
  },

  methods: {
    async gethomeSlider() {
      this.loader = true;
      await axios
        .get("/intor-sliders")
        .then((response) => {
          this.sliders = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loader = false;
    },
  },
  mounted() {
    this.gethomeSlider();
  },
};
</script>

<style></style>

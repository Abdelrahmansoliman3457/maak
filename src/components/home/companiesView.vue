<template>
  <div class="companies mt-4">
    <div class="companies-slider">
      <div class="container">
        <swiper
          :pagination="pagination"
          :modules="modules"
          :breakpoints="{
            '1024': {
              slidesPerView: 6,
              spaceBetween: 35,
            },
            '800': {
              slidesPerView: 3,
              spaceBetween: 35,
            },
            '500': {
              slidesPerView: 2,
              spaceBetween: 35,
            },
            '200': {
              slidesPerView: 2,
              spaceBetween: 35,
            },
          }"
          :slides-per-view="6"
          :space-between="10"
          :navigation="false"
          :freeMode="true"
          :parallax="true"
          class="mySwiper"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :loop="false"
        >
          <swiper-slide
            class="home-item"
            v-for="slider in sliders"
            :key="slider"
          >
            <div class="company-card">
              <div class="flex-group-me">
                <div class="circle-comp">
                  <img class="company-img" :src="slider.image" alt="" />
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import axios from "axios";

import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
export default {
  data() {
    return {
      sliders: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      pagination: {
        clickable: true,
      },

      modules: [Pagination, Autoplay, Navigation],
    };
  },
  methods: {
    async getPartners() {
      this.loader = true;
      await axios.get("/partners").then((response) => {

        this.sliders = response.data.data;
      });
      this.loader = false;
    },
  },
  mounted() {
    this.getPartners();
  },
};
</script>

<style>
.companies-slider .swiper-wrapper{
  justify-content: center;
}
</style>

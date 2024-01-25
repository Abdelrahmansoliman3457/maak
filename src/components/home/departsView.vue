<template>
  <div class="departs section-pad">
    <div class="container">
      <h5 class="font-bold mb-5">{{ $t("nav.elcservices") }}</h5>
      <div class="col-md-11 col-12 margin-auto">
        <div class="departs-slider">
          <swiper
            :pagination="pagination"
            :modules="modules"
            :breakpoints="{
              '1100': {
                slidesPerView: 6,
                spaceBetween: 35,
              },
              '767': {
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
            :navigation="true"
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
              <div class="departs-card">
                <div class="flex-group-me mb-4">
                  <div class="circle-departs">
                    <img class="depart-img" :src="slider.image" alt="" />
                  </div>
                </div>
                <div class="text-center font-bold">{{ slider.name }}</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";

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
  methods: {
    async getServices() {
      await axios.get("/user/categories/service").then((response) => {
      
        this.sliders = response.data.data;
      });
    },
  },
  setup() {
    return {
      pagination: {
        clickable: true,
      },

      modules: [Pagination, Autoplay, Navigation],
    };
  },

  mounted() {
    this.getServices();
  },
};
</script>

<style></style>

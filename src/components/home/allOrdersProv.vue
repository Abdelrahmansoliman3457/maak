<template>
  <div class="all-orders-prov mb-spe-provider">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-12 mb-3">
          <div class="centered-box">
            <img class="order-img-pro" :src="imgPro" alt="" />
            <div class="num-real-orders">
              <count-up :end-val="newOrders"></count-up>
            </div>
            <div class="text-orders">{{ $t("shared.neworder") }}</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-3">
          <div class="centered-box">
            <img class="order-img-pro" :src="imgPro2" alt="" />
            <div class="num-real-orders">
              <count-up :end-val="review"></count-up>
            </div>
            <div class="text-orders">طلبات قيد المراجعة</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-3">
          <div class="centered-box">
            <img class="order-img-pro" :src="imgPro" alt="" />
            <div class="num-real-orders">
              <count-up :end-val="current"></count-up>
            </div>
            <div class="text-orders">طلبات حالية</div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-3">
          <div class="centered-box">
            <img class="order-img-pro" :src="imgPro" alt="" />
            <div class="num-real-orders">
              <count-up :end-val="finished"></count-up>
            </div>
            <div class="text-orders">طلبات منتهية</div>
          </div>
        </div>
      </div>
    </div>
    <img :src="imgProgbg" class="full-bg" alt="" />
  </div>
</template>

<script>
import CountUp from "vue-countup-v3";
import axios from "axios";
export default {
  data() {
    return {
      layer: require("../../assets/imgs/Layer2spe.png"),
      imgPro: require("../../assets/imgs/loop.png"),
      imgPro2: require("../../assets/imgs/Groupff (2).png"),
      imgProgbg: require("../../assets/imgs/peter-gargiulo-cGNCepznaV8-unsplash.png"),
      newOrders: "",
      review: "",
      current: "",
      finished: "",
    };
  },
  components: { CountUp },
  methods: {
    async getCounters() {
      await axios
        .post(`/provider/request-services/counts`, "", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
   console.log(response.data);
          this.newOrders = response.data.data.new
          this.review = response.data.data.review
          this.current = response.data.data.current
          this.finished = response.data.data.finished
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCounters();
  },
};
</script>

<style></style>

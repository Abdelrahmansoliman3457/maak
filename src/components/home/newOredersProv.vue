<template>
  <div class="orders-new-section section-pad">
    <div class="container">
      <h5 class="font-bold mb-4">الطلبات الجديدة</h5>
      <template v-if="!loader">
        <div class="row" v-if="newOrders.length">
          <div
            v-for="order in newOrders"
            :key="order.id"
            class="col-lg-6 col-12 mb-3"
          >
            <div class="flex-wall-main">
              <div class="img-logo-wall">
                <img :src="layer" class="sm-order-n-im" alt="img" />
              </div>

              <div class="left-wall w-100">
                <div class="flex-bet-wal mb-2">
                  <div class="num-order-wall font20">
                    {{ $t("shared.orderNum") }} :
                    <span>{{ order.number }}</span>
                  </div>
                  <div class="gray-col font14">{{ order.request_date }}</div>
                </div>
                <div class="gray-col mb-3">
                  {{ $t("shared.clientName") }} :
                  <span class="black">{{ order.client_name }}</span>
                </div>
                <div class="flex-bet-btm">
                  <div class="flex-sm-gap">
                    <i class="fa-regular fa-file gray-col"></i>
                    <div class="num-order-wall">
                      {{ $t("shared.status") }} :
                      <span class="color-main">{{ order.status }}</span>
                    </div>
                  </div>
                  <router-link
                    :to="{
                      name: 'providerOrderDetails',
                      params: { id: order.id },
                    }"
                    class="color-main2 font14 link-more"
                    >عرض التفاصيل <i class="fa-solid fa-chevron-left"></i
                  ></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="nont-found-div">لا يوجد طلبات جديدة حتى الان</div>
      </template>
      <template v-else>
        <div class="row">
          <div class="col-lg-6 col-md-6 mb-4">
            <div class="best-box">
              <div class="flex-no-align">
                <Skeleton width="10rem" height="7rem"></Skeleton>
                <div class="left-best">
                  <div class="flex-bet-main mb-4">
                    <div class="right-sm-best">
                      <Skeleton width="8rem" height="1rem"></Skeleton>
                    </div>
                  </div>
                  <div class="right-sm-best mb-5">
                    <Skeleton width="8rem" height="2rem"></Skeleton>
                  </div>
                  <div class="flex-bet-main">
                    <div class="price-num gray-col">
                      <Skeleton width="8rem" height="1rem"></Skeleton>
                    </div>
                    <Skeleton width="6rem" height="1rem"></Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      layer: require("../../assets/imgs/Layer2spe.png"),
      newOrders: [],
      loader: false,
    };
  },
  methods: {
    async getNewOrders() {
      this.loader = true;
      const fd = new FormData();
      fd.append("status", 1);
      await axios
        .post("/provider/request-services", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {

          this.newOrders = response.data.data;
        });
      this.loader = false;
    },
  },
  components: {Skeleton},
  mounted() {
    this.getNewOrders();
  },
};
</script>

<style></style>

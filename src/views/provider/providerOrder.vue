<template>
  <div class="orders-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        الصفحة الرئيسية -
        <span class="color-main">الطلبات</span>
      </div>
      <div class="step-order-cont mb-4 col-md-10 margin-auto">
        <ul class="nav nav-pills row" id="pills-tab" role="tablist">
          <div class="col-lg-4 col-md-6 col-12 mb-3-mob">
            <li class="nav-item" role="presentation" @click="getOrders(2)">
              <a
                class="nav-link active"
                id="pills-wait-tab"
                data-bs-toggle="pill"
                href="#pills-wait"
                role="tab"
                aria-controls="pills-wait"
                aria-selected="true"
              >
                قيد المراجعة
              </a>
            </li>
          </div>
          <div class="col-lg-4 col-md-6 col-12 mb-3-mob">
            <li class="nav-item" role="presentation" @click="getOrders(3)">
              <a
                class="nav-link"
                id="pills-current-tab"
                data-bs-toggle="pill"
                href="#pills-current"
                role="tab"
                aria-controls="pills-current"
                aria-selected="false"
              >
                الطلبات الحالية
              </a>
            </li>
          </div>
          <div class="col-lg-4 col-md-6 col-12 mb-3-mob">
            <li class="nav-item" role="presentation" @click="getOrders(4)">
              <a
                class="nav-link"
                id="pills-end-tab"
                data-bs-toggle="pill"
                href="#pills-end"
                role="tab"
                aria-controls="pills-end"
                aria-selected="false"
              >
                الطلبات المنتهية
              </a>
            </li>
          </div>
        </ul>
      </div>
      <div class="tab-content mb-4" id="pills-tabContent">
        <!-- wait  -->
        <div
          class="tab-pane fade show active"
          id="pills-wait"
          role="tabpanel"
          aria-labelledby="pills-wait-tab"
        >
          <template v-if="!loader">
            <div class="row" v-if="reviewing.length > 0">
              <div
                v-for="order in reviewing"
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
                      <div class="gray-col font14">
                        {{ order.request_date }}
                      </div>
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
            <div v-else class="nont-found-div">لا يوجد طلبات حتى الان</div>
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
                        <div class="right-sm-best">
                          <Skeleton width="4rem" height="1rem"></Skeleton>
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

        <!-- current -->
        <div
          class="tab-pane fade"
          id="pills-current"
          role="tabpanel"
          aria-labelledby="pills-current-tab"
        >
          <template v-if="!loader">
            <div class="row" v-if="currentOrders.length > 0">
              <div
                v-for="order in currentOrders"
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
                      <div class="gray-col font14">
                        {{ order.request_date }}
                      </div>
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
            <div v-else class="nont-found-div">لا يوجد طلبات حتى الان</div>
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
                        <div class="right-sm-best">
                          <Skeleton width="4rem" height="1rem"></Skeleton>
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

        <!-- finished -->
        <div
          class="tab-pane fade"
          id="pills-end"
          role="tabpanel"
          aria-labelledby="pills-end-tab"
        >
          <template v-if="!loader">
            <div class="row" v-if="finishedOrders.length > 0">
              <div
                v-for="order in finishedOrders"
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
                      <div class="gray-col font14">
                        {{ order.request_date }}
                      </div>
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
            <div v-else class="nont-found-div">لا يوجد طلبات حتى الان</div>
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
                        <div class="right-sm-best">
                          <Skeleton width="4rem" height="1rem"></Skeleton>
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
      reviewing: [],
      currentOrders: [],
      finishedOrders: [],
      loader: false,
    };
  },

  components: { Skeleton },
  methods: {
    async getOrders(statusNum) {
      this.loader = true;
      const fd = new FormData();
      fd.append("status", statusNum);
      await axios
        .post("/provider/request-services", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          if (statusNum == 2) {
            this.reviewing = response.data.data;
          } else if (statusNum == 3) {
            this.currentOrders = response.data.data;
          } else if (statusNum == 4) {
            this.finishedOrders = response.data.data;
          }
        });
      this.loader = false;
    },
  },
  mounted() {
    this.getOrders(2);
  },
};
</script>

<style></style>

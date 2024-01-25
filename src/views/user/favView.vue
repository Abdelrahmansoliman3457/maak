<template>
  <div class="providers-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("nav.stores") }}</span>
      </div>
      <div class="providers-filter mb-5">
        <div class="container-default">
          <h5 class="mb-2">{{ $t("footer.fav") }}</h5>
        </div>
      </div>

      <template v-if="!loading">
        <div v-if="favs.length > 0" class="row">
          <div
            v-for="(fav, i) in favs"
            :key="fav.id"
            class="col-lg-6 col-md-6 mb-4"
          >
            <div class="best-box">
              <div class="flex-no-align">
                <img
                  :src="fav.preview_files_attachments[0].link"
                  class="best-img"
                  alt="img"
                />
                <div class="left-best">
                  <div class="flex-bet-main mb-3">
                    <div class="right-sm-best">
                      <div class="tlte-text">{{ fav.name }}</div>
                      <div class="right-sm-best">
                        <div class="rate-main-me">
                          <star-rating
                            :show-rating="false"
                            :rtl="true"
                            :rating="fav.rate"
                            :star-size="20"
                            :read-only="true"
                            :rounded-corners="true"
                            :increment="0.5"
                            active-color="#ffc107"
                          ></star-rating>
                        </div>
                      </div>
                    </div>
                    <div
                      class="favourite-main red"
                      @click="addToFav($event, i, fav.id)"
                    >
                      <div class="not-fav">
                        <i class="fa-regular fa-heart"></i>
                      </div>
                      <div class="show-fav">
                        <i class="fa-solid fa-heart"></i>
                      </div>
                    </div>
                  </div>
                  <div class="gray-col mb-4">
                    {{ fav.description }}
                  </div>
                  <div class="flex-bet-main">
                    <div class="price-num font19">
                      <span v-if="fav.price_after_discount">
                        {{ fav.price_after_discount }} ريال
                      </span>
                      <span
                        :class="{ mainsale: fav.price_after_discount }"
                        v-if="fav.has_discount"
                        class="gray-col left-de"
                        >{{ fav.price }} ريال</span
                      >
                    </div>
                    <router-link
                      :to="{
                        name: 'providerProductDetails',
                        params: { id: fav.id },
                      }"
                      class="link-best-de"
                      >{{ $t("shared.detailsshow") }}
                      <i class="fa-solid fa-chevron-left"></i
                    ></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="nont-found-div">{{ $t("shared.favEmpty") }}</div>
      </template>
      <template v-else>
        <div class="row main-site-loder">
          <div class="col-lg-6 col-md-6 mb-4">
            <div class="loader-card">
              <Skeleton class="no-shrink" size="6.7rem"></Skeleton>
              <div class="left-loader-card w-100">
                <div class="top-flex-loeder mb-3">
                  <Skeleton width="10rem" class="mb-2"></Skeleton>
                  <Skeleton shape="circle" size="2rem"></Skeleton>
                </div>
                <Skeleton width="70%" height="20px"></Skeleton>
                <div class="d-flex justify-content-between mt-3">
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                  <Skeleton width="6rem" height="1rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 mb-4">
            <div class="loader-card">
              <Skeleton class="no-shrink" size="6.7rem"></Skeleton>
              <div class="left-loader-card w-100">
                <div class="top-flex-loeder mb-3">
                  <Skeleton width="10rem" class="mb-2"></Skeleton>
                  <Skeleton shape="circle" size="2rem"></Skeleton>
                </div>
                <Skeleton width="70%" height="20px"></Skeleton>
                <div class="d-flex justify-content-between mt-3">
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                  <Skeleton width="6rem" height="1rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <!--modals of this view-->
</template>

<script>
import StarRating from "vue-star-rating";
import Skeleton from "primevue/skeleton";
import axios from "axios";
import i18n from "@/i18n";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/user.jpg"),
      successImg: require("../../assets/imgs/success.gif"),

      favs: [],
      loading: false,
    };
  },
  components: {
    StarRating,
    Skeleton,
  },
  methods: {
    async getFav() {
      this.loading = true;
      await axios
        .get(`/user/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.favs = response.data.data;
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },

    // add to fav , remove from fav
    async addToFav(e, i, product_id) {
      if (!e.currentTarget.classList.contains("red")) {
        console.log(e.currentTarget);
        e.currentTarget.classList.add("red");
        const fd = new FormData();
        fd.append("product_id", product_id);
        await axios
          .post(`/user/favorites/store`, fd, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.key === "success") {
              this.$toast.add({
                severity: "success",
                detail: i18n.global.t(`shared.addfav`),
                life: 2000,
              });
              console.log(i);
              console.log(product_id);
            } else {
              this.$toast.add({
                severity: "error",
                detail: `${response.data.msg}`,
                life: 2000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        e.currentTarget.classList.remove("red");

        const fd = new FormData();
        fd.append("product_id", product_id);
        await axios
          .post(`/user/favorites/delete`, fd, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.key === "success") {
              this.favs.splice(i, 1);
              this.$toast.add({
                severity: "success",
                detail: i18n.global.t(`shared.removeFav`),
                life: 2000,
              });
              console.log(i);
              console.log(product_id);
            } else {
              this.$toast.add({
                severity: "error",
                detail: `${response.data.msg}`,
                life: 2000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  mounted() {
    this.getFav();
  },
};
</script>

<style></style>

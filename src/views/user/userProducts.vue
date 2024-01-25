<template>
  <div class="providers-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main"> {{ $t("shared.productstext") }}</span>
      </div>
      <div class="providers-filter mb-5">
        <div class="container-default">
          <h5 class="mb-2">{{ $t("shared.productstext") }}</h5>
          <div class="filter-result gray-col">
            {{ $t("shared.searchValue") }} :
            <span>{{ products.length }} {{ $t("shared.providerword") }}</span>
          </div>
        </div>

        <div class="flex-filters">
          <div class="search-form">
            <input
              type="text"
              v-model="searchValue"
              @input="searchProducts"
              :placeholder="$t('shared.seachhere')"
              class="search-inp"
            />
            <button class="abs-search">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </button>
          </div>
          <button
            type="button"
            data-bs-target="#filterModal"
            data-bs-toggle="modal"
            class="filter-icon"
          >
            <font-awesome-icon :icon="['fas', 'filter']" />
          </button>
        </div>
      </div>
      <template v-if="!loading">
        <div class="row" v-if="products.length > 0">
          <div
            class="col-lg-6 col-md-6 mb-4"
            v-for="(product, i) in products"
            :key="product.id"
          >
            <div class="best-box">
              <div class="flex-no-align">
                <template v-if="product.preview_files_attachments != null">
                  <img
                    :src="product.preview_files_attachments[0].link"
                    class="best-img"
                    alt="img"
                  />
                </template>
                <template v-else>
                  <div class="img-logo-wall">{{ $t("shared.noImgs") }}</div>
                </template>
                <div class="left-best">
                  <div class="flex-bet-main mb-3">
                    <div class="right-sm-best">
                      <div class="tlte-text">{{ product.name }}</div>
                      <div class="right-sm-best">
                        <div class="rate-main-me">
                          <star-rating
                            :show-rating="false"
                            :rtl="true"
                            :rating="product.rate"
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
                      class="favourite-main"
                      :class="{ red: product.is_favorite }"
                      @click="addToFav($event, i, product.id)"
                    >
                      <div class="not-fav">
                        <i class="fa-regular fa-heart"></i>
                      </div>
                      <div class="show-fav">
                        <i class="fa-solid fa-heart"></i>
                      </div>
                    </div>
                  </div>
                  <div class="gray-col mb-4 clamp-me">
                    {{ product.description }}
                  </div>
                  <div class="flex-bet-main">
                    <div class="price-num font19">
                      <span v-if="product.price_after_discount">
                        {{ product.price_after_discount }}
                        {{ $t("shared.reyal") }}
                      </span>
                      <span
                        :class="{ mainsale: product.price_after_discount }"
                        v-if="product.has_discount"
                        class="gray-col left-de"
                        >{{ product.price }} {{ $t("shared.reyal") }}</span
                      >
                    </div>
                    <router-link
                      :to="{
                        name: 'providerProductDetails',
                        params: { id: product.id },
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
        <div v-else class="nont-found-div">{{ $t("shared.nostores") }}</div>
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
  <!--filter Modal-->
  <div
    class="modal fade"
    id="filterModal"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <form action="" ref="orderAdd">
          <h5 class="text-center mt-4 mb-4 font-bold">
            {{ $t("shared.filterword") }}
          </h5>
          <h6 class="mb-3">{{ $t("shared.priceWord") }}</h6>
          <div class="row mb-4">
            <div class="col-lg-4 col-md-6 mb-3">
              <div class="flex-filter-check">
                <input
                  type="radio"
                  v-model="priceVal"
                  value="1"
                  name="price"
                  id="checkid1"
                />
                <label class="mb-0" for="checkid1">{{
                  $t("shared.highPrice")
                }}</label>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 mb-3">
              <div class="flex-filter-check">
                <input
                  type="radio"
                  v-model="priceVal"
                  value="0"
                  name="price"
                  id="checkid2"
                />
                <label class="mb-0" for="checkid2">{{
                  $t("shared.lowPrice")
                }}</label>
              </div>
            </div>
          </div>
          <h6 class="mb-3">{{ $t("shared.Ratetext") }}</h6>
          <div class="row mb-4">
            <div class="col-lg-4 col-md-4 col-6 mb-3">
              <div class="flex-filter-check">
                <input
                  type="radio"
                  v-model="rateVal"
                  value="1"
                  name="rate"
                  id="rate1"
                />
                <label class="mb-0" for="rate1">{{
                  $t("shared.Highrate")
                }}</label>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-6 mb-3">
              <div class="flex-filter-check">
                <input
                  type="radio"
                  v-model="rateVal"
                  value="0"
                  name="rate"
                  id="rate2"
                />
                <label class="mb-0" for="rate2">{{
                  $t("shared.lowrate")
                }}</label>
              </div>
            </div>
          </div>
          <h6 class="mb-3">{{ $t("shared.attr") }}</h6>
          <div class="row mb-4">
            <div
              class="col-lg-4 col-md-4 col-6 mb-3"
              v-for="feature in features"
              :key="feature.id"
            >
              <div class="flex-filter-check">
                <input
                  type="checkbox"
                  v-model="featureVal"
                  :value="feature.id"
                  :id="'feature' + feature.id"
                />
                <label class="mb-0" :for="'feature' + feature.id">{{
                  feature.name
                }}</label>
              </div>
            </div>
          </div>
          <div class="flex-group-me mb-4">
            <button
              type="button"
              @click="filterProducts"
              class="btn-login up"
              data-bs-dismiss="modal"
            >
              {{ $t("shared.search") }}
            </button>
            <button
              type="button"
              @click="resetForm"
              class="main-btn lg up bg-gray"
            >
              {{ $t("shared.reset") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";
import axios from "axios";
import StarRating from "vue-star-rating";
import i18n from "@/i18n";

export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/user.jpg"),
      successImg: require("../../assets/imgs/success.gif"),
      value: 4,
      productImagesReal: [],
      products: [],
      loading: false,
      searchValue: "",
      priceVal: null,
      rateVal: null,
      featureVal: [],
      features: [],
      unApprovedNum: 0,
      approvedNum: 0,
    };
  },
  components: {
    Skeleton,
    StarRating,
  },

  methods: {
    resetForm() {
      this.priceVal = null;
      this.rateVal = null;
      this.featureVal = [];
      this.getUserProducts();
    },
    async getUserProducts() {
      this.loading = true;
      await axios
        .get(`/user/category/${this.$route.params.id}/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data)
          this.products = response.data.data;
          let unApprovedNum = [];
          let ApprovedNum = [];
          for (let i = 0; i < this.products.length; i++) {
            if (!this.products[i].is_approved) {
              unApprovedNum.push(this.products[i]);
            }
            if (this.products[i].is_approved) {
              ApprovedNum.push(this.products[i]);
            }
          }
          this.unApprovedNum = unApprovedNum.length;
          this.approvedNum = ApprovedNum.length;
          // alert(ApprovedNum.length)
          console.log(response.data);
        });
      this.loading = false;
    },
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
          });
      }
    },
    async searchProducts() {
      this.loading = true;
      const fd = new FormData();
      fd.append("name", this.searchValue);
      await axios
        .post(`/user/products/search`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (this.searchValue.trim().length > 0) {
            this.products = response.data.data;
          } else {
            this.getUserProducts();
          }
        });
      this.loading = false;
    },
    async getfeatures() {
      await axios.get("/features").then((response) => {
        this.features = response.data.data;
      });
    },
    async filterProducts() {
      this.loading = true;
      const fd = new FormData();
      fd.append("category_id", this.$route.params.id);
      if (this.rateVal) {
        fd.append("rate", this.rateVal);
      }
      if (this.priceVal) {
        fd.append("price", this.priceVal);
      }
      if (this.featureVal.length) {
        for (let i = 0; i < this.featureVal.length; i++) {
          fd.append(`features[]`, this.featureVal[i]);
        }
      }

      // fd.append("features[]", this.featureVal);
      await axios
        .post(`/user/products/fillter`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            if (
              Number(this.rateVal) ||
              Number(this.priceVal) ||
              this.featureVal.length
            ) {
              this.products = response.data.data;
            } else {
              this.getUserProducts();
            }
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
      this.loading = false;
    },
  },
  watch: {
    $route(to, from) {
      if (to.name == "userProducts" && from.name == "userProducts") {
        this.getUserProducts();
      }
    },
  },
  mounted() {
    this.getUserProducts();
    this.getfeatures();
  },
};
</script>

<style></style>

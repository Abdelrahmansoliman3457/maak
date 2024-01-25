<template>
  <div class="providers-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("shared.productstext") }}</span>
      </div>
      <h5 class="font-bold mb-4">{{ $t("shared.productstext") }}</h5>
      <template v-if="!loading">
        <div class="row mb-5" v-if="products.length > 0">
          <div
            class="col-lg-6 col-md-12 mb-4"
            v-for="product in products"
            :key="product"
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
                    <div class="waiting-accept-pro color-main" v-if="!product.is_approved">{{ $t("shared.waitapprove") }}</div>
                  </div>
                  <div class="gray-col mb-3 clamp-me">
                    {{ product.description }}
                  </div>
                  <div class="flex-bet-main">
                    <div class="price-num font19">
                      <span v-if="product.price_after_discount"> {{ product.price_after_discount }} {{ $t("shared.reyal") }} </span>
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
                      >{{ $t("shared.detailsshow") }} <i class="fa-solid fa-chevron-left"></i
                    ></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="nont-found-div">{{ $t("shared.noproducts") }}</div>
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
      <div class="flex-group-me mt-4 mb-5">
        <router-link to="/addnewProduct" class="main-btn up xl"
          >{{ $t("shared.addNewPro") }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/user.jpg"),
      successImg: require("../../assets/imgs/success.gif"),
      products: [],
      loading: false,
    };
  },
  components: {
    StarRating,
    Skeleton,
  },
  methods: {
    async getProducts() {
      this.loading = true;
      await axios
        .get("/provider/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.products = response.data.data;
          console.log(response.data.data);
        });
      this.loading = false;
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style></style>

<template>
  <div class="about-section section-pad">
    <div class="container">
      <h5 class="font-bold mb-5">{{ $t("shared.best") }}</h5>
      <div v-if="items.length > 0" class="row">
        <div
          v-for="item in items"
          :key="item.id"
          class="col-lg-4 col-md-6 mb-4"
        >
          <div class="best-box h-100">
            <div class="flex-no-align">
              <template v-if="item.preview_files_attachments != null">
                <img
                  :src="item.preview_files_attachments[0].link"
                  class="best-img"
                  alt="img"
                />
              </template>
              <template v-else>
                <div class="img-logo-wall">لا تتوفر صور</div>
              </template>
              <div class="left-best">
                <div class="flex-bet-main mb-3">
                  <div class="right-sm-best">
                    <div class="tlte-text">{{ item.name }}</div>
                    <div class="right-sm-best">
                      <div class="star-icon color-orange-main">
                        <font-awesome-icon :icon="['fas', 'star']" />
                      </div>
                      <div class="rate-num color-orange-main">
                        {{ item.rate }}.0
                      </div>
                    </div>
                  </div>
                  <div
                    class="favourite-main"
                    :class="{ red: item.is_favorite }"
                    @click="addToFav($event, i, item.id)"
                  >
                    <div class="not-fav">
                      <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="show-fav">
                      <i class="fa-solid fa-heart"></i>
                    </div>
                  </div>
                </div>
                <div class="gray-col mb-5 clamp-me">{{ item.description }}</div>
                <div class="flex-bet-main">
                  <div class="price-num font19">
                    <span v-if="item.price_after_discount">
                      {{ item.price_after_discount }} ريال
                    </span>
                    <span
                      :class="{ mainsale: item.price_after_discount }"
                      v-if="item.has_discount"
                      class="gray-col left-de"
                      >{{ item.price }} ريال</span
                    >
                  </div>
                  <router-link
                    :to="{
                      name: 'providerProductDetails',
                      params: { id: item.id },
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/ads5.webp"),
      items: [],
    };
  },
  components: {},
  methods: {
    async getUserProducts() {
      this.loading = true;
      await axios.get(`/user/products/best-seller`).then((response) => {
        this.items = response.data.data
        console.log(response.data.data);
      });
      this.loading = false;
    },
    async addToFav(e, i, product_id) {
      if (!e.currentTarget.classList.contains("red")) {
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
                detail: `تم الاضافة للمفضلة بنجاح`,
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
                detail: `تم الازالة من المفضلة بنجاح`,
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
  },
  mounted() {
    this.getUserProducts();
  },
};
</script>

<style></style>

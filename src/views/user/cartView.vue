<template>
  <div class="cart-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("shared.cart") }}</span>
      </div>
      <h5 class="mb-3 font-bold">{{ $t("shared.cart") }}</h5>
      <template v-if="!loader">
        <div class="row mb-4" v-if="cartItems.length">
          <div class="col-lg-8 mb-3">
            <div
              class="loop-card-gray mb-4"
              v-for="cartitem in cartItems"
              :key="cartitem"
            >
              <div class="flex-bet-main align-items-center mb-4">
                <div class="flex-sm-gap no-align">
                  <img :src="cartitem.provider.image" class="miniuser" alt="" />
                  <div>
                    <div class="font-bold mb-1">
                      {{ cartitem.provider.name }}
                    </div>
                    <p class="main-p mb-0 font14">
                      {{ cartitem.provider.description }}
                    </p>
                  </div>
                </div>
                <div class="price-num no-shrink">
                  {{ $t("shared.price") }} :
                  <span class="color-main"
                    >{{ cartitem.provider_total_price }}
                    {{ $t("shared.reyal") }}</span
                  >
                </div>
              </div>
              <h6 class="mb-3 font-bold">{{ $t("shared.cartdetails") }}</h6>
              <div
                class="best-box def-cart-bg mb-3"
                v-for="item in cartitem.items"
                :key="item.id"
              >
                <div class="flex-no-align">
                  <img
                    :src="item.preview_files_attachments[0].link"
                    class="best-img"
                    alt="img"
                  />
                  <div class="left-best">
                    <div class="flex-bet-main mb-2">
                      <div class="right-sm-best">
                        <div class="tlte-text">{{ item.variant_name }}</div>
                      </div>
                      <button class="remove-cart" @click="removeItem(item.id)">
                        <font-awesome-icon :icon="['fas', 'trash-can']" />
                      </button>
                    </div>
                    <p class="main-p font15">
                      {{ item.product_description }}
                    </p>
                    <div class="flex-bet-main">
                      <div class="price-num">
                        {{ $t("shared.price") }} :
                        <span class="price-num font19">
        
                          <span v-if="item.discount_price">
                            {{ item.discount_price }}
                            {{ item.currency }}
                          </span>

                          <span
                            :class="{ mainsale: item.discount_price }"
                            class="gray-col left-de"
                            >{{ item.variant_price }} {{ $t("shared.reyal") }}</span
                          >
                        </span>
                      </div>


                      <!-- <div class="counter-main">
                        <div
                          class="qty counter-div justify-content-center counter-div-cart"
                        >
                          <button
                            type="button"
                            class="plus counter-btn unselectable"
                          >
                            +
                          </button>
                          <input
                            type="text"
                            value="1"
                            class="count output"
                            disabled=""
                          />
                          <button
                            type="button"
                            class="minus counter-btn unselectable"
                          >
                            -
                          </button>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-group-me mt-4">
              <button
                type="button"
                data-bs-target="#pay-main-cart"
                data-bs-toggle="modal"
                class="main-btn up xl"
              >
                {{ $t("shared.payNow") }}
              </button>
            </div>
          </div>
          <div class="col-lg-4 mb-3">
            <div class="sale-coupon mb-4">
              <div class="flex-sale-div relative-parent">
                <input
                  type="text"
                  class="sale-inp"
                  :placeholder="$t('shared.cartPlace')"
                  v-model="copounvalue"
                />
                <button @click="getCopoun" class="sale-btn up">
                  {{ $t("shared.activate") }}
                </button>
                <img :src="percent" class="img-sale" alt="" />
              </div>
            </div>
            <template v-if="cartItems.length">
              <div class="flex-bet-cart-m mb-4">
                <div>{{ $t("shared.productsPrice") }}</div>
                <div>
                  {{ cart_finance.total_products_amount }}
                  {{ cart_finance.currency }}
                </div>
              </div>
              <div class="flex-bet-cart-m mb-4">
                <div>{{ $t("shared.addedPrice") }}</div>
                <div>
                  {{ cart_finance.vat_amount }} {{ cart_finance.currency }}
                </div>
              </div>
              <div class="flex-bet-cart-m total font19">
                <div>{{ $t("shared.allPrice") }}</div>
                <div>
                  {{ cart_finance.final_total }} {{ cart_finance.currency }}
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-else class="nont-found-div">{{ $t("shared.noCart") }}</div>
      </template>
      <template v-else>
        <div class="small-loader mb-5">
          {{ $t("shared.loading") }}
          <div class="spinner-small-white red"></div>
        </div>
      </template>
    </div>
  </div>

  <!--pay modal-->
  <div
    class="modal fade"
    id="pay-main-cart"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closeCartModal"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-3 font-bold">
          {{ $t("shared.payword") }}
        </h5>
        <div class="gray-col mb-4 text-center font14">
          {{ $t("shared.choosePay") }}
        </div>
        <div class="flex-between-main mb-5">
          <div class="flex-filter-check check-rad">
            <input type="radio" disabled name="paymain" id="online" />
            <label class="mb-0" for="online">{{
              $t("shared.onlinePay")
            }}</label>
          </div>
          <div class="flex-filter-check check-rad">
            <input type="radio" checked name="paymain" id="wallet" />
            <label class="mb-0" for="wallet">{{
              $t("shared.walletPay")
            }}</label>
          </div>
        </div>
        <button
          class="main-btn up full-wid mb-4"
          type="button"
          @click="payCart"
        >
          {{ $t("shared.send") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import i18n from "@/i18n";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/wallet.png"),
      usermini: require("../../assets/imgs/user.jpg"),
      percent: require("../../assets/imgs/Group 96651.png"),
      // api
      loader: false,
      cartItems: [],
      cart_finance: {},
      copounvalue: "",
    };
  },
  components: {},
  methods: {
    async getCopoun() {
      await axios
        .get(`/user/cart/inquiry-coupon?coupon=${this.copounvalue}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          if (response.data.key == "success") {
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
            this.cart_finance.final_total = response.data.data.cart_finance.final_total
            this.cart_finance.total_products_amount = response.data.data.cart_finance.total_products_amount
            this.cart_finance.vat_amount = response.data.data.cart_finance.vat_amount
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCartItems() {
      this.loader = true;
      await axios
        .get(`/user/cart/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.cartItems = response.data.data.cart_items;
          this.cart_finance = response.data.data.cart_finance;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loader = false;
    },
    async removeItem(item_id) {
      const fd = new FormData();
      fd.append("cart_id", item_id);
      await axios
        .post(`/user/cart/remove-item`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key === "success") {
            // this.cartItems[cartindex].items.splice(itemindex, 1);
            this.getCartItems();
            this.$toast.add({
              severity: "success",
              detail: i18n.global.t(`shared.doneRemove`),
              life: 2000,
            });
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
    },
    async payCart() {
      const fd = new FormData();
      fd.append("pay_type", 1);
      fd.append("coupon", this.copounvalue);
      await axios
        .post(`/user/create-order`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key === "success") {
            document.querySelector(".closeCartModal").click();
            this.$toast.add({
              severity: "success",
              detail: i18n.global.t(`shared.donePay`),
              life: 2000,
            });
            this.getCartItems();
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
    },
  },
  mounted() {
    this.getCartItems();
  },
};
</script>

<style></style>

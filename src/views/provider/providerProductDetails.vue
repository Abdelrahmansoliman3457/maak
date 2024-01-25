<template>
  <div class="all-product-d">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        الصفحة الرئيسية - المتاجر الرقمية - {{ categoryTop }} -
        <span class="color-main">تفاصيل المنتج</span>
      </div>
      <h5 class="font-bold mb-4">تفاصيل المنتج</h5>
      <div class="row mb-4" v-if="!loader">
        <div class="col-lg-6 mb-4">
          <template v-if="images != null">
            <div
              class="slider-details"
              :class="{
                noarrows: images.length < 2,
                noarrowshide: images.length < 5,
              }"
            >
              <Galleria
                :value="images"
                :autoPlay="true"
                :circular="true"
                :responsiveOptions="responsiveOptions"
                :numVisible="images.length < 4 ? images.length : 4"
                containerStyle="max-width: 640px"
              >
                <template #item="slotProps">
                  <img
                    :src="slotProps.item.link"
                    :alt="slotProps.item.alt"
                    style="width: 100%"
                    class="height-slider"
                  />
                  <div class="abs-sm-img">
                    <Image
                      class="sm-img"
                      :src="slotProps.item.link"
                      preview
                      alt="Image"
                    />
                  </div>
                  <div class="abd-readonly">
                    <i class="fa-regular fa-eye"></i>
                  </div>
                </template>
                <template #thumbnail="slotProps">
                  <img
                    :src="slotProps.item.link"
                    :alt="slotProps.item.alt"
                    class="small-img-d"
                  />
                </template>
              </Galleria>
            </div>
          </template>
          <template v-else>
            <div class="img-logo-wall detailforproduct">
              يتم هنا عرض صور المنتج ان وجدت
            </div>
          </template>
        </div>
        <div class="col-lg-6 mb-4">
          <div class="flex-bet-main mb-3">
            <h5 class="font-bold mb-3">{{ title }}</h5>
            <div
              class="fav-defi favourite-main"
              :class="{ red: is_favorite }"
              @click="addToFav($event, i, product_id)"
              v-if="!provider"
            >
              <div class="not-fav">
                <i class="fa-regular fa-heart"></i>
              </div>
              <div class="show-fav">
                <i class="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>
          <div class="name-all-fle mb-2">
            <img :src="imgTime" class="sm-def-img" alt="" />

            <div class="name-flex font18">
              <span class="gray-col font-default"> سعر تحميل المنتج : </span>
              <span v-if="priceafter">{{ priceafter }} ريال </span>
              <span
                class="gray-col"
                v-if="has_discount"
                :class="{ mainsale: priceafter }"
              >
                {{ price }} ريال</span
              >
            </div>
          </div>
          <div class="gray-col font15 money-pad" v-if="provider">
            خصم {{ sale }}%
            <span v-if="discount_expire">
              ينتهي {{ discount_expire.slice(0, 10) }}
            </span>
          </div>
          <div class="name-all-fle mb-3 mt-3">
            <img :src="imgTime2" class="sm-def-img" alt="" />
            <div class="name-flex font18">
              <span class="gray-col font-default"> عدد مرات التحميل : </span>
              {{ downLoadNum }}
            </div>
          </div>
          <div class="flex-bet-main mb-3">
            <div class="flex-sm-gap">
              <div class="rate-main-me px-2">
                <star-rating
                  :show-rating="false"
                  :rtl="true"
                  :rating="Number(rate)"
                  :star-size="20"
                  :read-only="true"
                  :rounded-corners="true"
                  :increment="0.5"
                  active-color="#ffc107"
                ></star-rating>
              </div>
              <button
                v-if="user"
                type="button"
                data-bs-target="#big-rate"
                data-bs-toggle="modal"
                class="add-new-rate"
              >
                <div class="rate-plus-def">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                </div>
                اضافة تقييم
              </button>
            </div>
            <button
              class="decorated-show"
              data-bs-target="#notificationsModal-d"
              data-bs-toggle="modal"
              @click="getProductRates"
            >
              عرض التقييمات
            </button>
          </div>
          <h6 class="font-bold mb-3">وصف المنتج</h6>
          <p class="main-p">
            {{ desc }}
          </p>
          <div class="flex-bet-main mb-4" v-if="!provider">
            <div class="flex-sm-gap no-align">
              <img :src="providerDataimage" class="miniuser" alt="" />
              <div>
                <div class="font-bold mb-3">{{ providerDataname }}</div>
                <div class="rate-main-me px-2">
                  <star-rating
                    :show-rating="false"
                    :rtl="true"
                    :rating="Number(providerDatarate)"
                    :star-size="20"
                    :read-only="true"
                    :rounded-corners="true"
                    :increment="0.5"
                    active-color="#ffc107"
                  ></star-rating>
                </div>
              </div>
            </div>
            <router-link
              :to="{
                name: 'providerProfile',
                params: { id: providerDataid },
              }"
              class="link-best-de underline-main"
              >عرض الحساب الشخصي</router-link
            >
          </div>
          <form @submit.prevent="addCart" ref="cartform" v-if="!provider">
            <div class="flex-add-cart">
              <!-- <div class="counter-main">
                <div class="qty counter-div justify-content-center">
                  <button
                    type="button"
                    @click="plusCart"
                    class="plus counter-btn unselectable"
                  >
                    +
                  </button>
                  <input
                    type="text"
                    v-model="cartVal"
                    class="count output"
                    disabled
                  />
                  <button
                    type="button"
                    @click="minusCart"
                    class="minus counter-btn unselectable"
                  >
                    -
                  </button>
                </div>
              </div> -->
              <button type="submit" class="big-add-btn up full-wid">
                <div class="add-ico">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                </div>
                <div class="btn-text-me">اضافة للسلة</div>
              </button>
            </div>
          </form>
          <div class="flex-group-me" v-if="provider">
            <router-link
              :to="{
                name: 'editProviderProduct',
                params: { id: this.$route.params.id },
              }"
              class="main-btn up xl"
              >تعديل المنتج</router-link
            >
            <button
              type="button"
              @click="showTemplate"
              label="Confirm"
              class="main-btn up xl red-bg-light"
            >
              حذف المنتج
            </button>
          </div>
        </div>
        <h5 class="font-bold mb-4" v-if="user">منتجات مشابهة</h5>
        <div class="row mb-4" v-if="user">
          <div
            class="col-lg-6 col-md-6 mb-4"
            v-for="product in products"
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
                  <div class="img-logo-wall">لا تتوفر صور</div>
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
                            :rating="Number(product.rate)"
                            :star-size="20"
                            :read-only="true"
                            :rounded-corners="true"
                            :increment="0.5"
                            active-color="#ffc107"
                          ></star-rating>
                        </div>
                      </div>
                    </div>
                    <div class="favourite-main">
                      <font-awesome-icon :icon="['far', 'heart']" />
                    </div>
                  </div>
                  <div class="gray-col mb-4 clamp-me">
                    {{ product.description }}
                  </div>
                  <div class="flex-bet-main">
                    <div class="price-num font19">
                      <span v-if="product.price_after_discount">
                        {{ product.price_after_discount }} ريال
                      </span>
                      <span
                        :class="{ mainsale: product.price_after_discount }"
                        v-if="product.has_discount"
                        class="gray-col left-de"
                        >{{ product.price }} ريال</span
                      >
                    </div>
                    <router-link
                      :to="{
                        name: 'providerProductDetails',
                        params: { id: product.id },
                      }"
                      class="link-best-de"
                      >عرض التفاصيل <i class="fa-solid fa-chevron-left"></i
                    ></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-5" v-else>
        <div class="col-md-6">
          <div class="height-slider">
            <Skeleton width="100%" height="400px"></Skeleton>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-5 flex-bet-main">
            <Skeleton width="8rem" height="1rem"></Skeleton>
            <Skeleton width="2rem" height="2rem"></Skeleton>
          </div>
          <div class="mb-4">
            <Skeleton width="16rem" height="1rem"></Skeleton>
          </div>
          <div class="mb-4">
            <Skeleton width="8rem" height="1rem"></Skeleton>
          </div>
          <div class="mb-4 flex-bet-main">
            <Skeleton width="8rem" height="1rem"></Skeleton>
            <Skeleton width="8rem" height="1rem"></Skeleton>
          </div>
          <div class="mb-4">
            <Skeleton width="8rem" height="1rem"></Skeleton>
          </div>
          <div class="flex-bet-main" v-if="!provider">
            <div class="mb-5 flex-sm-gap">
              <Skeleton width="6rem" shape="circle" height="6rem"></Skeleton>
              <div>
                <Skeleton width="10rem" class="mb-2" height="1rem"></Skeleton>
                <Skeleton width="10rem" height="1rem"></Skeleton>
              </div>
            </div>
            <Skeleton width="9rem" height="1rem"></Skeleton>
          </div>
          <div class="flex-group-me" v-if="provider">
            <Skeleton width="12rem" height="3rem"></Skeleton>
            <Skeleton width="12rem" height="3rem"></Skeleton>
          </div>
          <div v-else class="row">
            <div class="col-md-3 col-3 mb-3">
              <Skeleton width="100%" height="3rem"></Skeleton>
            </div>
            <div class="col-md-9 col-12 mb-3">
              <Skeleton width="100%" height="3rem"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--modals of this view-->
  <!--rates modal-->
  <div
    class="modal fade"
    id="notificationsModal-d"
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
        <h5 class="text-center mt-4 mb-4 font-bold">التقييمات</h5>
        <div class="noti-container-main mb-4" v-if="!loaderRates">
          <template v-if="productRates.length">
            <div
              class="noti-sm-box"
              v-for="rate in productRates"
              :key="rate.id"
            >
              <div class="flex-sm-gap no-align">
                <img :src="defaultUser" class="user-m-img" alt="img" />
                <div class="info-u-user">
                  <div class="mb-2">{{ rate.user.name }}</div>
                  <div class="rate-default-sm mb-2">
                    <star-rating
                      :show-rating="false"
                      :rtl="true"
                      :rating="Number(rate.value)"
                      :star-size="20"
                      :read-only="true"
                      :rounded-corners="true"
                      :increment="0.5"
                      active-color="#ffc107"
                    ></star-rating>
                  </div>
                  <p v-if="rate.comment != 'undefined'">{{ rate.comment }}</p>
                </div>
              </div>
              <div class="time-main gray-col font14">{{ rate.created_at }}</div>
            </div>
          </template>
          <template v-else>
            <div class="nont-found-div w-100 nobg-danger">
              لا يوجد تقييمات حتى الان
            </div>
          </template>
        </div>
        <div v-else class="noti-container-main mb-4">
          <div class="noti-sm-box">
            <div class="flex-sm-gap">
              <Skeleton width="4rem" height="4rem" shape="circle"></Skeleton>
              <div>
                <Skeleton width="4rem" class="mb-1" height="1rem"></Skeleton>
                <Skeleton width="5rem" height="1rem"></Skeleton>
              </div>
            </div>
            <Skeleton width="5rem" height="1rem"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--rate modal-->
  <div
    class="modal fade"
    id="big-rate"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closeRate"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-4 font-bold">اضافة تقييم</h5>
        <div class="gray-col mb-4 text-center">
          برجاء وضع تقييمك على التجربة
        </div>
        <div class="big-rate mb-3">
          <star-rating
            :show-rating="false"
            :rtl="true"
            v-model:rating="valuemain"
            :star-size="40"
            :read-only="false"
            :rounded-corners="true"
            :increment="1"
            active-color="#548ede"
          ></star-rating>
        </div>
        <textarea
          name=""
          v-model="comment"
          rows="4"
          placeholder="اضف تعليق"
          class="main-textarea mt-3 mb-3"
        ></textarea>
        <div class="flex-group-me mb-4 gap-sm yes-wrap">
          <button class="main-btn up" :disabled="disabled" @click="addRate">
            <div v-if="!disabled">{{ $t("shared.send") }}</div>
            <div class="loading" role="status" v-if="disabled">
              <div class="spinner-small-white" v-if="disabled"></div>
            </div>
          </button>
          <button class="main-btn up bg-def" data-bs-dismiss="modal">
            ليس الان
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--success modal-->
  <div
    class="modal fade"
    id="success-cart"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn success-cart-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="successImg" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5">تم الاضافة للسلة بنجاح</div>
      </div>
    </div>
  </div>
  <input
    type="text"
    hidden
    class="opendoneCart"
    data-bs-target="#success-cart"
    data-bs-toggle="modal"
  />

  <!--toast-->
  <div class="confirm-remove">
    <Toast position="center" group="bc" @close="onClose">
      <template #message="slotProps">
        <input type="hidden" :value="slotProps" />
        <div
          class="flex flex-column align-items-center spe-confirm"
          style="flex: 1"
        >
          <div class="text-center">
            <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
            <div class="mb-4">هل انت متاكد من حذف المنتج؟</div>
          </div>
          <div class="flex-group-me">
            <button
              class="main-btn up sm"
              severity="success"
              label="Yes"
              @click="onConfirm()"
              :disabled="disabled"
            >
              <div v-if="!disabled">نعم</div>
              <div class="loading" role="status" v-if="disabled">
                <div class="spinner-small-white" v-if="disabled"></div>
              </div>
            </button>
            <button
              class="main-btn sm bg-gray up"
              severity="secondary"
              label="No"
              @click="onReject()"
            >
              لا
            </button>
          </div>
        </div>
      </template>
    </Toast>
  </div>
</template>

<script>
import Galleria from "primevue/galleria";
import StarRating from "vue-star-rating";
import axios from "axios";
import Image from "primevue/image";
import Toast from "primevue/toast";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      cartVal: 1,
      visible: false,
      value: 3,
      valuemain: null,
      proImg: require("../../assets/imgs/user.jpg"),
      successImg: require("../../assets/imgs/succ.png"),
      platImg: require("../../assets/imgs/Rectangle 30471.png"),
      bestImg: require("../../assets/imgs/user.jpg"),
      imgTime: require("../../assets/imgs/instead.png"),
      imgTime2: require("../../assets/imgs/Group 42(1).png"),
      usermini: require("../../assets/imgs/user.jpg"),
      defaultUser: require("../../assets/imgs/solia.jpg"),
      //   images: null,
      responsiveOptions: [
        {
          breakpoint: "991px",
          numVisible: 4,
        },
        {
          breakpoint: "767px",
          numVisible: 3,
        },
        {
          breakpoint: "575px",
          numVisible: 1,
        },
      ],
      images: [],
      comment: "",
      title: "",
      price: "",
      priceafter: "",
      sale: "",
      downLoadNum: "",
      rate: "",
      desc: "",
      loader: false,
      discount_expire: "",
      providerData: null,
      disabled: false,
      user: false,
      provider: false,
      is_favorite: false,
      product_id: null,
      products: [],
      endPoint: "",
      providerDataid: null,
      providerDataname: "",
      providerDataimage: "",
      providerDatarate: "",
      categoryTop: "",
      loaderRates: false,
      productRates: [],
      has_discount: false,
    };
  },
  components: {
    Galleria,
    StarRating,
    Image,
    Toast,
    Skeleton,
  },
  methods: {
    //  add to cart
    // plusCart() {
    //   this.cartVal = this.cartVal + 1;
    // },
    // minusCart() {
    //   if (this.cartVal > 1) {
    //     this.cartVal = this.cartVal - 1;
    //   }
    // },
    async addCart() {
      const fd = new FormData();
      fd.append("product_id", this.$route.params.id);
      // fd.append("qty", this.cartVal);
      await axios
        .post(`/user/cart/add`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key === "success") {
            document.querySelector(".opendoneCart").click();
            setTimeout(function () {
              document.querySelector(".success-cart-close").click();
            }, 1500);
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 2000,
            });
          }
        });
    },
    // add to fav
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
    // get similer
    async getsimilar() {
      this.loader = true;
      await axios
        .get(`/user/products/${this.$route.params.id}/similar`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.products = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loader = false;
    },
    async getProduct() {
      this.loader = true;
      const fd = new FormData();
      fd.append("product_id", this.$route.params.id);
      await axios
        .post(`/${this.endPoint}`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.categoryTop = response.data.data.category.name;
          this.images = response.data.data.preview_files_attachments;
          this.title = response.data.data.name;
          this.price = response.data.data.price;
          this.priceafter = response.data.data.price_after_discount;
          this.sale = response.data.data.discount_percentage;
          this.downLoadNum = response.data.data.download_count;
          this.desc = response.data.data.description;
          this.rate = response.data.data.rate;
          this.discount_expire = response.data.data.discount_expire;
          this.providerDataimage = response.data.data.provider.image;
          this.providerDataname = response.data.data.provider.name;
          this.providerDataid = response.data.data.provider.id;
          this.providerDatarate = response.data.data.provider.rate;
          this.product_id = response.data.data.id;
          this.is_favorite = response.data.data.is_favorite;
          this.has_discount = response.data.data.has_discount;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loader = false;
    },
    // remove product for provider
    showTemplate() {
      if (!this.visible) {
        this.$toast.add({
          severity: "warn",
          summary: "Are you sure?",
          detail: "Proceed to confirm",
          group: "bc",
        });
        this.visible = true;
      }
    },
    async onConfirm() {
      this.disabled = true;
      const fd = new FormData();
      fd.append("product_id", this.$route.params.id);
      await axios
        .post("/provider/products/delete", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.$toast.removeGroup("bc");
            this.visible = false;
            this.$router.push("/providerProducts");
            this.$toast.add({
              severity: "success",
              detail: `تم حذف المنتج بنجاح`,
              life: 3000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
      this.disabled = false;
    },
    onReject() {
      this.$toast.removeGroup("bc");
      this.visible = false;
    },
    onClose() {
      this.visible = false;
    },
    // add and get rates
    async addRate() {
      this.disabled = true;
      const fd = new FormData();
      fd.append("product", this.$route.params.id);
      fd.append("value", this.valuemain);
      fd.append("comment", this.comment);
      await axios
        .post(`/rates/store`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key === "success") {
            document.querySelector(".closeRate").click();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 2000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 2000,
            });
          }
        });
      this.disabled = false;
    },
    async getProductRates() {
      this.loaderRates = true;
      await axios
        .get(`/rates/products/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.productRates = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loaderRates = false;
    },
  },

  watch: {
    $route(to, from) {
      if (
        to.name == "providerProductDetails" &&
        from.name == "providerProductDetails"
      ) {
        this.getProduct();
        this.getsimilar();
      }
    },
  },
  mounted() {
    if (localStorage.getItem("visitor") == "user") {
      this.user = true;
      this.provider = false;
      this.endPoint = "user/products/show";
    } else if (localStorage.getItem("visitor") == "provider") {
      this.user = false;
      this.provider = true;
      this.endPoint = "provider/products/show";
    } else {
      this.endPoint = "user/products/show";
    }
    this.getProduct();
    this.getsimilar();
  },
};
</script>

<style></style>

<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} - {{ $t("nav.orders") }} -
        <span class="color-main">{{ $t("shared.orderDetails") }}</span>
      </div>
      <div class="flex-bet-main mb-4">
        <h5 class="font-bold">{{ $t("shared.orderDetails") }}</h5>
        <button
          type="button"
          class="filter-icon bg-report"
          data-bs-target="#add-complain"
          data-bs-toggle="modal"
        >
          <font-awesome-icon :icon="['far', 'flag']" />
        </button>
      </div>

      <div class="row mb-5" v-if="!loader">
        <div class="col-lg-7 col-12 mb-4">
          <div
            class="direct-accept"
            v-if="orderData.order_status == 2 && orderData.type == 'for_all'"
          >
            <i class="fa-regular fa-clock"></i>
            <div>{{ $t("shared.waitclient") }}</div>
          </div>
          <div class="or-det-flex mb-3">
            <div class="right-dt">
              {{ $t("shared.orderNum") }} :
              <span class="color-main">{{ orderData.number }}</span>
            </div>
            <div class="gray-col">
              {{ $t("shared.orderstate") }} :
              <span class="color-green" v-if="orderData.status">{{
                orderData.status
              }}</span>
              <span class="color-main" v-else>
                <span v-if="orderData.order_status == 3">{{
                  $t("shared.performing")
                }}</span>
                <span
                  v-if="
                    orderData.order_status == 1 && orderData.type == 'for_all'
                  "
                  >{{ $t("shared.addwaitprice") }}</span
                >
                <span class="color-green" v-if="orderData.order_status == 4">{{
                  $t("shared.finishedall")
                }}</span>
              </span>
            </div>
          </div>
          <div class="or-det-flex mb-3">
            <div class="right-dt">{{ $t("shared.orderDetails") }} :</div>
          </div>
          <div class="or-det-flex bg-def-or">
            <div class="right-dt">{{ $t("shared.orderType") }}</div>
            <div class="gray-col">{{ orderData.service }}</div>
          </div>
          <div class="or-det-flex">
            <div class="right-dt">{{ $t("shared.orderdate") }}</div>
            <div class="gray-col">{{ orderData.request_date }}</div>
          </div>

          <div
            class="or-det-flex bg-def-or"
            v-if="orderData.type != 'direct' && orderData.order_status == 1"
          >
            <div class="right-dt">{{ $t("shared.priceRate") }}</div>
            <div class="gray-col">
              {{ orderData.from_price }} {{ $t("shared.reyal") }} -
              {{ orderData.to_price }} {{ $t("shared.reyal") }}
            </div>
          </div>
          <div class="or-det-flex bg-def-or" v-else>
            <div class="right-dt">{{ $t("shared.Pricework") }}</div>
            <div class="gray-col">
              {{ orderData.price }} {{ $t("shared.reyal") }}
            </div>
          </div>
          <div class="or-det-flex">
            <div class="right-dt">{{ $t("shared.workDuration") }}</div>
            <div class="gray-col">
              {{ orderData.duration }}
            </div>
          </div>
          <div
            class="or-det-flex mb-3 font18 all-dt-orders"
            :class="{
              hideforce:
                orderData.type != 'direct' && orderData.order_status == 1,
            }"
          >
            <div class="right-dt">{{ $t("shared.allplustax") }}</div>
            <div>{{ orderData.final_total }} {{ $t("shared.reyal") }}</div>
          </div>
          <div class="price-adds mt-4">
            <h6 class="mb-3 font-bold">{{ $t("shared.note") }} :</h6>
            <p class="main-p mb-0">
              {{ $t("shared.noteall") }}
            </p>
          </div>
          <div class="flex-group-me mt-4" v-if="orderData.order_status == 1">
            <button
              class="main-btn up lg"
              data-bs-target="#acceptOrder"
              v-if="orderData.type != 'direct'"
              data-bs-toggle="modal"
              type="button"
            >
              {{ $t("shared.acceptword") }}
            </button>
            <button
              type="button"
              @click="acceptOrder"
              v-if="orderData.type == 'direct'"
              :disabled="disabledspe"
              class="main-btn up lg"
            >
              <div v-if="!disabledspe">{{ $t("shared.acceptword") }}</div>
              <div class="loading" role="status" v-if="disabledspe">
                <div class="spinner-small-white" v-if="disabledspe"></div>
              </div>
            </button>
            <button
              class="main-btn up red-bg lg"
              @click="showTemplate"
              type="button"
            >
              {{ $t("shared.refuseseviceword") }}
            </button>
          </div>
          <div
            class="flex-group-me mt-4 mb-4"
            v-if="orderData.order_status == 2 && orderData.is_negotiate == 1"
          >
            <button
              class="main-btn add-copoun up xl"
              data-bs-target="#add-coupon"
              data-bs-toggle="modal"
            >
              {{ $t("shared.invoiceTitleword") }}
            </button>
          </div>
          <div
            class="flex-group-me mb-4 mt-4"
            v-if="orderData.order_status == 3"
          >
            <button
              class="main-btn up xl"
              data-bs-target="#finish-order"
              data-bs-toggle="modal"
              type="button"
            >
              {{ $t("shared.finishingword") }}
            </button>
          </div>
          <div class="flex-group-me mt-4" v-if="orderData.order_status == 4">
            <button
              class="main-btn up xl"
              data-bs-target="#add-rate"
              data-bs-toggle="modal"
              type="button"
            >
              {{ $t("shared.addrate") }}
            </button>
          </div>
        </div>
        <div class="col-lg-5 col-12">
          <div class="or-det-flex mb-3">
            <div class="right-dt">{{ $t("shared.orderDetails") }} :</div>
          </div>
          <div class="bg-reviews mb-3">
            <p class="main-p mb-3">
              {{ orderData.details }}
            </p>
            <div class="row">
              <div
                class="col-lg-3 col-md-4 col-6 mb-3 or-det-img"
                v-for="img in orderData.attachments"
                :key="img"
              >
                <Image
                  class="dt-img-order"
                  :src="img.link"
                  preview
                  alt="Image"
                />
              </div>
            </div>
          </div>
          <div class="or-det-flex mb-3">
            <div class="right-dt">{{ $t("shared.clientInfo") }}</div>
          </div>
          <div class="bg-reviews">
            <div class="noti-sm-box">
              <div class="flex-sm-gap">
                <img :src="userImgStatic" class="user-m-img" alt="img" />
                <div class="info-u-user">
                  <div class="mb-2">{{ userData.name }}</div>
                  <!-- <a :href="'tel:' + `${userData.phone}`" class="call-client"
                    ><i class="fa-solid fa-phone color-green"></i>
                    {{ userData.phone }}</a
                  > -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="small-loader mb-5" v-else>
        {{ $t("shared.loading") }}
        <div class="spinner-small-white red"></div>
      </div>
    </div>
  </div>

  <!--add-complain modal-->
  <div
    class="modal fade"
    id="add-complain"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closeModalcomplain"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <form action="" ref="compainForm" @submit.prevent="complain">
          <h5 class="text-center mt-4 mb-4 font-bold">
            {{ $t("shared.addComplain") }}
          </h5>
          <div class="main-input-cont tel-input-me mb-4">
            <h6 class="mb-2 font14">{{ $t("shared.phone") }}</h6>
            <input
              type="number"
              class="main-input"
              :placeholder="$t('shared.phoneplace')"
              name="phone"
              v-model="phone"
            />
            <div class="drop-countries">
              <Dropdown
                v-model="selectedCountry"
                :options="countries"
                optionLabel="name"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex-group-me">
                    <img
                      :alt="slotProps.value.label"
                      :src="slotProps.value.image"
                      :class="`mr-2 flag flag-${slotProps.value.key.toLowerCase()}`"
                      style="width: 24px"
                    />
                    <div>{{ slotProps.value.key }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex-group-me">
                    <img
                      :alt="slotProps.option.label"
                      :src="slotProps.option.image"
                      :class="`mr-2 flag flag-${slotProps.option.key.toLowerCase()}`"
                      style="width: 24px"
                    />
                    <div>{{ slotProps.option.key }}</div>
                  </div>
                </template>
              </Dropdown>
            </div>
            <div class="abs-icon-right">
              <font-awesome-icon :icon="['fas', 'mobile-screen']" />
            </div>
          </div>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">{{ $t("shared.complainReason") }}</h6>
            <input
              name="reason"
              type="text"
              class="main-input no-right"
              :placeholder="$t('shared.reasonPlace')"
            />
          </div>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">{{ $t("shared.complainDeails") }}</h6>
            <textarea
              name="complaint"
              class="main-textarea"
              id=""
              rows="5"
              :placeholder="$t('shared.detailsPlace')"
            ></textarea>
          </div>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">{{ $t("shared.addPhotos") }}</h6>
            <input
              type="file"
              id="uploadimgreal"
              hidden
              multiple
              accept="image/*"
              @change="uploadImageReal"
            />
            <label for="uploadimgreal" class="upload-imgs-label">
              <font-awesome-icon
                class="icon-upload"
                :icon="['fas', 'cloud-arrow-up']"
              />
              <div class="up-text gray-color">{{ $t("shared.addPhotos") }}</div>
            </label>
            <div class="upload-area-img mt-2">
              <div
                class="relative-parent"
                v-for="(image, key) in productImagesReal"
                :key="image.name"
              >
                <div class="abs-mark-main" @click="removeImageReal(key)">
                  <font-awesome-icon :icon="['fas', 'xmark']" />
                </div>
                <div>
                  <img class="preview" :class="`imagereal${key}`" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-group-me mb-4">
            <button
              type="submit"
              :disabled="disabledComplain"
              class="btn-login up"
            >
              <div v-if="!disabledComplain">{{ $t("shared.send") }}</div>
              <div class="loading" role="status" v-if="disabledComplain">
                {{ $t("footer.sending") }}
                <div class="spinner-small-white" v-if="disabledComplain"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!--finish order modal-->
  <div
    class="modal fade"
    id="finish-order"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closefinish"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <form action="" ref="orderAdd">
          <h5 class="text-center mt-4 mb-3 font-bold">
            {{ $t("shared.endOffer") }}
          </h5>
          <p class="text-center font14 gray-col mb-4">
            {{ $t("shared.askendOffer") }}
          </p>

          <div class="flex-group-me mb-4">
            <button
              type="button"
              @click="finishOreder"
              :disabled="disabledspe"
              class="main-btn up lg"
            >
              <div v-if="!disabledspe">{{ $t("shared.endOfferword") }}</div>
              <div class="loading" role="status" v-if="disabledspe">
                <div class="spinner-small-white" v-if="disabledspe"></div>
              </div>
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="main-btn gray-bg up lg"
            >
              {{ $t("shared.back") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!--add offer modal-->
  <input
    type="text"
    hidden
    data-bs-target="#success-send"
    data-bs-toggle="modal"
    class="open-success"
  />
  <div
    class="modal fade"
    id="acceptOrder"
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
        <form action="" @submit.prevent="addOffer" ref="addOffer">
          <h5 class="text-center mt-4 mb-3 font-bold">اضافة عرض سعر</h5>
          <p class="text-center font14 gray-col mb-4">
            برجاء اضافة عرض سعر ليتم ارساله للعميل للموافقة
          </p>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">المدة</h6>
            <input
              type="text"
              class="main-input no-right"
              placeholder="فضلا كتابة مدة تقديم الخدمة"
              name="duration"
            />
          </div>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">سعر الخدمة</h6>
            <input
              type="number"
              class="main-input no-right"
              placeholder="فضلا كتابة سعر الخدمة هنا"
              name="price"
            />
          </div>

          <div class="flex-group-me mb-4">
            <button type="submit" :disabled="disabled" class="main-btn up lg">
              <div v-if="!disabled">{{ $t("footer.send") }}</div>
              <div class="loading" role="status" v-if="disabled">
                {{ $t("footer.sending") }}
                <div class="spinner-small-white" v-if="disabled"></div>
              </div>
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="main-btn gray-bg up lg"
            >
              رجوع
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--add-coupon modal-->
  <div
    class="modal fade"
    id="add-coupon"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closefinishsheet"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <form action="" ref="sheet">
          <h5 class="text-center mt-4 mb-3 font-bold">اصدار فاتورة</h5>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">تفاصيل الخدمة</h6>
            <textarea
              name="service_details"
              class="main-textarea"
              id=""
              rows="5"
              placeholder=" فضلا كتابة  تفاصيل الخدمة من  هنا"
            ></textarea>
          </div>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">مدة التنفيذ</h6>
            <input
              type="text"
              class="main-input no-right"
              placeholder="فضلا كتابة مدة تنقيذ الخدمة"
              name="duration"
            />
          </div>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">سعر الخدمة</h6>
            <input
              type="text"
              class="main-input no-right"
              placeholder="فضلا كتابة سعر الخدمة هنا"
              name="price"
            />
          </div>

          <div class="flex-group-me mb-4">
            <button
              type="button"
              @click="addsheet"
              :disabled="disabled"
              class="btn-login up lg"
            >
              <div v-if="!disabled">ارسال</div>
              <div class="loading" role="status" v-if="disabled">
                جاري الارسال

                <div class="spinner-small-white" v-if="disabled"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!--rate modal-->
  <div
    class="modal fade"
    id="add-rate"
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
          placeholder="اضف تعليق"
          rows="4"
          class="main-textarea mt-3 mb-3"
        ></textarea>
        <div class="flex-group-me mb-4 gap-sm yes-wrap">
          <button class="main-btn up" :disabled="disabledRate" @click="addRate">
            <div v-if="!disabledRate">{{ $t("shared.send") }}</div>
            <div class="loading" role="status" v-if="disabledRate">
              <div class="spinner-small-white" v-if="disabledRate"></div>
            </div>
          </button>
          <button class="main-btn up gray-bg" data-bs-dismiss="modal">
            ليس الان
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--success send modal-->
  <div
    class="modal fade"
    id="success-send"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closedonesuccess"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="successImg2" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5">
          تم ارسال عرض السعر في انتظار موافقة العميل
        </div>
      </div>
    </div>
  </div>
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
            <div class="mb-4">هل انت متاكد من رفض الطلب؟</div>
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
import Rating from "primevue/rating";
import axios from "axios";
import Image from "primevue/image";
import Toast from "primevue/toast";
import StarRating from "vue-star-rating";
import Dropdown from "primevue/dropdown";
export default {
  data() {
    return {
      valuemain: null,
      bestImg: require("../../assets/imgs/user.jpg"),
      userImgStatic: require("../../assets/imgs/solia.jpg"),
      successImg2: require("../../assets/imgs/succ.png"),
      productImagesReal: [],
      loader: false,
      orderData: [],
      userData: [],
      userImg: "",
      userName: "",
      userPhone: "",
      userId: null,
      disabled: false,
      disabledspe: false,
      disabledRate: false,
      disabledComplain: false,
      selectedCountry: {
        key: "+966",
        code: "SA",
        image: require("../../assets/imgs/saudi.png"),
      },
      countries: [],
      comment: "",
    };
  },
  components: { Rating, Image, Toast, StarRating, Dropdown },
  methods: {
    // api
    // add complain
    async getCountries() {
      await axios.get("/countries/keys").then((response) => {
        this.countries = response.data.data;
      });
    },
    async complain() {
      this.disabledComplain = true;
      const fd = new FormData(this.$refs.compainForm);
      fd.append("phone", this.phone);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("type", "complaint");
      fd.append("request_service_id", this.$route.params.id);

      for (let i = 0; i < this.productImagesReal.length; i++) {
        fd.append(`images[${i}]`, this.productImagesReal[i]);
      }

      await axios
        .post("/user/provider/complaint", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".closeModalcomplain").click();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
          this.disabledComplain = false;
        });
    },
    // rate user
    async addRate() {
      this.disabledRate = true;
      const fd = new FormData();
      fd.append("user", this.userId);
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
            this.$router.push("/");
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 2000,
            });
          }
        });
      this.disabledRate = false;
    },

    // reject order
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
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/provider/request-services/reject", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.$toast.removeGroup("bc");
            this.visible = false;
            this.$router.push("/providerOrder");
            this.$toast.add({
              severity: "success",
              detail: `تم رفض الطلب بنجاح`,
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

    // accept order
    async acceptOrder() {
      this.disabledspe = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/provider/request-services/accept", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.getSingleOrder();
            this.$toast.add({
              severity: "success",
              detail: `تم قبول الطلب بنجاح`,
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
      this.disabledspe = false;
    },
    // finish order
    async finishOreder() {
      this.disabledspe = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/provider/request-service/finished", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".closefinish").click();
            this.$toast.add({
              severity: "success",
              detail: `تم انهاء الطلب بنجاح`,
              life: 3000,
            });
            this.getSingleOrder();
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
      this.disabledspe = false;
    },
    // add offer
    async addOffer() {
      this.disabled = true;
      const fd = new FormData(this.$refs.addOffer);
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/provider/offers/store", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".open-success").click();
            this.$router.push("/");
            setTimeout(function () {
              document.querySelector(".closedonesuccess").click();
            }, 2000);
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
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
    // get order
    async getSingleOrder() {
      this.loader = true;
      const fd = new FormData();
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/provider/request-services/show", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.orderData = response.data.data;
          this.userData = response.data.data.client;
          this.userId = response.data.data.client.id;
        });
      this.loader = false;
    },
    // finish order
    async addsheet() {
      this.disabled = true;
      const fd = new FormData(this.$refs.sheet);
      fd.append("request_service_id", this.$route.params.id);
      await axios
        .post("/provider/request-services/negotiates/store", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".closefinishsheet").click();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
            this.getSingleOrder();
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

    // for realimgs

    // upload Image
    uploadImageReal(e) {
      let selectedFiles2 = e.target.files;
      for (let i = 0; i < selectedFiles2.length; i++) {
        this.productImagesReal.push(selectedFiles2[i]);
      }
      this.applyImageReal();
    },

    // remove Image
    removeImageReal(index) {
      this.productImagesReal.splice(index, 1);
    },

    // apply Image
    applyImageReal() {
      for (let i = 0; i < this.productImagesReal.length; i++) {
        let reader2 = new FileReader();
        reader2.onload = () => {
          document.querySelector(`.imagereal${i}`).src = reader2.result;
        };
        reader2.readAsDataURL(this.productImagesReal[i]);
      }
    },
  },
  mounted() {
    this.getSingleOrder();
    this.getCountries();
  },
};
</script>

<style></style>

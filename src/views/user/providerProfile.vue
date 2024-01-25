<template>
  <div class="provider-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main"> {{ $t("shared.proAccount") }}</span>
      </div>
      <div class="profile-pro">
        <h5 class="font-bold mb-4">{{ $t("shared.proAccount") }}</h5>
        <div class="card-profile mb-5" v-if="!loader">
          <div class="providers-filter mb-4">
            <div class="img-for-provider">
              <Image :src="image" alt="Image" preview />
            </div>
            <div class="flex-filters">
              <button
                type="button"
                v-if="showOrderBtn"
                class="big-add-btn up"
                data-bs-target="#newOrederPro"
                data-bs-toggle="modal"
              >
                <div class="add-ico">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                </div>
                <div class="btn-text-me">{{ $t("shared.addOrdertest") }}</div>
              </button>
              <button
                type="button"
                @click="follow"
                v-if="!is_follow"
                class="big-add-btn bg-gridiant-main"
              >
                <div class="add-ico">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                </div>
                <div class="btn-text-me">{{ $t("shared.follow") }}</div>
              </button>
              <button
                type="button"
                @click="unfollow"
                v-if="is_follow"
                class="big-add-btn bg-gridiant-main"
              >
                <div class="add-ico">
                  <i class="fa-solid fa-check"></i>
                </div>
                <div class="btn-text-me">{{ $t("shared.following") }}</div>
              </button>
              <button
                type="button"
                data-bs-target="#add-complain"
                data-bs-toggle="modal"
                class="filter-icon bg-report"
              >
                <font-awesome-icon :icon="['far', 'flag']" />
              </button>
            </div>
          </div>
          <div class="flex-info-between mb-4">
            <div class="flex-info-between-right">
              <div class="name-flex mb-3">
                <h5>{{ name }}</h5>
                <span class="color-main">{{ experience }}</span>
              </div>
              <div class="name-all-fle mb-3" v-if="service || service != null">
                <img :src="imgTime" alt="" />
                <div class="name-flex font18">
                  <span class="gray-col font-default"
                    >{{ $t("shared.duration") }} :
                  </span>
                  {{ service.duration }} {{ $t("shared.day") }}
                </div>
              </div>
              <div class="name-all-fle mb-3" v-if="service || service != null">
                <img :src="imgPrice" alt="" />
                <div class="name-flex font18">
                  <span class="gray-col font-default"
                    >{{ $t("shared.Pricework") }} :
                  </span>
                  {{ service.price }} {{ $t("shared.reyal") }}
                </div>
              </div>
            </div>
            <div class="flex-info-between-left">
              <div class="rate-num-pro text-center mb-3">{{ rate }}</div>
              <div class="rate-default-big mb-3">
                <star-rating
                  :show-rating="false"
                  :rtl="true"
                  :rating="Number(rate)"
                  :star-size="26"
                  :read-only="true"
                  :rounded-corners="true"
                  :increment="0.5"
                  active-color="#ffc107"
                ></star-rating>
              </div>
              <div class="flex-group-me">
                <button
                  class="btn-show-rate mb-3"
                  @click="getProviderRates"
                  data-bs-target="#ratesModal"
                  data-bs-toggle="modal"
                  type="button"
                >
                  {{ $t("shared.showRates") }}
                </button>
              </div>
            </div>
          </div>
          <h5 class="mb-3 font-bold" v-if="cv.length">
            {{ $t("shared.infoAbout") }}
          </h5>
          <p class="main-p">
            {{ cv }}
          </p>
          <template v-if="works.length">
            <h5 class="mb-3 font-bold">{{ $t("shared.worksshow") }}</h5>
            <div class="row mb-4">
              <div
                class="col-lg-2 col-md-3 col-6 mb-3"
                v-for="work in works"
                :key="work.id"
              >
                <div
                  class="work-box"
                  data-bs-target="#taskDetails"
                  data-bs-toggle="modal"
                  @click="getModalWork(work.id)"
                >
                  <img
                    :src="work.attachments[0].link"
                    class="works-img"
                    alt=""
                  />
                  <div class="abs-text-link">{{ work.name }}</div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="products.length">
            <h5 class="mb-3 font-bold">{{ $t("shared.productstext") }}</h5>
            <div class="row">
              <div
                class="col-lg-2 col-md-3 col-6 mb-3"
                v-for="product in products"
                :key="product.id"
              >
                <div
                  class="work-box"
                  data-bs-target="#taskDetails2"
                  data-bs-toggle="modal"
                  @click="getModalProducts(product.id)"
                >
                  <template v-if="product.preview_files_attachments != null">
                    <img
                      :src="product.preview_files_attachments[0].link"
                      class="best-img"
                      alt="img"
                    />
                  </template>
                  <template v-else>
                    <div class="img-logo-wall w-100 h-100">
                      {{ $t("shared.noImgs") }}
                    </div>
                  </template>
                  <div class="abs-text-link">{{ product.name }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="card-profile mb-5" v-else>
          <div class="flex-info-between mb-4">
            <Skeleton width="8rem" shape="circle" height="8rem"></Skeleton>
            <div class="flex-sm-gap">
              <Skeleton width="6rem" height="2rem"></Skeleton>
              <Skeleton width="2rem" height="2rem"></Skeleton>
            </div>
          </div>
          <div class="flex-info-between mb-5">
            <div>
              <Skeleton class="mb-2" width="8rem" height="1rem"></Skeleton>
              <Skeleton width="8rem" height="1rem"></Skeleton>
            </div>
            <div class="flex-info-between-left">
              <Skeleton width="2rem" class="mb-2" height="2rem"></Skeleton>
              <Skeleton width="8rem" class="mb-2" height="1rem"></Skeleton>
              <Skeleton width="6rem" height="1rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="8rem" class="mb-2" height="1rem"></Skeleton>
          <div class="flex-sm-gap">
            <Skeleton width="6rem" class="mb-2" height="6rem"></Skeleton>
            <Skeleton width="6rem" class="mb-2" height="6rem"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--add new order modal-->
  <div
    class="modal fade"
    id="newOrederPro"
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
        <form action="" ref="serviceForm" @submit.prevent="requestService">
          <h5 class="text-center mt-4 mb-4 font-bold">
            {{ $t("shared.Requestdata") }}
          </h5>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">{{ $t("shared.ProjectDetails") }}</h6>
            <textarea
              name="details"
              class="main-textarea"
              id=""
              rows="5"
              :placeholder="$t('shared.ProjectDetailsplace')"
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
            <button type="submit" class="btn-login up" :disabled="disabled">
              <div v-if="!disabled">{{ $t("shared.send") }}</div>
              <div class="loading" role="status" v-if="disabled">
                {{ $t("footer.sending") }}
                <div class="spinner-small-white" v-if="disabled"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <input
    type="text"
    hidden
    data-bs-target="#success"
    data-bs-toggle="modal"
    class="success-service"
  />

  <!--task details modal-->
  <div
    class="modal fade"
    id="taskDetails"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content" v-if="!loader">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-4 font-bold">
          {{ $t("shared.Workdetails") }}
        </h5>
        <h6 class="font-bold mb-3">{{ title }}</h6>
        <div class="gray-col mb-3">
          {{ subTiltle.name }} - {{ subTiltlecomp.name }}
        </div>
        <div class="task-link gray-col mb-3">
          {{ $t("shared.Worklink") }} :
          <a :href="link" target="_blank">{{ link }}</a>
        </div>
        <div class="flex-bet-task mb-3">
          <div class="name-all-fle">
            <img :src="imgTime" alt="" />
            <div class="name-flex font18">
              <span class="gray-col font-default"
                >{{ $t("shared.workDuration") }} :
              </span>
              {{ time }}
            </div>
          </div>
          <div class="name-all-fle">
            <img :src="priceImg" alt="" />
            <div class="name-flex font18">
              <span class="gray-col font-default"
                >{{ $t("shared.Pricework") }} :
              </span>
              {{ price }} {{ $t("shared.reyal") }}
            </div>
          </div>
        </div>
        <p class="main-p font14 mb-3">
          {{ desc }}
        </p>
        <div class="slider-task-main mb-4 mt-3">
          <div class="img-details">
            <div class="task-comp" v-for="slider in sliders" :key="slider">
              <Image
                class="company-img"
                :src="slider.link"
                preview
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="defrent-loader" v-else>
        <div class="spinner-small-white"></div>
      </div>
    </div>
  </div>
  <!--task details2 modal-->
  <div
    class="modal fade"
    id="taskDetails2"
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
        <h5 class="text-center mt-4 mb-4 font-bold">
          {{ $t("shared.productDetails") }}
        </h5>
        <h6 class="font-bold mb-3">{{ title2 }}</h6>
        <div class="flex-bet-task mb-3">
          <div class="name-all-fle">
            <img :src="imgPrice" alt="" />
            <div class="name-flex font18">
              <span class="gray-col font-default">
                {{ $t("shared.DownloadPrice") }} :
              </span>
              <span v-if="price2after">{{ price2after }} {{ $t("shared.reyal") }}</span>
              <span v-if="price2 != price2after" :class="{ mainsale: price2after }"
                >{{ price2 }} {{ $t("shared.reyal") }}</span
              >
            </div>
          </div>
          <div class="name-all-fle">
            <img :src="imgdown" alt="" />
            <div class="name-flex font18">
              <span class="gray-col font-default">
                {{ $t("shared.Downloadnum") }} :
              </span>
              {{ downloadNum }}
            </div>
          </div>
        </div>
        <h6 class="font-bold mb-3">{{ $t("shared.productPhase") }}</h6>
        <p class="main-p font14 mb-3">
          {{ desc2 }}
        </p>
        <div class="slider-task mb-3">
          <div class="img-details">
            <div class="task-comp" v-for="slider in sliders2" :key="slider">
              <Image
                class="company-img"
                :src="slider.link"
                preview
                alt="Image"
              />
            </div>
          </div>
        </div>
        <div class="flex-add-cart mb-3">
          <button
            type="button"
            @click="addCart"
            class="big-add-btn up full-wid"
          >
            <div class="add-ico">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </div>
            <div class="btn-text-me">{{ $t("shared.addCart") }}</div>
          </button>
        </div>
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
  <!--success modal-->
  <div
    class="modal fade"
    id="success"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn success-service-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-4">
          <img :src="successImg" class="sucess-img" alt="" />
        </div>
        <div class="done-text mb-5">
          {{ $t("shared.doneOrderSend") }}
        </div>
      </div>
    </div>
  </div>

  <!--success cart modal-->
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
          <img :src="successImg2" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5">{{ $t("shared.addedCart") }}</div>
      </div>
    </div>
  </div>

  <!--rates modal-->
  <div
    class="modal fade"
    id="ratesModal"
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
        <h5 class="text-center mt-4 mb-4 font-bold">
          {{ $t("shared.Ratestext") }}
        </h5>
        <div class="noti-container-main mb-4" v-if="!loaderRates">
          <template v-if="productRates.length">
            <div
              class="noti-sm-box"
              v-for="rate in productRates"
              :key="rate.id"
            >
              <div class="flex-sm-gap no-align">
                <img :src="userImg" class="user-m-img" alt="img" />
                <div class="info-u-user">
                  <div class="mb-2">{{ rate.user.name }}</div>
                  <div class="rate-default-sm mb-3">
                    <star-rating
                      :show-rating="false"
                      :rtl="true"
                      :rating="rate.value"
                      :star-size="20"
                      :read-only="true"
                      :rounded-corners="true"
                      :increment="0.5"
                      active-color="#ffc107"
                    ></star-rating>
                  </div>
                  <p>{{ rate.comment }}</p>
                </div>
              </div>
              <div class="time-main gray-col font14">{{ rate.created_at }}</div>

            </div>
          </template>
          <template v-else>
            <div class="nont-found-div w-100 nobg-danger">
              {{ $t("shared.noRates") }}
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
              id="uploadimgreal2"
              hidden
              multiple
              accept="image/*"
              @change="uploadImageReal2"
            />
            <label for="uploadimgreal2" class="upload-imgs-label">
              <font-awesome-icon
                class="icon-upload"
                :icon="['fas', 'cloud-arrow-up']"
              />
              <div class="up-text gray-color">{{ $t("shared.addPhotos") }}</div>
            </label>
            <div class="upload-area-img mt-2">
              <div
                class="relative-parent"
                v-for="(image, key) in complainImgs"
                :key="image.name"
              >
                <div class="abs-mark-main" @click="removeImageReal2(key)">
                  <font-awesome-icon :icon="['fas', 'xmark']" />
                </div>
                <div>
                  <img class="preview" :class="`compainimg${key}`" />
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
</template>

<script>
import Image from "primevue/image";
import StarRating from "vue-star-rating";
import axios from "axios";
import Skeleton from "primevue/skeleton";
import Dropdown from "primevue/dropdown";
import i18n from "@/i18n";
// import required modules

export default {
  data() {
    return {
      selectedCountry: {
        key: "+966",
        code: "SA",
        image: require("../../assets/imgs/saudi.png"),
      },
      countries: [],
      proImg: require("../../assets/imgs/user.jpg"),
      userImg: require("../../assets/imgs/solia.jpg"),
      imgTime: require("../../assets/imgs/Group 96504.png"),
      imgPrice: require("../../assets/imgs/instead.png"),
      imgdown: require("../../assets/imgs/Group 42(1).png"),
      successImg: require("../../assets/imgs/success.gif"),
      successImg2: require("../../assets/imgs/succ.png"),
      priceImg: require("../../assets/imgs/instead.png"),
      value: 4,
      sliders: [],
      productImagesReal: [],
      complainImgs: [],
      disabled: false,
      cv: "",
      experience: "",
      image: "",
      name: "",
      rate: "",
      service: null,
      works: [],
      products: [],
      section_type: null,
      // modal content
      title: "",
      subTiltle: "",
      subTiltlecomp: "",
      link: "",
      time: "",
      price: "",
      desc: "",
      priceinp: "",
      durationMain: "",
      loader: false,
      // modal2 content
      title2: "",
      subTiltle2: "",
      subTiltlecomp2: "",
      link2: "",
      time2: "",
      price2: "",
      price2after: "",
      desc2: "",
      priceinp2: "",
      durationMain2: "",
      downloadNum: "",
      sliders2: [],
      productId: null,
      is_follow: null,
      loaderRates: false,
      productRates: [],
      disabledComplain: false,
      showOrderBtn: false,
      phone: null,
    };
  },
  components: {
    Image,
    StarRating,
    Skeleton,
    Dropdown,
  },

  methods: {
    async getCountries() {
      await axios.get("/countries/keys").then((response) => {
        this.countries = response.data.data;
      });
    },
    // add complain
    async complain() {
      this.disabledComplain = true;
      const fd = new FormData(this.$refs.compainForm);
      fd.append("phone", this.phone);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("type", "complaint");

      fd.append("provider_id", this.$route.params.id);

      for (let i = 0; i < this.complainImgs.length; i++) {
        fd.append(`images[${i}]`, this.complainImgs[i]);
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
    // follow , unfollow
    async follow() {
      const fd = new FormData();
      fd.append("provider_id", this.$route.params.id);
      await axios
        .post(`/user/follows/store`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.$toast.add({
              severity: "success",
              detail: i18n.global.t(`shared.followedSuccess`),
              life: 3000,
            });
            this.getProviderProfile();
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
    },
    async unfollow() {
      const fd = new FormData();
      fd.append("provider_id", this.$route.params.id);
      await axios
        .post(`/user/follows/cancel`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.$toast.add({
              severity: "success",
              detail: i18n.global.t(`shared.unfollowedSuccess`),
              life: 3000,
            });
            this.getProviderProfile();
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
    },
    // add to cart
    async addCart() {
      const fd = new FormData();
      fd.append("product_id", this.productId);
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
    async requestService() {
      this.disabled = true;
      const fd = new FormData(this.$refs.serviceForm);
      fd.append("service_id", localStorage.getItem("service_id"));
      fd.append("provider_id", this.$route.params.id);
      for (let i = 0; i < this.productImagesReal.length; i++) {
        fd.append(`images[${i}]`, this.productImagesReal[i]);
      }

      await axios
        .post("/user/request-service/store", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".success-service").click();
            setTimeout(function () {
              document.querySelector(".success-service-close").click();
            }, 2000);
            this.$router.push("/");
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
          this.disabled = false;
        });
    },
    async getProviderProfile() {
      this.loader = true;
      const fd = new FormData();
      if (localStorage.getItem("service_id")) {
        fd.append("service_id", localStorage.getItem("service_id"));
      }
      fd.append("provider_id", this.$route.params.id);

      await axios
        .post("/user/provider/show-profile", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.name = response.data.data.name;
          this.image = response.data.data.image;
          this.cv = response.data.data.cv;
          this.experience = response.data.data.experience;
          this.is_follow = response.data.data.is_follow;
          if (response.data.data.service != null) {
            this.service = response.data.data.service;
            console.log(response.data.data.service);
          }
          this.rate = response.data.data.rate;
          this.works = response.data.data.works;
          this.products = response.data.data.products;
          this.section_type = response.data.data.section_type;
        });
      this.loader = false;
    },
    getModalWork(id) {
      console.log(this.works);
      for (let i = 0; i < this.works.length; i++) {
        if (this.works[i].id == id) {
          this.title = this.works[i].name;
          this.subTiltle = this.works[i].category;
          this.subTiltlecomp = this.works[i].service;
          this.link = this.works[i].link;
          this.time = this.works[i].duration;
          this.price = this.works[i].price;
          this.desc = this.works[i].description;
          this.sliders = this.works[i].attachments;
        }
      }
    },
    getModalProducts(id) {
      this.productId = id;
      console.log(this.products);
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id == id) {
          this.title2 = this.products[i].name;
          this.subTiltle2 = this.products[i].category;
          this.subTiltlecomp2 = this.products[i].service;
          this.link2 = this.products[i].link;
          this.time2 = this.products[i].duration;
          this.price2 = this.products[i].price;
          this.price2after = this.products[i].price_after_discount;
          this.desc2 = this.products[i].description;
          this.downloadNum = this.products[i].download_count;
          this.sliders2 = this.products[i].preview_files_attachments;
        }
      }
    },

    // get provider Rates

    async getProviderRates() {
      this.loaderRates = true;
      await axios
        .get(`/rates/providers/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.productRates = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loaderRates = false;
    },

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
    // upload Image complain
    uploadImageReal2(e) {
      let selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.complainImgs.push(selectedFiles[i]);
      }
      this.applyImageReal2();
    },

    // remove Image
    removeImageReal2(index) {
      this.complainImgs.splice(index, 1);
    },

    // apply Image
    applyImageReal2() {
      for (let i = 0; i < this.complainImgs.length; i++) {
        let reader = new FileReader();
        reader.onload = () => {
          document.querySelector(`.compainimg${i}`).src = reader.result;
        };
        reader.readAsDataURL(this.complainImgs[i]);
      }
    },
  },
  mounted() {
    this.getProviderProfile();
    this.getCountries();
    if (localStorage.getItem("service_id")) {
      this.showOrderBtn = true;
    } else {
      this.showOrderBtn = false;
    }
  },
};
</script>

<style></style>

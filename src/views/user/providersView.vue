<template>
  <div class="providers-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} - {{ $t("nav.services") }} -
        {{ toplinkcategory }} -
        <span class="color-main"> {{ toplinkText }}</span>
      </div>
      <div class="providers-filter mb-5">
        <div class="container-default">
          <h5 class="mb-2">{{ $t("shared.providersword") }}</h5>
          <div class="filter-result gray-col" v-if="providers.length">
            {{ $t("shared.searchValue") }} :
            <span>{{ providers.length }} {{ $t("shared.providerword") }} </span>
          </div>
        </div>

        <div class="flex-filters">
          <div class="search-form">
            <input
              type="text"
              v-model="searchValue"
              @input="searchProviders"
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
          <button
            type="button"
            class="big-add-btn up"
            data-bs-target="#newOreder"
            data-bs-toggle="modal"
          >
            <div class="add-ico">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </div>
            <div class="btn-text-me">{{ $t("shared.addOrdertest") }}</div>
          </button>
        </div>
      </div>
      <template v-if="!loader">
        <div class="row" v-if="providers.length">
          <div
            class="col-lg-4 col-md-6 mb-4"
            v-for="provider in providers"
            :key="provider.id"
          >
            <div class="best-box">
              <div class="flex-no-align">
                <img :src="provider.image" class="best-img" alt="img" />
                <div class="left-best">
                  <div class="flex-bet-main mb-3">
                    <div class="right-sm-best">
                      <div class="tlte-text">{{ provider.name }}</div>
                    </div>
                  </div>
                  <div class="rate-main-me mb-5">
                    <star-rating
                      :show-rating="false"
                      :rtl="true"
                      :rating="Number(provider.rate)"
                      :star-size="20"
                      :read-only="true"
                      :rounded-corners="true"
                      :increment="0.5"
                      active-color="#ffc107"
                    ></star-rating>
                  </div>
                  <div class="flex-bet-main">
                    <div class="price-num">
                      {{ provider.price }} {{ $t("shared.reyal") }}
                    </div>
                    <router-link
                      :to="{
                        name: 'providerProfile',
                        params: { id: provider.id },
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
        <div v-else class="nont-found-div">{{ $t("shared.noProvider") }}</div>
      </template>
      <template v-else>
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
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
  <!--modals of this view-->
  <!--add new order modal-->
  <div
    class="modal fade"
    id="newOreder"
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
          <div class="grid-main mb-4">
            <div class="main-input-cont">
              <h6 class="mb-2 font14">{{ $t("shared.priceRate") }}</h6>
              <input
                type="number"
                class="main-input no-right"
                :placeholder="$t('shared.from')"
                name="from_price"
              />
              <div class="abs-icon-left">SR</div>
            </div>
            <div class="main-input-cont">
              <h6 class="mb-2 font14 hidden-row">test-only</h6>
              <input
                type="number"
                class="main-input no-right"
                :placeholder="$t('shared.to')"
                name="to_price"
              />
              <div class="abs-icon-left">SR</div>
            </div>
          </div>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">{{ $t("shared.durationDays") }}</h6>
            <input
              type="text"
              class="main-input no-right"
              :placeholder="$t('shared.durationDaysplace')"
              name="duration"
            />
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
            <div class="flex-sm-gap yes-wrap">
              <label for="uploadimgreal" class="upload-imgs-label">
                <font-awesome-icon
                  class="icon-upload"
                  :icon="['fas', 'cloud-arrow-up']"
                />
                <div class="up-text gray-color">
                  {{ $t("shared.addPhotos") }}
                </div>
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
          {{ $t("shared.doneGlobal") }}
        </div>
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
            <div
              class="col-lg-4 col-md-6 mb-3"
              v-for="price in prices"
              :key="price.id"
            >
              <div class="flex-filter-check">
                <input
                  type="radio"
                  v-model="priceVal"
                  :value="price.id"
                  name="price"
                  :id="'checkid' + price.id"
                />
                <label class="mb-0" :for="'checkid' + price.id"
                  >{{ $t("shared.from") }} {{ price.from }}
                  {{ $t("shared.reyal") }} - {{ $t("shared.to") }}
                  {{ price.to }} {{ $t("shared.reyal") }}</label
                >
              </div>
            </div>
          </div>
          <h6 class="mb-3">{{ $t("shared.exp") }}</h6>
          <div class="row mb-4">
            <div
              class="col-lg-3 col-md-4 col-6 mb-3"
              v-for="experience in exps"
              :key="experience.id"
            >
              <div class="flex-filter-check">
                <input
                  type="radio"
                  v-model="experienceVal"
                  :value="experience.id"
                  name="experience"
                  :id="'checkidexp' + experience.id"
                />
                <label class="mb-0" :for="'checkidexp' + experience.id">{{
                  experience.name
                }}</label>
              </div>
            </div>
          </div>
          <div class="flex-group-me mb-4">
            <button
              type="button"
              @click="filterProviders"
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
import StarRating from "vue-star-rating";
import axios from "axios";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/user.jpg"),
      successImg: require("../../assets/imgs/success.gif"),
      value: 4,
      productImagesReal: [],
      providers: [],
      disabled: false,
      loader: false,
      prices: [],
      exps: [],
      searchValue: "",
      priceVal: null,
      experienceVal: null,
      toplinkText: null,
      toplinkcategory: null,
    };
  },
  components: {
    Skeleton,
    StarRating,
  },
  mounted() {
    this.getProviders();
    this.getPrices();
    this.getExperiences();
    this.toplinkcategory = this.$route.params.category;
    this.toplinkText = this.$route.params.text;
  },
  methods: {
    //api
    resetForm() {
      this.priceVal = null;
      this.experienceVal = null;
      this.getProviders();
    },
    // search and filter
    async filterProviders() {
      this.loader = true;
      const fd = new FormData();
      fd.append("service_id", this.$route.params.id);
      if (this.priceVal) {
        fd.append("range_price_id", this.priceVal);
      }
      if (this.experienceVal) {
        fd.append("experience_id", this.experienceVal);
      }
      await axios
        .post(`/user/provider/fillter`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            if (Number(this.experienceVal) || Number(this.priceVal)) {
              this.providers = response.data.data;
            } else {
              this.getProviders();
            }
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
      this.loader = false;
    },
    async searchProviders() {
      this.loader = true;
      const fd = new FormData();
      fd.append("name", this.searchValue);
      await axios
        .post(`/user/provider/search`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (this.searchValue.trim().length > 0) {
            this.providers = response.data.data;
          } else {
            this.getProviders();
          }
        });
      this.loader = false;
    },
    // get prices
    async getPrices() {
      this.loader = true;
      await axios.get("/range-prices?type=service").then((response) => {
        this.prices = response.data.data;
      });
      this.loader = false;
    },
    // request undirect service
    async requestService() {
      this.disabled = true;
      const fd = new FormData(this.$refs.serviceForm);
      fd.append("service_id", this.$route.params.id);
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
    // get providers
    async getProviders() {
      this.loader = true;
      const fd = new FormData(this.$refs.serviceForm);
      fd.append("service_id", this.$route.params.id);
      await axios
        .post("/user/services/provider", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.providers = response.data.data;
          console.log(response.data.data);
          localStorage.setItem("service_id", this.$route.params.id);
        });
      this.loader = false;
    },
    // upload Image
    uploadImageReal(e) {
      let selectedFiles2 = e.target.files;
      for (let i = 0; i < selectedFiles2.length; i++) {
        this.productImagesReal.push(selectedFiles2[i]);
      }
      this.applyImageReal();
    },
    // get exp
    async getExperiences() {
      await axios
        .get("/experiences", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.exps = response.data.data;
        });
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
  watch: {
    $route(to, from) {
      if (to.name == "providersView" && from.name == "providersView") {
        this.getProviders();
        this.toplinkcategory = this.$route.params.category;
        this.toplinkText = this.$route.params.text;
        // alert(this.$route.params.text)
      }
    },
  },
};
</script>

<style></style>

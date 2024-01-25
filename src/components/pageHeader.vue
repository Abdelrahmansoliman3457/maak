<template>
  <div
    class="nav-layer"
    @click="toggleme($event)"
    :class="{ slideto: isActive }"
  ></div>
  <div class="container-header" @click="hideDrops">
    <div class="container">
      <div class="top-header">
        <img :src="logo" class="logo-img" alt="logo" />
        <div class="left-top-head">
          <template v-if="userIsActive">
            <router-link to="/userProfile" class="main-btn2 up2 prof-b"
              >{{ $t("nav.profile") }}
            </router-link>
            <button class="log-out-btn" @click="logOut" :disabled="disabled">
              <template v-if="!disabled"
                ><font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"
              /></template>
              <div class="loading" role="status" v-if="disabled">
                <div class="spinner-small-white red" v-if="disabled"></div>
              </div>
            </button>
          </template>
          <template v-if="providerIsActive">
            <router-link to="/providerEditProfile" class="main-btn2 up2 prof-b"
              >{{ $t("nav.profile") }}
            </router-link>
            <button
              class="log-out-btn"
              @click="logOutProvider"
              :disabled="disabled"
            >
              <template v-if="!disabled"
                ><font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"
              /></template>
              <div class="loading" role="status" v-if="disabled">
                <div class="spinner-small-white red" v-if="disabled"></div>
              </div>
            </button>
          </template>
          <template v-if="!userIsActive && !providerIsActive">
            <router-link to="/userLogin" class="main-btn2 up2"
              ><div class="screens-big">{{ $t("nav.login") }}</div>
              <div class="mobile-only">{{ $t("nav.user") }}</div></router-link
            >
            <router-link to="/providerLogin" class="main-btn up"
              ><div class="screens-big">{{ $t("nav.prologin") }}</div>
              <div class="mobile-only">
                {{ $t("nav.prologinmob") }}
              </div></router-link
            >
          </template>

          <div class="line-up"></div>
          <div v-if="showArbic == 'en'" class="flex-lang relative-parent">
            <i class="fa-solid fa-caret-down"></i>
            <div class="lang-text">English</div>
            <div class="lang-text">
              <img :src="imgLang" alt="" />
            </div>
            <div class="drop-down-content">
              <button @click="setEnglish()" class="web-lang active">
                English
              </button>
              <button @click="setArabic()" class="web-lang">Arabic</button>
            </div>
          </div>
          <div v-else class="flex-lang relative-parent">
            <i class="fa-solid fa-caret-down"></i>
            <div class="lang-text">العربية</div>
            <div class="lang-text">
              <img :src="imgLang2" alt="" />
            </div>
            <div class="drop-down-content">
              <button @click="setArabic()" class="web-lang active">
                العربية
              </button>
              <button @click="setEnglish()" class="web-lang">الانجليزية</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-header">
      <div class="container">
        <ul class="links" :class="{ slideto: isActive }">
          <li>
            <router-link to="/" :class="{ active: $route.path === '/' }">{{
              $t("nav.Home")
            }}</router-link>
          </li>
          <li
            v-if="!providerIsActive"
            v-click-outside="handleClickOutsideserve"
          >
            <div class="flex-drop-btn relative-parent" @click="toggleservice">
              <template v-if="SubCatogries.length">
                <div class="sub-catogry-drop" v-if="showSubCategory">
                  <template v-if="!loading">
                    <router-link
                      class="link-type"
                      v-for="sub in SubCatogries"
                      :key="sub.id"
                      :to="{
                        name: 'providersView',
                        params: {
                          id: sub.id,
                          text: sub.name,
                          category: sub.category,
                        },
                      }"
                    >
                      <div class="font14">{{ sub.name }}</div>
                      <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    </router-link>
                  </template>
                  <template v-else>
                    <div class="link-type d-flex justify-content-center">
                      <div class="loading" role="status">
                        <div class="spinner-small-white"></div>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else>
                <div
                  class="sub-catogry-drop text-center p-3"
                  v-if="showSubCategory && waitloader"
                >
                  لا تتوفر خدمات فرعية
                </div>
              </template>

              <div class="flex-drop-text">{{ $t("nav.services") }}</div>
              <i class="fa-solid fa-chevron-down"></i>
              <ul class="drop-type2" :class="{ showme: showServiceDrop }">
                <li>
                  <div
                    class="link-type hover-me relative-parent"
                    v-for="(catogry, i) in catogries"
                    :class="{ activate: catogry.name == routeparamcategory }"
                    :key="catogry.id"
                    @click="getSubServices($event, catogry.id, i)"
                  >
                    <div class="font14">{{ catogry.name }}</div>
                    <font-awesome-icon :icon="['fas', 'chevron-left']" />
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li v-if="!providerIsActive" v-click-outside="handleClickOutsidePro">
            <div
              class="flex-drop-btn relative-parent"
              @click="toggleDropProducts"
            >
              <div class="flex-drop-text">{{ $t("nav.stores") }}</div>
              <i class="fa-solid fa-chevron-down"></i>
              <ul class="drop-type" :class="{ showme: showProductDrop }">
                <li>
                  <template v-if="products.length">
                    <router-link
                      class="link-type"
                      :class="{ activate: product.id == this.$route.params.id }"
                      v-for="product in products"
                      :key="product.id"
                      :to="{ name: 'userProducts', params: { id: product.id } }"
                    >
                      <div class="font14">{{ product.name }}</div>
                      <font-awesome-icon :icon="['fas', 'chevron-left']" />
                    </router-link>
                  </template>
                  <template v-else>
                    <div
                      class="link-type text-center color-red d-block cu-default"
                    >
                      لا توجد متاجر حتى الان
                    </div>
                  </template>
                </li>
              </ul>
            </div>
          </li>
          <li v-if="userIsActive">
            <router-link
              to="/userOrder"
              :class="{ active: $route.path === '/userOrder' }"
              >{{ $t("nav.orders") }}</router-link
            >
          </li>
          <li v-if="providerIsActive">
            <router-link
              to="/providerOrder"
              :class="{ active: $route.path === '/providerOrder' }"
              >{{ $t("nav.orders") }}</router-link
            >
          </li>

          <li v-if="providerIsActive && !storeOwner">
            <router-link
              to="/worksView"
              :class="{ active: $route.path === '/worksView' }"
              >{{ $t("nav.Business") }}</router-link
            >
          </li>
          <li v-if="providerIsActive && !freelancer">
            <router-link
              to="/providerProducts"
              :class="{ active: $route.path === '/providerProducts' }"
              >{{ $t("shared.productstext") }}</router-link
            >
          </li>
          <li v-if="providerIsActive">
            <router-link
              to="/fainancialView"
              :class="{ active: $route.path === '/fainancialView' }"
              >{{ $t("shared.faina") }}</router-link
            >
          </li>
          <li v-if="providerIsActive && !freelancer">
            <router-link
              to="/reportsView"
              :class="{ active: $route.path === '/reportsView' }"
              >{{ $t("nav.reports") }}</router-link
            >
          </li>
          <li v-if="userIsActive">
            <router-link
              to="/filesView"
              :class="{ active: $route.path === '/filesView' }"
              >{{ $t("nav.files") }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/whousView"
              :class="{ active: $route.path === '/whousView' }"
              >{{ $t("nav.whous") }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/complainsView"
              :class="{ active: $route.path === '/complainsView' }"
              >{{ $t("nav.complains") }}</router-link
            >
          </li>
          <li>
            <router-link
              to="/walletView"
              :class="{ active: $route.path === '/walletView' }"
              >{{ $t("nav.wallet") }}</router-link
            >
          </li>
        </ul>
        <div class="bottom-l-head">
          <router-link
            to="/notificationsView"
            class="circle-header"
            :class="{ active: $route.path === '/notificationsView' }"
          >
            <div class="sm-circle" v-if="NotiCount">{{ NotiCount }}</div>
            <font-awesome-icon :icon="['far', 'bell']" />
          </router-link>
          <router-link
            v-if="!providerIsActive"
            to="/cartView"
            class="circle-header"
            :class="{ active: $route.path === '/cartView' }"
          >
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </router-link>
          <router-link
            v-if="!providerIsActive"
            to="/favView"
            class="circle-header"
            :class="{ active: $route.path === '/favView' }"
          >
            <font-awesome-icon :icon="['far', 'heart']" />
          </router-link>
          <router-link
            to="/allchatsView"
            :class="{ active: $route.path === '/allchatsView' }"
            class="circle-header"
          >
            <font-awesome-icon :icon="['far', 'envelope']" />
          </router-link>
        </div>
        <span
          class="coll-icon"
          :class="{ active: isActivecol }"
          @click="toggleSidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
    <ScrollTop
      target="window"
      :threshold="100"
      class="custom-scrolltop"
      icon="fa-solid fa-arrow-up"
    />
  </div>
  <input
    type="text"
    data-bs-target="#needLogin"
    data-bs-toggle="modal"
    hidden
    class="needLogin"
  />
  <!--success modal-->
  <div
    class="modal fade"
    id="needLogin"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="errImg" class="err-img" alt="" />
        </div>
        <div class="done-text mb-5">{{ $t("modals.loginFirst") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollTop from "primevue/scrolltop";
import axios from "axios";
export default {
  data() {
    return {
      disabled: false,
      userIsActive: false,
      providerIsActive: false,
      logo: require("../assets/imgs/Group 101124.png"),
      imgLang: require("../assets/imgs/Vector.png"),
      imgLang2: require("../assets/imgs/saudi.png"),
      errImg: require("../assets/imgs/noun_warning.png"),
      isActive: false,
      isActivecol: false,
      showArbic: "ar",
      showType: false,
      catogries: [],
      SubCatogries: [],
      products: [],
      loading: false,
      showSubCategory: false,
      showServiceDrop: false,
      showProductDrop: false,
      waitloader: false,
      NotiCount: null,
      routeparamcategory: "",
      bothProviders: false,
      storeOwner: false,
      freelancer: false,
    };
  },

  components: { ScrollTop },

  methods: {
    // api
    async getNotiCount() {
      await axios
        .get("/user/notifications/count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key != "unauthenticated") {
            this.NotiCount = response.data.data.count;
          } else {
            this.$router.push("/userLogin");
            // localStorage.clear();
            localStorage.removeItem("visitor");
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getNotiCountProvider() {
      await axios
        .get("/provider/notifications/count", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key != "unauthenticated") {
            this.NotiCount = response.data.data.count;
          } else {
            this.$router.push("/providerLogin");
            // localStorage.clear();
            localStorage.removeItem("visitor");
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getServices() {
      await axios
        .get("/user/categories/service")
        .then((response) => {
          this.catogries = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProducts() {
      await axios
        .get("user/categories/store")
        .then((response) => {
          this.products = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async logOut() {
      this.disabled = true;
      await axios
        .post("/user/logout", "", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            // localStorage.clear();
            localStorage.removeItem("visitor");
            localStorage.removeItem("token");
            this.NotiCount = 0;

            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });

            this.$router.push("/userLogin");
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
          this.disabled = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async logOutProvider() {
      this.disabled = true;
      await axios
        .post("/provider/logout", "", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            // localStorage.clear();
            localStorage.removeItem("visitor");
            localStorage.removeItem("token");
            this.NotiCount = 0;
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });

            this.$router.push("/providerLogin");
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
          this.disabled = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getSubServices(e, id) {
      this.showSubCategory = true;
      e.stopPropagation();
      this.loading = true;
      await axios
        .get(`/user/categories/${id}/services`)
        .then((response) => {
          this.SubCatogries = response.data.data.services;
          this.loading = false;
          this.waitloader = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // toggle dropdowns
    toggleme() {
      this.isActive = false;
      this.isActivecol = false;
    },
    toggleSidebar() {
      this.isActive = true;
      this.isActivecol = true;
    },
    showSubservices() {
      this.showSubCategory = true;
    },
    toggleservice() {
      this.showServiceDrop = !this.showServiceDrop;
      this.showSubCategory = false;
    },
    handleClickOutsideserve() {
      this.showServiceDrop = false;
      this.showSubCategory = false;
    },
    toggleDropProducts() {
      this.showProductDrop = !this.showProductDrop;
    },
    handleClickOutsidePro() {
      this.showProductDrop = false;
    },

    // change language and local
    setArabic() {
      localStorage.setItem("locale", "ar");
      localStorage.setItem("lang", "ar");
      setTimeout(() => {
        this.$i18n.locale = "ar";
      }, 3000);

      // this.showArbic = this.$i18n.locale;
      location.reload();
    },
    setEnglish() {
      localStorage.setItem("locale", "en");
      localStorage.setItem("lang", "en");
      setTimeout(() => {
        this.$i18n.locale = "en";
      }, 3000);

      location.reload();
    },
  },
  mounted() {
    this.showArbic = localStorage.getItem("locale");
    localStorage.setItem("lang", localStorage.getItem("locale"));
    this.getServices();
    this.getProducts();
    this.routeparamcategory = this.$route.params.category;
  },
  watch: {
    $route(to, from) {
      if (localStorage.getItem("providerShow") == "bothProviders") {
        this.bothProviders = true;
        this.storeOwner = false;
        this.freelancer = false;
      }
      if (localStorage.getItem("providerShow") == "storeOwner") {
        this.storeOwner = true;
        this.bothProviders = false;
        this.freelancer = false;
      }
      if (localStorage.getItem("providerShow") == "freelancer") {
        this.freelancer = true;
        this.bothProviders = false;
        this.storeOwner = false;
      }
      if (from.name != "providersView" && from.name != undefined) {
        localStorage.removeItem("service_id");
      }
      if (localStorage.getItem("visitor") == "user") {
        this.getNotiCount();
      }
      if (localStorage.getItem("visitor") == "provider") {
        this.getNotiCountProvider();
      }
      // check is user or provider is logged in
      const token = localStorage.getItem("token");
      if (
        token &&
        localStorage.getItem("visitor") === "user" &&
        to.name !== "userLogin"
      ) {
        this.userIsActive = true;
        this.providerIsActive = false;
      } else if (
        token &&
        localStorage.getItem("visitor") === "provider" &&
        to.name !== "providerLogin"
      ) {
        this.userIsActive = false;
        this.providerIsActive = true;
      } else if (token && to.name == "userLogin") {
        this.userIsActive = false;
        this.providerIsActive = false;
      } else {
        this.userIsActive = false;
        this.providerIsActive = false;
      }

      this.isActive = false;
      this.isActivecol = false;
      this.showSubCategory = false;
    },
  },
};
</script>

<style scoped>
::v-deep(.custom-scrolltop) {
  width: 46px;
  height: 46px;
  border-radius: 4px;
  border-radius: 50%;
  background: #548ede !important;
  color: #fff !important;
}

::v-deep(.custom-scrolltop:hover) {
  background: #548ede !important;
}

::v-deep(.custom-scrolltop .p-scrolltop-icon) {
  font-size: 1rem;
  color: #fff;
}
.p-scrolltop {
  left: 30px;
  bottom: 30px;
  right: unset;
}
</style>

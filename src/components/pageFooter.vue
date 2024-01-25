<template>
  <!--start footer-->
  <div class="footer">
    <div class="main-footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12 mb-4">
            <div class="footer-colomn-me">
              <div class="foot-lo mb-4">
                <img :src="footerLogo" alt="" />
              </div>
              <p class="main-p">
                {{ footerDesc }}
              </p>
              <div class="footer-colomn-me">
                <h6 class="mb-4">{{ $t("footer.follow") }}</h6>
                <ul>
                  <div class="flex-socials" v-if="!loader">
                    <div v-for="social in socials" :key="social">
                      <a target="_blank" :href="social.link"
                        ><img :src="social.icon" :alt="social.name"
                      /></a>
                    </div>
                  </div>
                  <div v-else class="flex-socials">
                    <Skeleton
                      width="26px"
                      height="26px"
                      shape="circle"
                    ></Skeleton>
                    <Skeleton
                      width="26px"
                      height="26px"
                      shape="circle"
                    ></Skeleton>
                    <Skeleton
                      width="26px"
                      height="26px"
                      shape="circle"
                    ></Skeleton>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 col-12 mb-4">
            <div class="footer-colomn-me">
              <h6 class="mb-4">{{ $t("footer.about") }}</h6>
              <ul>
                <li>
                  <router-link to="/whousView"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("nav.whous") }}</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/complainsView"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("nav.complains") }}</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/contactView"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("footer.contact") }}</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/walletView"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("nav.wallet") }}</div>
                  </router-link>
                </li>
                <li v-if="user">
                  <router-link to="/FavView"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("footer.fav") }}</div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 col-12 mb-4">
            <div class="footer-colomn-me">
              <h6 class="mb-4 hidden-row">روابط تهمك</h6>
              <ul>
                <li v-if="user">
                  <router-link to="/filesView"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("nav.files") }}</div>
                  </router-link>
                </li>
                <li v-if="user">
                  <router-link to="/userOrder"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("nav.orders") }}</div>
                  </router-link>
                </li>
                <li v-if="provider">
                  <router-link to="/providerOrder"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("nav.orders") }}</div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/userReviews"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("footer.reviews") }}</div>
                  </router-link>
                </li>
                <li v-if="user">
                  <router-link to="/userProfile"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("nav.profile") }}</div>
                  </router-link>
                </li>
                <li v-if="provider">
                  <router-link to="/providerEditProfile"
                    ><div class="dot-foot"></div>
                    <div class="my-l">{{ $t("nav.profile") }}</div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-12 mb-4">
            <div class="footer-colomn-me">
              <h6 class="mb-4 hidden-row">تابعنا على</h6>
              <div class="flex-footer-b">
                <ul>
                  <li>
                    <router-link to="/notificationsView"
                      ><div class="dot-foot"></div>
                      <div class="my-l">{{ $t("footer.noti") }}</div>
                    </router-link>
                  </li>
                  <li v-if="user">
                    <router-link to="/cartView"
                      ><div class="dot-foot"></div>
                      <div class="my-l">{{ $t("footer.cart") }}</div>
                    </router-link>
                  </li>
                </ul>
                <form action="#" ref="suscribeform" @submit.prevent="subscribe">
                  <h6 class="mb-3">{{ $t("footer.contact") }}</h6>
                  <div class="flex-form-im">
                    <input
                      :placeholder="$t('footer.emailPlace')"
                      type="email"
                      name="email"
                      class="foot-input"
                    />
                    <button
                      type="submit"
                      :disabled="disabled"
                      class="form-foot-sub up"
                    >
                      <div v-if="!disabled">{{ $t("shared.send") }}</div>
                      <div class="loading" role="status" v-if="disabled">
                        <div class="spinner-small-white" v-if="disabled"></div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
              <div class="flex-bet-me">
                <ul>
                  <li>
                    <router-link to="/conditionView"
                      ><div class="dot-foot"></div>
                      <div class="my-l">{{ $t("footer.terms") }}</div>
                    </router-link>
                  </li>
                </ul>
                <img :src="defimg" alt="img" class="foot-def-img" />
              </div>
              <div class="flex-end-foot mt-4">
                <a :href="googleLink" target="_blank">
                  <img :src="playimg" alt="img" class="play-img-amin" />
                </a>
                <a :href="appstoreLink" target="_blank">
                  <img :src="playimg2" alt="img" class="play-img-amin" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="down-footer">
      <div class="container">
        <div class="down-footer-r font14">{{ $t("footer.footl") }}</div>
        <div class="down-footer-l font14">{{ $t("footer.footr") }}</div>
      </div>
    </div>
  </div>
  <!--end footer-->
</template>

<script>
import axios from "axios";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      footerImg: require("../assets/imgs/Group 13.png"),
      socaialImg: require("../assets/imgs/social.png"),
      defimg: require("../assets/imgs/Saudi_Vision_2030_logo 1.png"),
      playimg: require("../assets/imgs/Group 101409.png"),
      playimg2: require("../assets/imgs/Group 101411.png"),
      socials: "",
      loader: false,
      disabled: false,
      footerDesc: "",
      footerLogo: "",
      googleLink: "",
      appstoreLink: "",
      user: false,
      provider: false,
    };
  },
  components: { Skeleton },

  methods: {
    async getinfo() {
      this.loader = true;
      await axios
        .get("/settings")
        .then((response) => {
          this.footerLogo = response.data.data.footer_logo;
          this.googleLink = response.data.data.google_play_link;
          this.appstoreLink = response.data.data.app_store_link;
          if (localStorage.getItem("lang") == "en") {
            this.footerDesc = response.data.data.footer_description_en;
          } else {
            this.footerDesc = response.data.data.footer_description_ar;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.loader = false;
    },
    async getsocials() {
      this.loader = true;
      await axios
        .get("/socials")
        .then((response) => {
          this.socials = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.loader = false;
    },
    async subscribe() {
      this.disabled = true;
      const fd = new FormData(this.$refs.suscribeform);

      await axios
        .post("/subscribe", fd)
        .then((response) => {
          if (response.data.key == "success") {
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
          this.disabled = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getsocials();
    this.getinfo();
  },
  watch: {
    $route(to, from) {
      // check is user or provider is logged in
      const token = localStorage.getItem("token");
      if (token && localStorage.getItem("visitor") === "provider") {
        this.provider = true;
        this.user = false;
      } else {
        this.provider = false;
        this.user = true;
      }
    },
  },
};
</script>

<style></style>

<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("shared.loginProvider") }}</span>
      </div>
      <div class="row mb-5 align-items-center">
        <div class="col-md-7 col-12 mb-4">
          <form action="" ref="loginForm" @submit.prevent="login">
            <div class="login-box">
              <h5 class="font-bold mb-3">{{ $t("shared.loginProvider") }}</h5>
              <p class="gray-col mb-5 font14">
                {{ $t("shared.loginParse") }}
              </p>
              <div class="main-input-cont tel-input-me login-inputs mb-4">
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
              <div class="main-input-cont login-inputs mb-3">
                <h6 class="mb-2 font14">{{ $t("shared.pass") }}</h6>
                <input
                  type="password"
                  class="main-input"
                  :placeholder="$t('shared.passPlace')"
                  name="password"
                />
                <div class="abs-icon-right">
                  <font-awesome-icon :icon="['fas', 'lock']" />
                </div>
              </div>
              <div class="flex-end-main-s mb-4 login-inputs">
                <router-link to="/ForgetView" class="gray-col font14"
                  >{{ $t("shared.Forgotpass") }}</router-link
                >
              </div>

              <div class="flex-group-me login-inputs mb-3">
                <button type="submit" class="btn-login up">
                  <div v-if="!disabled">{{ $t("shared.Login") }}</div>
                  <div class="loading" role="status" v-if="disabled">
                    {{ $t("shared.loginloader") }}
                    <div class="spinner-small-white" v-if="disabled"></div>
                  </div>
                </button>
              </div>
              <div class="flex-group-me mb-3 font14 login-inputs">
                <div class="have-you gray-col">
                  {{ $t("shared.donthaveAccount") }}
                  <router-link to="/providerRegester">{{ $t("shared.newAccount") }}</router-link>
                </div>
              </div>
              <div class="flex-group-me mb-3 font14 login-inputs">
                <div class="have-you gray-col">
                  {{ $t("shared.haveProblem") }}
                  <router-link class="decore-under" to="/contactView"
                    >{{ $t("shared.pleaseCont") }}</router-link
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-5">
          <div class="img-box-login">
            <img :src="loginImg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Dropdown from "primevue/dropdown";
export default {
  data() {
    return {
      loginImg: require("../../assets/imgs/6310507 1.png"),
      phone: "",
      disabled: false,
      device_id: "111",
      device_type: "web",
      selectedCountry: {
        key: "+966",
        code: "SA",
        image: require("../../assets/imgs/saudi.png"),
      },
      countries: [],
    };
  },

  components: { Dropdown },
  methods: {
    async getCountries() {
      await axios.get("/countries/keys").then((response) => {
        this.countries = response.data.data;
      });
    },
    async login() {
      this.disabled = true;
      const fd = new FormData(this.$refs.loginForm);
      fd.append("phone", this.phone);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("device_id", localStorage.getItem("fcmtocken"));
      fd.append("device_type", this.device_type);

      await axios.post(`/provider/login`, fd).then((response) => {
      
        if (response.data.key == "success") {
          localStorage.setItem("visitorSocket", "Provider");
          localStorage.setItem("RecieverSocket", "User");
          localStorage.setItem("userid", response.data.data.id);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("visitor", "provider");
          if (response.data.data.section.id == 1) {
            localStorage.setItem("providerShow", "freelancer");
          } else if (response.data.data.section.id == 2) {
            localStorage.setItem("providerShow", "storeOwner");
          } else if (!response.data.data.section.id) {
            localStorage.setItem("providerShow", "bothProviders");
          }
          localStorage.setItem("phone", this.phone);
          localStorage.setItem("country_code", this.selectedCountry.key);
          localStorage.setItem("country_img", this.selectedCountry.image);

          this.$toast.add({
            severity: "success",
            detail: `${response.data.msg}`,
            life: 3000,
          });

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
  },
  mounted() {
    this.getCountries();
  },
};
</script>

<style></style>

<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">انشاء حساب جديد كعميل</span>
      </div>
      <div class="row mb-5 align-items-center">
        <div class="col-md-7 col-12 mb-4">
          <form action="" @submit.prevent="register" ref="registerForm">
            <div class="login-box">
              <h5 class="font-bold mb-3">{{ $t("shared.newAccount") }}</h5>
              <p class="gray-col mb-4">
                {{ $t("shared.loginParse") }}
              </p>
              <div class="main-input-cont login-inputs mb-4">
                <h6 class="mb-2 font14">{{ $t("shared.username") }}</h6>
                <input
                  type="text"
                  class="main-input"
                  :placeholder="$t('shared.usernameplace')"
                  name="user_name"
                  v-model="name"
                />
                <div class="abs-icon-right">
                  <font-awesome-icon :icon="['far', 'user']" />
                </div>
              </div>
              <div class="main-input-cont login-inputs mb-4">
                <h6 class="mb-2 font14">{{ $t("footer.email") }}</h6>
                <input
                  type="text"
                  class="main-input"
                  :placeholder="$t('footer.emailPlacereg')"
                  name="email"
                />
                <div class="abs-icon-right">
                  <font-awesome-icon :icon="['far', 'envelope']" />
                </div>
              </div>
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
              <div class="flex-choose-in mb-5 px-2">
                <input
                  type="checkbox"
                  id="check-me"
                  v-model="is_conditions"
                  class="check-inp"
                />
                <label for="check-me" class="font14"
                  >{{ $t("shared.agreeTerms") }}</label
                >
              </div>
              <div class="flex-group-me login-inputs mb-3">
                <button type="submit" :disabled="disabled" class="btn-login up">
                  <div v-if="!disabled">{{ $t("shared.register") }}</div>
                  <div class="loading" role="status" v-if="disabled">
                    {{ $t("shared.registering") }}

                    <div class="spinner-small-white" v-if="disabled"></div>
                  </div>
                </button>
              </div>
              <div class="flex-group-me mb-3 font14 login-inputs">
                <div class="have-you gray-col">
                  {{ $t("shared.haveAccount") }}
                  <router-link to="/userLogin">{{ $t("shared.Login") }}</router-link>
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
// import Toast from "primevue/toast";
export default {
  data() {
    return {
      loginImg: require("../../assets/imgs/6310507 1.png"),
      phone: null,
      name: "",
      is_conditions: false,
      country: null,
      disabled: false,
      selectedCountry: {
        key: "+966",
        code: "AU",
        image: require("../../assets/imgs/saudi.png") ,
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

    async register() {
      this.disabled = true;
      const fd = new FormData(this.$refs.registerForm);
      fd.append("is_conditions", Number(this.is_conditions));
      // fd.append("lang", localStorage.getItem("lang"));
      fd.append("country_code", this.selectedCountry.key);
      fd.append("device_id", localStorage.getItem("fcmtocken"));

      await axios.post("/user/register", fd).then((response) => {
        if (response.data.key == "success") {
          localStorage.setItem("phone", this.phone);
          localStorage.setItem("country_code", this.selectedCountry.key);
          localStorage.setItem("country_img", this.selectedCountry.image);
          localStorage.setItem("selected_country", this.selectedCountry);
          localStorage.setItem("name", this.name);
          localStorage.setItem("userid", response.data.data.id);
          localStorage.setItem("RecieverSocket", "Provider");
          localStorage.setItem("visitorSocket", "User");


          this.$toast.add({
            severity: "success",
            detail: `${response.data.msg}`,
            life: 3000,
          });

          this.$router.push("/userConfirm");
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

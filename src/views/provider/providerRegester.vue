<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("shared.regProvider") }}</span>
      </div>
      <div class="row mb-5 align-items-center">
        <div class="col-md-10 col-12 mb-4">
          <form action="" @submit.prevent="register" ref="registerForm">
            <div class="login-box">
              <h5 class="font-bold mb-3">{{ $t("shared.newAccount") }}</h5>
              <p class="gray-col font14 mb-4">
                {{ $t("shared.loginParse") }}
              </p>
              <label for="img-up" class="img-profile-pro mb-3">
                <img
                  ref="editAvatar"
                  class="prov-img"
                  :src="edit_avatar"
                  alt=""
                />
                <input
                  name="image"
                  type="file"
                  id="img-up"
                  hidden
                  accept="image/*"
                  @change="uploadImage"
                />
              </label>
              <div class="row">
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.username") }}</h6>
                    <input
                      type="text"
                      class="main-input"
                      :placeholder="$t('shared.usernameplace')"
                      name="name"
                      v-model="name"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['far', 'user']" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
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
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
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
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.city") }}</h6>
                    <Dropdown
                      v-model="selectedCity"
                      :options="cities"
                      filter
                      optionLabel="name"
                      :placeholder="$t('shared.cityPlace')"
                      class="main-select"
                    />
                    
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['fas', 'location-dot']" />
                    </div>
                  </div>
                </div>  
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.Selectsection") }}</h6>
                    <Dropdown
                      v-model="selectedDepart"
                      :options="Departs"
                      optionLabel="name"
                      :placeholder="$t('shared.SelectsectionPlace')"
                      class="main-select"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['far', 'clipboard']" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
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
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.confirmPass") }}</h6>
                    <input
                      type="password"
                      class="main-input"
                      :placeholder="$t('shared.confirmPassPlace')"
                      name="password_confirmation"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-choose-in mb-5 px-2">
                <input
                  type="checkbox"
                  v-model="is_conditions"
                  id="check-me"
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
                  <router-link to="/providerLogin">{{ $t("shared.Login") }}</router-link>
                </div>
              </div>
            </div>
          </form>
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
      edit_avatar: require("../../assets/imgs/prov-instead.png"),
      successImg2: require("../../assets/imgs/succ.png"),
      selectedCity: null,
      cities: [],
      selectedDepart: null,
      Departs: [],
      name: "",
      phone: null,
      country: null,
      is_conditions: false,
      disabled: false,
      selectedCountry: {
        key: "+966",
        code: "AU",
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
    async getSections() {
      await axios.get("/app/sections").then((response) => {
        console.log(response.data.data);
        this.Departs = response.data.data;
        this.Departs.push({id: "" , name: this.$t('shared.bothproviders')})
      });
    },
    async getCities() {
      await axios.get("/cities").then((response) => {
        this.cities = response.data.data;
      });
    },
    async register() {
      this.disabled = true;
      const fd = new FormData(this.$refs.registerForm);
      fd.append("is_conditions", Number(this.is_conditions));
      fd.append("country_code", Number(this.selectedCountry.key));
      if(this.selectedCity){
        fd.append("city_id", this.selectedCity.id);
      }
      
      if(this.selectedDepart){
        fd.append("section_id", this.selectedDepart.id);
      }
      

      await axios.post("/provider/register", fd).then((response) => {
        if (response.data.key == "success") {
          localStorage.setItem("phone", this.phone);
          localStorage.setItem("country_code", this.selectedCountry.key);
          localStorage.setItem("country_img", this.selectedCountry.image);

          this.$toast.add({
            severity: "success",
            detail: `${response.data.msg}`,
            life: 3000,
          });

          this.$router.push("/providerConfirm");
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
    // uploadImage
    uploadImage(e) {
      const file = e.target.files[0];
      if (e.target.files[0]) {
        this.edit_avatar = URL.createObjectURL(file);
        this.$refs.editAvatar.classList.add("full-wid-img");
      } else {
        this.edit_avatar = require("../../assets/imgs/prov-instead.png");
        this.$refs.editAvatar.classList.remove("full-wid-img");
      }
    },
  },
  mounted() {
    this.getCountries();
    this.getCities();
    this.getSections();
    
    
  },
};
</script>

<style></style>

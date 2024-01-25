<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("footer.contact") }}</span>
      </div>
      <div class="row mb-5 align-items-center">
        <div class="col-lg-7 col-12 mb-4">
          <form action="" @submit.prevent="submitContact" ref="complainForm">
            <div class="login-box">
              <h5 class="font-bold mb-3">{{ $t("footer.contact") }}</h5>
              <p class="gray-col mb-4 font14">
                {{ $t("shared.Pleasecontact") }}
              </p>
              <div class="grid-main mb-4">
                <div class="main-input-cont">
                  <h6 class="mb-2 font14">{{ $t("shared.username") }}</h6>
                  <input
                    type="text"
                    @input="checkUserValid"
                    class="main-input"
                    :placeholder="$t('shared.usernameplace')"
                    name="name"
                    v-model="userName"
                    required
                  />

                  <div class="abs-icon-right">
                    <font-awesome-icon :icon="['far', 'user']" />
                  </div>
                </div>
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
              <div class="main-input-cont mb-4">
                <h6 class="mb-2 font14">{{ $t("shared.message") }}</h6>
                <textarea
                  name="message"
                  class="main-textarea"
                  v-model="message"
                  id=""
                  rows="6"
                  :placeholder="$t('shared.messageplace')"
                  required
                ></textarea>
              </div>

              <div class="flex-group-me">
                <button
                  type="submit"
                  :disabled="disabled"
                  class="btn-login up btn-go"
                >
                  <div v-if="!disabled">{{ $t("shared.send") }}</div>
                  <div class="loading" role="status" v-if="disabled">
                    {{ $t("footer.sending") }}

                    <div class="spinner-small-white" v-if="disabled"></div>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-5">
          <div class="img-box-login">
            <img :src="loginImg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import axios from "axios";
export default {
  data() {
    return {
      loginImg: require("../../assets/imgs/6310507 1.png"),
      disabled: false,
      selectedCountry: {
        key: "+966",
        code: "AU",
        image: require("../../assets/imgs/saudi.png"),
      },
      countries: [],
      message: null,
      phone: null,
      userName: null,
    };
  },
  components: { Dropdown },
  methods: {
    async getCountries() {
      await axios.get("/countries/keys").then((response) => {
        this.countries = response.data.data;
      });
    },

    async submitContact() {
      this.disabled = true;
      const fd = new FormData(this.$refs.complainForm);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("type", "complaint");

      await axios
        .post("/cotact-us", fd)
        .then((response) => {
          if (response.data.key == "success") {
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
            this.phone = null;
            this.userName = null;
            this.message = null;
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
    this.getCountries();
  },
};
</script>

<style></style>

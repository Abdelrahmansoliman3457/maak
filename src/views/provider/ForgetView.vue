<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("shared.Forgotpass") }}</span>
      </div>
      <div class="row mb-5 align-items-center">
        <div class="col-md-7 col-12 mb-4">
          <form action="" @submit.prevent="sendNum" ref="sendPhone">
            <div class="login-box">
              <h5 class="font-bold mb-3">{{ $t("shared.Forgotpass") }}</h5>
              <p class="gray-col mb-4 font14">
                {{ $t("modals.phonePassphase") }}
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

              <div class="flex-group-me login-inputs mb-3">
                <button type="submit" class="btn-login up">
                  <div v-if="!disabled">{{ $t("footer.send") }}</div>
                  <div class="loading" role="status" v-if="disabled">
                    {{ $t("footer.sending") }}
                    <div class="spinner-small-white" v-if="disabled"></div>
                  </div>
                </button>
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
      loginImg: require("../../assets/imgs/63105e071.png"),
      phone: "",
      disabled: false,
      device_id: "111",
      device_type: "web",
      type: "reset_password",
      selectedCountry: {
        key: "+966",
        code: "SA",
        image: require("../../assets/imgs/saudi.png"),
      },
      countries: [],
    };
  },

  components: {Dropdown},
  methods: {
    async getCountries() {
      await axios.get("/countries/keys").then((response) => {
        this.countries = response.data.data;
      });
    },
    async sendNum() {
      this.disabled = true;
      const fd = new FormData(this.$refs.sendPhone);
      fd.append("phone", this.phone);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("type", this.type);
      fd.append("device_type", this.device_type);
      fd.append("device_id", localStorage.getItem("fcmtocken"));

      await axios
        .post(
          `/provider/password/reset/send-code`,
          fd
        )
        .then((response) => {
          console.log(response);
          if (response.data.key == "success") {
            localStorage.setItem("phone", this.phone);
            localStorage.setItem("country_code", this.selectedCountry.key);
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });

            this.$router.push("/confirmPass");
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
    this.getCountries()
  },
};
</script>

<style></style>

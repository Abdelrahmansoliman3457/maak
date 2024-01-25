<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("shared.Forgotpass") }}</span>
      </div>
      <div class="row mb-5 align-items-center">
        <div class="col-md-7 col-12 mb-4">
          <form action="" @submit.prevent="changePassword" ref="passForm">
            <div class="login-box">
              <h5 class="font-bold mb-3">{{ $t("modals.resetPass") }}</h5>
              <p class="gray-col mb-5 font14">
                {{ $t("modals.resetPassphase") }}
              </p>
              <div class="main-input-cont login-inputs mb-4">
                <h6 class="mb-2 font14">{{ $t("modals.newPass") }}</h6>
                <input
                  type="password"
                  class="main-input"
                  :placeholder="$t('modals.newPassplace')"
                  name="password"
                />
                <div class="abs-icon-right">
                  <font-awesome-icon :icon="['fas', 'lock']" />
                </div>
              </div>
              <div class="main-input-cont login-inputs mb-5">
                <h6 class="mb-2 font14">{{ $t("modals.newPassconfirm") }}</h6>
                <input
                  type="password"
                  class="main-input"
                  :placeholder="$t('modals.newPassconfirmplace')"
                  name="password_confirmation"
                />
                <div class="abs-icon-right">
                  <font-awesome-icon :icon="['fas', 'lock']" />
                </div>
              </div>

              <div class="flex-group-me login-inputs mb-3">
                <button type="submit" :disabled="disabled" class="btn-login up">
                  <div v-if="!disabled">{{ $t("shared.save") }}</div>
                  <div class="loading" role="status" v-if="disabled">
                    {{ $t("shared.saving") }}
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
export default {
  data() {
    return {
      loginImg: require("../../assets/imgs/63105e071.png"),
      device_id: "111",
      device_type: "web",
      disabled: false,
    };
  },

  components: {},
  methods: {
    async changePassword() {
      this.disabled = true;
      const fd = new FormData(this.$refs.passForm);
      fd.append("country_code", localStorage.getItem("country_code"));
      fd.append("phone", localStorage.getItem("phone"));
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);

      await axios
        .post("/provider/reset/password", fd)
        .then((response) => {
          if (response.data.key == "success") {
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
            this.$router.push("/providerLogin");
            // localStorage.clear();
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
  mounted() {},
};
</script>

<style></style>

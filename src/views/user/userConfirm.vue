<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{$t("nav.Home") }} - {{ $t("shared.regNewUser") }} -
        <span class="color-main">{{ $t("shared.keycode") }}</span>
      </div>
      <div class="row mb-5 align-items-center">
        <div class="col-md-7 col-12 mb-4">
          <form action="" @submit.prevent="sendCode">
            <div class="login-box">
              <h5 class="font-bold mb-3">{{ $t("shared.keycode") }}</h5>
              <p class="gray-col mb-4">
                {{ $t("shared.keycodePhase") }}
              </p>
              <div class="flex-group-me mb-4">
                <img :src="imgCode" class="keycode-img" alt="img" />
              </div>
              <div class="code-container mb-4">
                <v-otp-input
                  ref="otpInput"
                  input-classes="otp-input"
                  separator=" "
                  :num-inputs="5"
                  :should-auto-focus="true"
                  name="otpInput"
                  :is-input-num="true"
                />
              </div>
              <div class="flex-group-me mb-3">
                <button type="submit" :disabled="disabled" class="btn-login up">
                  <div v-if="!disabled">{{ $t("shared.varifay") }}</div>
                  <div class="loading" role="status" v-if="disabled">
                    {{ $t("shared.varifing") }}
                    <div class="spinner-small-white" v-if="disabled"></div>
                  </div>
                </button>
              </div>
              <div class="flex-group-me mb-3 font14">
                <div class="have-you gray-col">
                  {{ $t("shared.notSend") }}
                  <button class="resend-btn" :disabled="disabledBtn" @click="resendCode" type="button">
                    <div v-if="!disabledBtn">{{ $t("shared.resend") }}</div>
                    <div class="loading" role="status" v-if="disabledBtn">
                      {{ $t("footer.sending") }}...
                    </div>
                  </button>
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
// Import in a Vue component
import VOtpInput from "vue3-otp-input";

export default {
  data() {
    return {
      loginImg: require("../../assets/imgs/6310507 1.png"),
      imgCode: require("../../assets/imgs/keyCode.png"),
      device_id: "111",
      device_type: "web",
      type: "active",
      disabled: false,
      disabledBtn: false,
    };
  },

  components: {
    VOtpInput,
  },
  methods: {
    async sendCode() {
      let otpString = JSON.stringify(this.$refs.otpInput.otp.join(""));
      let otpsNumber = JSON.parse(otpString);
      this.disabled = true;
      const fd = new FormData();
      fd.append("country_code", localStorage.getItem("country_code"));
      fd.append("phone", localStorage.getItem("phone"));
      fd.append("code", otpsNumber);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);
      fd.append("type", this.type);
      fd.append("user_name", localStorage.getItem("name"));

      await axios
        .post("/user/active/account", fd)
        .then((response) => {
          if (response.data.key == "success") {
            console.log(response.data);
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("visitor", "user");
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
        })
        .catch((err) => {
          console.log(err);
        });
        document.querySelector('.otp-input').focus()
    },
    async resendCode() {
      this.disabledBtn = true;
      const fd = new FormData();
      fd.append("country_code", localStorage.getItem("country_code"));
      fd.append("phone", localStorage.getItem("phone"));
      fd.append("type", "active");
      fd.append("device_id", localStorage.getItem("fcmtocken"));

      await axios
        .post("/user/code/send", fd)
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
          this.disabledBtn = false;
          document.querySelector('.otp-input').focus()
        });
    },
  },
};
</script>

<style></style>

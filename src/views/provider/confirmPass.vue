<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main"> {{ $t("shared.Forgotpass") }}</span>
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
                  v-modal="otpInput"
                  name="otpInput"
                  :is-input-num="true"
                  @on-change="handleOnChange"
                  @on-complete="handleOnComplete"
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
              <!-- <div class="flex-group-me mb-3 font14">
                  <div class="have-you gray-col">
                    لم تستلم الكود؟
                    <button
                      class="resend-btn"
                      :disabled="disabledBtn"
                      @click="resendCode"
                      type="button"
                    >
                      <div v-if="!disabledBtn">اعد ارسال</div>
                      <div class="loading" role="status" v-if="disabledBtn">
                        جاري الارسال...
                      </div>
                    </button>
                  </div>
                </div> -->
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
      successImg2: require("../../assets/imgs/succ.png"),
      device_id: "111",
      device_type: "web",
      otpInput: null,
      disabled: false,
      disabledBtn: false,
      type: "reset_password",
    };
  },

  components: {
    VOtpInput,
  },

  setup() {
    const otpInput = null;

    const handleOnComplete = (value) => {
      console.log("OTP completed: ", value);
    };

    const handleOnChange = (value) => {
      console.log("OTP changed: ", value);
    };

    return { handleOnComplete, handleOnChange, otpInput };
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
      fd.append("device_id", localStorage.getItem("fcmtocken"));
      fd.append("device_type", this.device_type);
      fd.append("type", this.type);

      await axios
        .post("/provider/password/reset/verify-code", fd)
        .then((response) => {
          if (response.data.key == "success") {
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 3000,
            });
            this.$router.push("/resetPassword");
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
      document.querySelector(".otp-input").focus();
    },
    //   async resendCode() {
    //     this.disabledBtn = true;
    //     const fd = new FormData();
    //     fd.append("country_code", localStorage.getItem("country_code"));
    //     fd.append("phone", localStorage.getItem("phone"));

    //     await axios.post("/provider/code/send", fd).then((response) => {
    //       if (response.data.key == "success") {
    //         this.$toast.add({
    //           severity: "success",
    //           detail: `${response.data.msg}`,
    //           life: 3000,
    //         });
    //       } else {
    //         this.$toast.add({
    //           severity: "error",
    //           detail: `${response.data.msg}`,
    //           life: 3000,
    //         });
    //       }
    //       this.disabledBtn = false;
    //       document.querySelector(".otp-input").focus();
    //     });
    //   },
  },
};
</script>

<style></style>

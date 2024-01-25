<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("nav.profile") }}</span>
      </div>
      <div class="row mb-5 align-items-center">
        <div class="col-md-7 col-12 mb-4">
          <form action="" @submit.prevent="updateProfile" ref="updateForm">
            <div class="login-box no-border">
              <h5 class="font-bold mb-3">{{ $t("nav.profile") }}</h5>
              <p class="gray-col mb-4">
                {{ $t("shared.profilePhase") }}
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
                  type="email"
                  class="main-input"
                  :placeholder="$t('footer.emailPlacereg')"
                  name="email"
                  v-model="email"
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
                  data-bs-target="#phoneShow"
                  data-bs-toggle="modal"
                  readonly
                  :placeholder="$t('shared.phoneplace')"
                  name="phone"
                  v-model="phone"
                />
                <div class="drop-countries readonly-show">
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
                          style="width: 18px"
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
                          style="width: 18px"
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
            <div class="flex-group-me login-inputs mb-3 mt-4">
              <button type="submit" :disabled="disabled" class="btn-login up">
                <div v-if="!disabled">{{ $t("shared.save") }}</div>
                <div class="loading" role="status" v-if="disabled">
                  {{ $t("shared.saving") }}
                  <div class="spinner-small-white" v-if="disabled"></div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!--success edit profile modal-->
  <input
    type="text"
    class="successEditProfile"
    data-bs-target="#successEditProfile"
    data-bs-toggle="modal"
    hidden
  />
  <div
    class="modal fade"
    id="successEditProfile"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn saved"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="successImg2" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5">{{ $t("modals.doneSave") }}</div>
      </div>
    </div>
  </div>

  <!--old phone modal-->
  <div
    class="modal fade"
    id="phoneShow"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-def-w modal-dialog-centered">
      <div class="modal-content spe-pad">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-3 font-bold">
          {{ $t("modals.oldphone") }}
        </h5>
        <p class="gray-col font14 text-center mb-4">
          {{ $t("modals.phonePhase") }}
        </p>
        <form action="" ref="OldPhone" @submit.prevent="checkOldPhone">
          <div class="main-input-cont tel-input-me mb-4">
            <h6 class="mb-2 font14">{{ $t("modals.oldphone") }}</h6>
            <input
              type="number"
              class="main-input"
              readonly
              :placeholder="$t('shared.phoneplace')"
              name="phone"
              v-model="phone"
            />
            <div class="drop-countries readonly-show">
              <Dropdown
                v-model="selectedCountryEdit"
                :options="countriesEdit"
                optionLabel="name"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex-group-me">
                    <img
                      :alt="slotProps.value.label"
                      :src="slotProps.value.image"
                      :class="`mr-2 flag flag-${slotProps.value.key.toLowerCase()}`"
                      style="width: 18px"
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
                      style="width: 18px"
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

          <div class="flex-group-me mb-4">
            <button
              type="submit"
              :disabled="disabledPhone"
              class="btn-login up"
            >
              <div v-if="!disabledPhone">{{ $t("footer.send") }}</div>
              <div class="loading" role="status" v-if="disabledPhone">
                {{ $t("footer.sending") }}
                <div class="spinner-small-white" v-if="disabledPhone"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!--keycode modal-->
  <input
    type="text"
    class="openKeycode"
    data-bs-target="#openKeycode"
    data-bs-toggle="modal"
    hidden
  />
  <div
    class="modal fade"
    id="openKeycode"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-def-w modal-dialog-centered">
      <div class="modal-content spe-pad">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <form action="" class="text-center" @submit.prevent="sendCode">
          <h5 class="font-bold mb-3 mt-4">{{ $t("shared.keycode") }}</h5>
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
          <div class="flex-group-me mt-4 mb-4">
            <button type="submit" class="btn-login up">
              <div v-if="!disabledCode">{{ $t("shared.varifay") }}</div>
              <div class="loading" role="status" v-if="disabledCode">
                {{ $t("shared.varifing") }}...
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!--new phone modal-->
  <div
    class="modal fade"
    id="newphoneShow"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-def-w modal-dialog-centered">
      <div class="modal-content spe-pad">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-3 font-bold">
          {{ $t("modals.newPhone") }}
        </h5>
        <p class="gray-col font14 text-center mb-4">
          {{ $t("modals.newPhonePhase") }}
        </p>
        <form action="" ref="NewPhone" @submit.prevent="sendNewPhone">
          <div class="main-input-cont tel-input-me mb-4">
            <h6 class="mb-2 font14">{{ $t("modals.newPhone") }}</h6>
            <input
              type="number"
              class="main-input"
              :placeholder="$t('modals.newPhonePlace')"
              name="new_phone"
            />
            <div class="drop-countries">
              <Dropdown
                v-model="selectedCountryNew"
                :options="countriesNew"
                optionLabel="name"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex-group-me">
                    <img
                      :alt="slotProps.value.label"
                      :src="slotProps.value.image"
                      :class="`mr-2 flag flag-${slotProps.value.key.toLowerCase()}`"
                      style="width: 18px"
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
                      style="width: 18px"
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

          <div class="flex-group-me mb-4">
            <button
              type="submit"
              :disabled="disabledPhone"
              class="btn-login up"
            >
              <div v-if="!disabledPhone">{{ $t("footer.send") }}</div>
              <div class="loading" role="status" v-if="disabledPhone">
                {{ $t("footer.sending") }}
                <div class="spinner-small-white" v-if="disabledPhone"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <input
    type="text"
    class="newPhoneModal"
    data-bs-target="#newphoneShow"
    data-bs-toggle="modal"
    hidden
  />
  <!-- success phone changed modal-->
  <div
    class="modal fade"
    id="doneChanged"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closedonePhoneuser"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="successImg2" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5">
          {{ $t("modals.successChangePhone") }}
        </div>
      </div>
    </div>
  </div>
  <input
    type="text"
    class="doneChanged"
    data-bs-target="#doneChanged"
    data-bs-toggle="modal"
    hidden
  />
</template>

<script>
import axios from "axios";
import Dropdown from "primevue/dropdown";
// Import in a Vue component
import VOtpInput from "vue3-otp-input";
export default {
  data() {
    return {
      loginImg: require("../../assets/imgs/6310507 1.png"),
      successImg2: require("../../assets/imgs/succ.png"),
      imgCode: require("../../assets/imgs/keyCode.png"),
      imgDef: require("../../assets/imgs/saudi.png"),
      phone: "",
      name: "",
      email: "",
      country: null,
      disabled: false,
      device_id: "111",
      device_type: "web",
      selectedCountry: {
        key: "+966",
        code: "AU",
        image: "/img/6310507 1.d078314d.png",
      },
      countries: [],
      selectedCountryEdit: {
        key: "+966",
        code: "AU",
        image: "/img/6310507 1.d078314d.png",
      },
      countriesEdit: [],
      selectedCountryNew: {
        key: "+966",
        code: "AU",
        image: require("../../assets/imgs/saudi.png"),
      },
      countriesNew: [],
      type: "change_phone",
      disabledPhone: false,
      disabledKeyCode: false,
      disabledCode: false,
    };
  },
  components: { Dropdown, VOtpInput },
  methods: {
    async getProfileData() {
      await axios
        .post("/user/show-profile", "", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.name = response.data.data.user_name;
          this.phone = response.data.data.phone;
          this.email = response.data.data.email;
          this.selectedCountry.key = response.data.data.country_code;
          this.selectedCountry.image = localStorage.getItem("country_img");
          this.selectedCountryEdit.key = response.data.data.country_code;
          this.selectedCountryEdit.image = localStorage.getItem("country_img");
          this.selectedCountryNew.key = response.data.data.country_code;
          this.selectedCountryNew.image = localStorage.getItem("country_img");
        });
    },
    async getCountries() {
      await axios.get("/countries/keys").then((response) => {
        this.countries = response.data.data;
        this.countriesEdit = response.data.data;
        this.countriesNew = response.data.data;
      });
    },

    async updateProfile() {
      this.disabled = true;
      const fd = new FormData(this.$refs.updateForm);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);

      await axios
        .post("/user/update/profile", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.key == "success") {
            localStorage.setItem("phone", this.phone);
            localStorage.setItem("country_code", this.selectedCountry.key);

            localStorage.setItem("token", response.data.data.token);

            document.querySelector(".successEditProfile").click();
            setTimeout(function () {
              document.querySelector(".close-model-btn.saved").click();
            }, 2000);
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

    async checkOldPhone() {
      this.disabledPhone = true;
      const fd = new FormData(this.$refs.OldPhone);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("type", this.type);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);
      fd.append("user_name", localStorage.getItem("name"));

      await axios
        .post("/user/phone/change/send/code", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".openKeycode").click();
            localStorage.setItem("activated", "false");
            setTimeout(function () {
              document.querySelector(".otp-input").focus();
            }, 500);
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
          this.disabledPhone = false;
        });
    },

    async sendCode() {
      let otpString = JSON.stringify(this.$refs.otpInput.otp.join(""));
      let otpsNumber = JSON.parse(otpString);
      this.disabledCode = true;
      const fd = new FormData();
      fd.append("country_code", localStorage.getItem("country_code"));
      fd.append("phone", localStorage.getItem("phone"));
      fd.append("code", otpsNumber);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);
      fd.append("type", this.type);
      fd.append("user_name", localStorage.getItem("name"));

      await axios
        .post("/user/verify/code", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            if (localStorage.getItem("activated") == "false") {
              document.querySelector(".newPhoneModal").click();
            } else {
              this.$router.push("/userLogin");
              // localStorage.clear();
              localStorage.removeItem("visitor");
              localStorage.removeItem("token");
              document.querySelector(".doneChanged").click();
              setTimeout(function () {
                document.querySelector(".closedonePhoneuser").click();
              }, 2000);
            }

            localStorage.setItem("activated", "true");
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
          this.disabledCode = false;
        })
        .catch((err) => {
          console.log(err);
        });
      document.querySelector(".otp-input").focus();
    },

    async sendNewPhone() {
      this.disabledPhone = true;
      const fd = new FormData(this.$refs.NewPhone);
      fd.append("country_code", this.selectedCountryNew.key);
      fd.append("type", this.type);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);
      fd.append("user_name", this.name);
      fd.append("phone", this.phone);

      await axios
        .post("/user/phone/change", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".openKeycode").click();
            this.$refs.otpInput.clearInput();
            setTimeout(function () {
              document.querySelector(".otp-input").focus();
            }, 500);
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
          this.disabledPhone = false;
        });
    },
  },
  mounted() {
    this.getProfileData();
    this.getCountries();
  },
};
</script>

<style></style>

<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("nav.profile") }}</span>
      </div>
      <h5 class="font-bold mb-3">{{ $t("nav.profile") }}</h5>
      <div class="row mb-5 align-items-center">
        <div class="col-md-10 col-12 mb-4">
          <form action="" @submit.prevent="updateProfile" ref="updateForm">
            <div class="login-box">
              <label for="img-up" class="img-profile-pro mb-4">
                <img
                  ref="editAvatar"
                  class="prov-img"
                  :class="{ fullwidimg: !loading }"
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
                      data-bs-target="#changePhoneModal"
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
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
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
                  <div class="main-input-cont mb-4 edit-sele">
                    <h6 class="mb-2 font14">
                      {{ $t("shared.Selectsection") }}
                    </h6>
                    <Dropdown
                      v-model="selectedDepart"
                      :options="Departs"
                      optionLabel="name"
                      :placeholder="selectedcatPlace"
                      class="main-select"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['far', 'clipboard']" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-group-me yes-wrap mt-4 mb-3">
              <button
                type="button"
                data-bs-target="#phoneSet"
                data-bs-toggle="modal"
                class="main-btn xl up bg-gray"
              >
                {{ $t("shared.pass") }}
              </button>
              <button type="submit" :disabled="disabled" class="main-btn xl up">
                <div v-if="!disabled">{{ $t("shared.save") }}</div>
                <div class="loading" role="status" v-if="disabled">
                  {{ $t("shared.saving") }}
                  <div class="spinner-small-white" v-if="disabled"></div>
                </div>
              </button>
              <router-link to="/bankView" class="main-btn xl up bg-green">
                {{ $t("shared.bankbtn") }}
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!--modals for change phone-->
  <!--phone change modal-->
  <div
    class="modal fade"
    id="changePhoneModal"
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
        <form action="" @submit.prevent="sendNumChange" ref="sendPhoneChange">
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
                v-model="selectedCountrypass"
                :options="countriesPass"
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

          <div class="flex-group-me mb-4">
            <button type="submit" class="btn-login up">
              <div v-if="!disabled">{{ $t("footer.send") }}</div>
              <div class="loading" role="status" v-if="disabled">
                {{ $t("footer.sending") }}
                <div class="spinner-small-white" v-if="disabled"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--keycode modal-->
  <div
    class="modal fade"
    id="keyCodePhoneChange"
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
        <form action="" class="text-center" @submit.prevent="sendCodeChange">
          <h5 class="font-bold mb-3 mt-4">{{ $t("shared.keycode") }}</h5>
          <p class="gray-col mb-4">
            {{ $t("shared.keycodePhase") }}
          </p>
          <div class="flex-group-me mb-4">
            <img :src="imgCode" class="keycode-img" alt="img" />
          </div>
          <div class="code-container mb-4">
            <v-otp-input
              ref="otpInput2"
              input-classes="otp-input"
              separator=" "
              :num-inputs="5"
              :should-auto-focus="true"
              name="otpInput"
              :is-input-num="true"
            />
          </div>
          <div class="flex-group-me mb-4">
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
  <input
    type="text"
    hidden
    data-bs-target="#keyCodePhoneChange"
    data-bs-toggle="modal"
    class="keyCodePhoneChange"
  />
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
    hidden
    data-bs-target="#newphoneShow"
    data-bs-toggle="modal"
    class="newphoneShow"
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
          class="close-model-btn closedonePhone"
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

  <!--end modals for change phone-->

  <!--phone modal-->
  <div
    class="modal fade"
    id="phoneSet"
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
          {{ $t("shared.Forgotpass") }}
        </h5>
        <p class="gray-col font14 text-center mb-4">
          {{ $t("modals.phonePassphase") }}
        </p>
        <form action="" @submit.prevent="sendNum" ref="sendPhone">
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
                v-model="selectedCountrypass"
                :options="countriesPass"
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

          <div class="flex-group-me mb-4">
            <button type="submit" class="btn-login up">
              <div v-if="!disabled">{{ $t("footer.send") }}</div>
              <div class="loading" role="status" v-if="disabled">
                {{ $t("footer.sending") }}
                <div class="spinner-small-white" v-if="disabled"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!--keycode modal-->
  <div
    class="modal fade"
    id="keycode-modal"
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
              input-classes="otp-inputspe"
              separator=" "
              :num-inputs="5"
              :should-auto-focus="true"
              name="otpInput"
              :is-input-num="true"
            />
          </div>
          <div class="flex-group-me mb-4">
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
  <input
    type="text"
    hidden
    data-bs-target="#keycode-modal"
    data-bs-toggle="modal"
    class="keyCodePhone"
  />
  <!--pass modal-->
  <div
    class="modal fade"
    id="pass-modal"
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
        <form @submit.prevent="updatePass" ref="updatePass">
          <h5 class="font-bold mb-3 mt-4 text-center">
            {{ $t("modals.resetPass") }}
          </h5>
          <p class="gray-col mb-4 font14 text-center">
            {{ $t("modals.resetPassphase") }}
          </p>
          <div class="main-input-cont mb-4">
            <h6 class="mb-2 font14">{{ $t("modals.curentPass") }}</h6>
            <input
              type="password"
              class="main-input"
              :placeholder="$t('modals.currentPassplace')"
              name="old_password"
            />
            <div class="abs-icon-right">
              <font-awesome-icon :icon="['fas', 'lock']" />
            </div>
          </div>
          <div class="main-input-cont mb-4">
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
          <div class="main-input-cont mb-5">
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

          <div class="flex-group-me mb-4">
            <button type="submit" class="btn-login up" :disabled="disabledCode">
              <div v-if="!disabledCode">{{ $t("shared.save") }}</div>
              <div class="loading" role="status" v-if="disabledCode">
                {{ $t("shared.saving") }}
                <div class="spinner-small-white" v-if="disabledCode"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <input
    type="text"
    hidden
    data-bs-target="#pass-modal"
    data-bs-toggle="modal"
    class="passwordPhone"
  />

  <!--success update pass modal-->
  <div
    class="modal fade"
    id="updatePass"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn closedonepass"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="successImg2" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5">
          {{ $t("modals.danePassChange") }}
        </div>
      </div>
    </div>
  </div>
  <input
    type="text"
    hidden
    data-bs-target="#updatePass"
    data-bs-toggle="modal"
    class="passwordupdate"
  />
</template>

<script>
import axios from "axios";
// Import in a Vue component
import VOtpInput from "vue3-otp-input";

import Dropdown from "primevue/dropdown";
export default {
  data() {
    return {
      imgCode: require("../../assets/imgs/keyCode.png"),
      loginImg: require("../../assets/imgs/6310507 1.png"),
      edit_avatar: require("../../assets/imgs/prov-instead.png"),
      successImg2: require("../../assets/imgs/succ.png"),
      selectedCity: null,
      cities: [],
      selectedDepart: null,
      Departs: [],
      phone: "",
      is_conditions: false,
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
      selectedCountrypass: {
        key: "+966",
        code: "AU",
        image: require("../../assets/imgs/saudi.png"),
      },
      countriesPass: [],
      type: "change_phone",
      disabledPhone: false,
      disabledKeyCode: false,
      disabledCode: false,
      email: "",
      name: "",
      loading: false,
      selectedcatPlace: "",
    };
  },
  components: { Dropdown, VOtpInput },

  methods: {
    // update profile
    async updateProfile() {
      this.disabled = true;
      const fd = new FormData(this.$refs.updateForm);
      fd.append("country_code", Number(this.selectedCountry.key));

      fd.append("city_id", this.selectedCity.id);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);
      if (this.selectedDepart.id) {
        fd.append("section_id", this.selectedDepart.id);
      }

      await axios
        .post("/provider/update/profile", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            localStorage.setItem("token", response.data.data.token);
            console.log(response.data.data.section);
            if (response.data.data.section.id == 1) {
              localStorage.setItem("providerShow", "freelancer");
            } else if (response.data.data.section.id == 2) {
              localStorage.setItem("providerShow", "storeOwner");
            } else if (!response.data.data.section.id) {
              localStorage.setItem("providerShow", "bothProviders");
            }
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
        });
    },
    // change phone code
    async sendNumChange() {
      this.disabled = true;
      const fd = new FormData(this.$refs.sendPhoneChange);
      fd.append("phone", this.phone);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);
      fd.append("type", "change_phone");

      await axios
        .post(`/provider/phone/change/send/code`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".keyCodePhoneChange").click();
            localStorage.setItem("phone", this.phone);
            localStorage.setItem("country_code", this.selectedCountry.key);
            localStorage.setItem("activated", "false");

            setTimeout(function () {
              document.querySelector(".otp-input").focus();
            }, 500);
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
        });
    },
    async sendCodeChange() {
      let otpString2 = JSON.stringify(this.$refs.otpInput2.otp.join(""));
      let otpsNumber2 = JSON.parse(otpString2);
      this.disabledCode = true;
      const fd = new FormData();
      fd.append("country_code", localStorage.getItem("country_code"));
      fd.append("phone", localStorage.getItem("phone"));
      fd.append("code", otpsNumber2);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);
      fd.append("type", "change_phone");

      await axios
        .post("/provider/verify/code", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            if (localStorage.getItem("activated") == "false") {
              document.querySelector(".newphoneShow").click();
            } else {
              this.$router.push("/providerLogin");
              // localStorage.clear();
              localStorage.removeItem("visitor");
              localStorage.removeItem("token");
              document.querySelector(".doneChanged").click();
              setTimeout(function () {
                document.querySelector(".closedonePhone").click();
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
        .post("/provider/phone/change", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".keyCodePhoneChange").click();
            this.$refs.otpInput2.clearInput();
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
    // end change phone code
    async getSections() {
      await axios.get("/app/sections").then((response) => {
        this.Departs = response.data.data;
        this.Departs.push({ name: this.$t("shared.bothproviders") });
      });
    },
    async getProfileData() {
      this.loading = true;
      await axios
        .post("/provider/profile", "", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.name = response.data.data.name;
          this.phone = response.data.data.phone;
          this.email = response.data.data.email;
          this.selectedCity = response.data.data.city;
          this.selectedDepart = response.data.data.section;
          this.selectedcatPlace = response.data.data.section.name;
          if (!response.data.data.section.id) {
            this.selectedcatPlace =  this.$t("shared.bothproviders") ;
          }
          this.edit_avatar = response.data.data.image;
          this.selectedCountry.key = response.data.data.country_code;
          this.selectedCountry.image = localStorage.getItem("country_img");
          this.selectedCountryEdit.key = response.data.data.country_code;
          this.selectedCountryEdit.image = localStorage.getItem("country_img");
          this.selectedCountrypass.image = localStorage.getItem("country_img");
          this.selectedCountrypass.key = response.data.data.country_code;
          this.selectedCountryNew.image = localStorage.getItem("country_img");
          this.selectedCountryNew.key = response.data.data.country_code;
        });
      this.loading = false;
    },

    async getCountries() {
      await axios.get("/countries/keys").then((response) => {
        this.countries = response.data.data;
        this.countriesEdit = response.data.data;
        this.countriesNew = response.data.data;
        this.countriesPass = response.data.data;
      });
    },
    async getCities() {
      await axios.get("/cities").then((response) => {
        this.cities = response.data.data;
      });
    },
    async sendNum() {
      this.disabled = true;
      const fd = new FormData(this.$refs.sendPhone);
      fd.append("phone", this.phone);
      fd.append("country_code", this.selectedCountry.key);
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);
      fd.append("type", "change_password");

      await axios
        .post(`/provider/password/change/send-code`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".keyCodePhone").click();
            localStorage.setItem("phone", this.phone);
            localStorage.setItem("country_code", this.selectedCountry.key);

            setTimeout(function () {
              document.querySelector(".otp-inputspe").focus();
            }, 500);
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
      fd.append("type", "change_password");

      await axios
        .post("/provider/password/change/verify-code", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".passwordPhone").click();
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
    async updatePass() {
      this.disabledCode = true;
      const fd = new FormData(this.$refs.updatePass);
      fd.append("country_code", localStorage.getItem("country_code"));
      fd.append("phone", localStorage.getItem("phone"));
      fd.append("device_id", this.device_id);
      fd.append("device_type", this.device_type);

      await axios
        .post("/provider/password/update", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".passwordupdate").click();
            this.$router.push("/providerLogin");
            // localStorage.clear();
            localStorage.removeItem("visitor");
            localStorage.removeItem("token");
            setTimeout(function () {
              document.querySelector(".closedonepass").click();
            }, 2000);
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
    this.getProfileData();
    this.getCountries();
    this.getCities();
    this.getSections();
  },
};
</script>

<style></style>

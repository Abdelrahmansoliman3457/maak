<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} - {{ $t("nav.profile") }}  -
        <span class="color-main">{{ $t("shared.bankbtn") }}</span>
      </div>
      <div class="row">
        <div class="col-md-9 mb-4">
          <form action="" @submit.prevent="addBankInfo" ref="bank">
            <div class="cv-main-main">
              <div class="flex-bet-b-btm mb-2">
                <h5 class="font-bold">{{ $t("shared.bankbtn") }} :</h5>
              </div>
              <div class="row mt-4">
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.bankname") }}</h6>
                    <input
                      type="text"
                      class="main-input"
                      :placeholder="$t('shared.banknameplace')"
                      name="name"
                      v-model="name"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['fas', 'money-check']" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.bankholder") }}</h6>
                    <input
                      type="text"
                      class="main-input"
                      :placeholder="$t('shared.bankholderplace')"
                      name="user_name"
                      v-model="user_name"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['fas', 'money-check']" />
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.banknumber") }}</h6>
                    <input
                      type="number"
                      class="main-input"
                      :placeholder="$t('shared.banknumberplace')"
                      name="number"
                      v-model="number"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['fas', 'money-check']" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14"> {{ $t("shared.ibanNumber") }}</h6>
                    <input
                      type="text"
                      class="main-input"
                      :placeholder="$t('shared.ibanNumberplace')"
                      name="iban"
                      v-model="iban"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['fas', 'money-check']" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-group-me mt-4 mb-5">
              <button type="submit" class="main-btn up xl">
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      disabled: false,
      iban: "",
      name: "",
      user_name: "",
      number: "",
      type: "add"
    };
  },
  components: {},
  methods: {
    async gitBnakInfo() {
      this.loading = true;
      await axios
        .get("/provider/bank-account", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.data) {
            this.type = 'update'
            this.iban = response.data.data.bank_iban;
            this.user_name = response.data.data.bank_username;
            this.number = response.data.data.bank_account;
            this.name = response.data.data.bank_name;
          }
        });
      this.loading = false;
    },
    async addBankInfo() {
      this.disabled = true;
      const fd = new FormData(this.$refs.bank);
      await axios
        .post(`/provider/bank-account/${this.type}`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
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
          this.disabled = false;
        });
        this.gitBnakInfo()
    },
  },
  mounted() {
    this.gitBnakInfo();
  },
};
</script>

<style></style>

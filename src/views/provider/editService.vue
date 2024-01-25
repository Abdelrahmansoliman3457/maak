<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        الصفحة الرئيسية -
        <span class="color-main">الاعمال والسيرة الذاتية</span>
      </div>
      <div class="row">
        <div class="col-md-9 mb-4">
          <form action="" @submit.prevent="updateService" ref="newService">
            <div class="cv-main-main">
              <div class="flex-bet-b-btm mb-2">
                <h5 class="font-bold">الخدمات المضافة :</h5>
              </div>
              <div class="row mt-4">
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4 readonly-show edit-sele">
                    <h6 class="mb-2 font14">اختر خدماتك من الخدمات المضافة:</h6>
                    <Dropdown
                      v-model="selectedSevice"
                      @change="getSubServices"
                      :options="services"
                      optionLabel="name"
                      :placeholder="servicePlace"
                      class="main-select"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['far', 'clipboard']" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4 readonly-show edit-sele">
                    <h6 class="mb-2 font14">
                      اختر الخدمة الفرعبة من الخدمات المضافة:
                    </h6>
                    <Dropdown
                      v-model="selectedSubsevice"
                      :options="Subsevices"
                      optionLabel="name"
                      :placeholder="subServicePlace"
                      class="main-select"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['far', 'clipboard']" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">السعر</h6>
                    <input
                      type="number"
                      class="main-input no-right"
                      placeholder="برجاء ادخال السعر"
                      name="price"
                      v-model="price"
                    />
                    <div class="abs-icon-left">SR</div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">المدة</h6>
                    <input
                      type="text"
                      class="main-input no-right"
                      placeholder="برجاء ادخال المدة"
                      name="duration"
                      v-model="duration"
                    />
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
import Dropdown from "primevue/dropdown";
import axios from "axios";

export default {
  data() {
    return {
      selectedSevice: null,
      services: [],
      selectedSubsevice: null,
      Subsevices: [],
      bestImg: require("../../assets/imgs/user.jpg"),
      duration: "",
      price: "",
      disabled: false,
      servicePlace: "",
      subServicePlace: "",
    };
  },
  components: { Dropdown },
  methods: {
    async showService() {
      const fd = new FormData();
      fd.append("provider_service_id", this.$route.params.id);

      await axios
        .post("/provider/services/show", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.price = response.data.data.price;
          this.duration = response.data.data.duration;
          this.selectedSevice = response.data.data.category;
          this.selectedSubsevice = response.data.data.service;
          this.servicePlace = response.data.data.category.name;
          this.subServicePlace = response.data.data.service.name;
        });
    },
    async getServices() {
      await axios.get("/user/categories/service").then((response) => {
        this.services = response.data.data;
      });
    },
    async getSubServices() {
      await axios
        .get(`/user/categories/${this.selectedSevice.id}/services`)
        .then((response) => {
          this.Subsevices = response.data.data.services;
        });
    },
    async updateService() {
      this.disabled = true;
      const fd = new FormData(this.$refs.newService);
      fd.append("provider_service_id", this.$route.params.id);

      await axios
        .post("/provider/services/update", fd, {
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
    },
  },
  mounted() {
    this.getServices();
    this.showService();
  },
};
</script>

<style></style>

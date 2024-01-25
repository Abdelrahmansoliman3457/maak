<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        الصفحة الرئيسية -
        <span class="color-main">الاعمال والسيرة الذاتية</span>
      </div>
      <div class="step-order-cont mb-4 col-md-9 margin-auto">
        <ul class="nav nav-pills row" id="pills-tab" role="tablist">
          <div class="col-lg-6 col-md-6 col-6 mb-3-mob">
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active"
                id="pills-wait-tab"
                data-bs-toggle="pill"
                href="#pills-wait"
                role="tab"
                aria-controls="pills-wait"
                aria-selected="true"
              >
                السيرة الذاتية
              </a>
            </li>
          </div>
          <div class="col-lg-6 col-md-6 col-6 mb-3-mob">
            <li class="nav-item" role="presentation">
              <a
                class="nav-link click-after"
                id="pills-current-tab"
                data-bs-toggle="pill"
                href="#pills-current"
                role="tab"
                aria-controls="pills-current"
                aria-selected="false"
              >
                الاعمال
              </a>
            </li>
          </div>
        </ul>
      </div>
      <div class="tab-content mb-4" id="pills-tabContent">
        <!-- cv  -->
        <div
          class="tab-pane fade show active"
          id="pills-wait"
          role="tabpanel"
          aria-labelledby="pills-wait-tab"
        >
          <div class="row">
            <div class="col-md-8 mb-4">
              <div class="cv-main-main mb-4">
                <div class="flex-bet-b-btm mb-3">
                  <h5 class="font-bold">خدماتك المضافة التي تقدمها:</h5>
                </div>
                <template v-if="!loading">
                  <div class="loops-cvs" v-if="serArray.length > 0">
                    <div
                      v-for="(ser, i) in serArray"
                      :key="ser.id"
                      class="loop-addition"
                    >
                      <div class="flex-bet-main mb-2 no-wrap-main">
                        <div class="cv-type">
                          نوع الخدمة : <span>{{ ser.name }}</span>
                        </div>
                        <div class="flex-gap-sm">
                          <router-link
                            :to="{
                              name: 'editService',
                              params: { id: ser.id },
                            }"
                            class="edit-work"
                          >
                            <font-awesome-icon
                              :icon="['far', 'pen-to-square']"
                            />
                          </router-link>
                          <div class="remove-work" @click="deleteCv(ser.id, i)">
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                          </div>
                        </div>
                      </div>
                      <div class="flex-sm-gap mb-2">
                        <img :src="timeImg" class="sm-img-time" alt="" />
                        <div class="cv-type gray-col">
                          مدة العمل :
                          <span class="black-col-main">
                            {{ ser.duration }}
                          </span>
                        </div>
                      </div>
                      <div class="flex-sm-gap mb-2">
                        <img :src="priceImg" class="sm-img-time" alt="" />
                        <div class="cv-type gray-col">
                          سعر العمل :
                          <span class="black-col-main"
                            >{{ ser.price }} ريال</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="nont-found-div">
                    لا يوجد خدمات حتى الان
                  </div>
                </template>
                <template v-else>
                  <div class="loop-addition">
                    <div class="flex-no-align">
                      <div class="left-best">
                        <div class="flex-bet-main mb-4 no-wrap-main">
                          <div class="right-sm-best">
                            <Skeleton width="13rem" height="1rem"></Skeleton>
                          </div>
                          <div class="flex-gap-sm">
                            <Skeleton
                              shape="circle"
                              size="2rem"
                              class="mr-2"
                            ></Skeleton>
                            <Skeleton
                              shape="circle"
                              size="2rem"
                              class="mr-2"
                            ></Skeleton>
                          </div>
                        </div>
                        <div class="flex-bet-main">
                          <div class="price-num gray-col">
                            <Skeleton
                              width="8rem"
                              class="mb-2"
                              height="1rem"
                            ></Skeleton>
                            <Skeleton width="8rem" height="1rem"></Skeleton>
                          </div>
                          <!-- <Skeleton width="4rem" height="2rem"></Skeleton> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <form action="" @submit.prevent="addNewService" ref="newService">
                <div class="cv-main-main">
                  <div class="flex-bet-b-btm mb-2">
                    <h5 class="font-bold">اضافة خدمات جديدة:</h5>
                    <!-- <router-link to="/" class="edit-work blue-bg-add up">
                      <font-awesome-icon :icon="['fas', 'plus']" />
                    </router-link> -->
                  </div>
                  <div class="row mt-4">
                    <div class="col-md-6 col-12">
                      <div class="main-input-cont mb-4">
                        <h6 class="mb-2 font14">
                          اختر خدماتك من الخدمات المضافة:
                        </h6>
                        <Dropdown
                          v-model="selectedSevice"
                          @change="getSubServices"
                          :options="services"
                          optionLabel="name"
                          placeholder="برجاء ادخال الخدمة"
                          class="main-select"
                        />
                        <div class="abs-icon-right">
                          <font-awesome-icon :icon="['far', 'clipboard']" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-12">
                      <div class="main-input-cont mb-4">
                        <h6 class="mb-2 font14">
                          اختر الخدمة الفرعية من الخدمات المضافة:
                        </h6>
                        <Dropdown
                          v-model="selectedSubsevice"
                          :options="Subsevices"
                          optionLabel="name"
                          placeholder="برجاء ادخال الخدمة"
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
                          v-model="priceinp"
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
                          placeholder="برجاء ادخال المدة "
                          name="duration"
                          v-model="durationMain"
                        />
                      </div>
                    </div>

                    <!-- <div class="flex-group-me">
                      <button type="button" class="edit-work blue-bg-add up">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                      </button>
                      <div class="add-text">اضافة خدمة فرعية اخرى</div>
                    </div> -->
                  </div>
                </div>
                <div class="flex-group-me mt-4">
                  <button
                    type="submit"
                    :disabled="disabled"
                    class="main-btn up xl"
                  >
                    <div v-if="!disabled">حفظ</div>
                    <div class="loading" role="status" v-if="disabled">
                      {{ $t("shared.saving") }}
                      <div class="spinner-small-white" v-if="disabled"></div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
            <div class="col-md-4 mb-4">
              <keep-alive>
                <form action="" @submit.prevent="addCV" ref="experience">
                  <div class="cv-main-main mb-3">
                    <div class="flex-bet-b-btm mb-2">
                      <div class="cv-type">
                        <h5 class="font-bold">السيرة الذاتية</h5>
                      </div>
                    </div>
                    <div class="main-input-cont mb-4 mt-3">
                      <textarea
                        class="main-textarea"
                        id=""
                        rows="5"
                        placeholder=" فضلا ادخل السيرة الذاتية"
                        name="cv"
                        v-model="cv"
                      ></textarea>
                    </div>
                  </div>
                  <div class="cv-main-main2">
                    <h5 class="font-bold mb-2">مستوى مقدم الخدمة :</h5>
                    <div class="main-input-cont mb-4">
                      <Dropdown
                        v-model="selectedExp"
                        :options="exps"
                        optionLabel="name"
                        placeholder="برجاء اختيار مستوى مقدم الخدمة"
                        class="main-select"
                      />
                      <div class="abs-icon-right def-abs">
                        <font-awesome-icon :icon="['far', 'clipboard']" />
                      </div>
                    </div>
                  </div>
                  <div class="flex-group-me mt-3 mb-3">
                    <button
                      type="submit"
                      :disabled="disabledspe"
                      class="main-btn up"
                    >
                      <div v-if="!disabledspe">اضافة</div>
                      <div class="loading" role="status" v-if="disabledspe">
                        جاري الاضافة
                        <div
                          class="spinner-small-white"
                          v-if="disabledspe"
                        ></div>
                      </div>
                    </button>
                  </div>
                </form>
              </keep-alive>
            </div>
          </div>
        </div>

        <!-- works -->
        <div
          class="tab-pane fade"
          id="pills-current"
          role="tabpanel"
          aria-labelledby="pills-current-tab"
        >
          <template v-if="!loading">
            <div v-if="works.length > 0" class="row mb-4">
              <div
                class="col-lg-6 col-md-6 mb-4"
                v-for="(file, i) in works"
                :key="file.id"
              >
                <div class="best-box">
                  <div class="flex-no-align">
                    <template v-if="file.logo.link">
                      <img
                        :src="file.logo.link"
                        class="best-img cv-img-spe"
                        alt="img"
                      />
                    </template>
                    <template v-else>
                      <div class="img-logo-wall">لا توجد صور</div>
                    </template>

                    <div class="left-best">
                      <div class="flex-bet-main mb-5">
                        <div class="right-sm-best">
                          <div class="tlte-text">{{ file.name }}</div>
                        </div>
                        <div class="flex-gap-sm">
                          <router-link
                            :to="{
                              name: 'editnewServices',
                              params: { id: file.id },
                            }"
                            class="edit-work"
                          >
                            <font-awesome-icon
                              :icon="['far', 'pen-to-square']"
                            />
                          </router-link>
                          <div
                            class="remove-work"
                            @click="deleteWork(file.id, i)"
                          >
                            <font-awesome-icon :icon="['fas', 'trash-can']" />
                          </div>
                        </div>
                      </div>
                      <div class="flex-bet-main pt-2">
                        <div class="price-num gray-col">
                          {{ file.category.name }} - {{ file.service.name }}
                        </div>
                        <button
                          type="button"
                          @click="getModalWork(file.id)"
                          data-bs-target="#taskDetailspro"
                          data-bs-toggle="modal"
                          class="link-best-de black-force"
                        >
                          عرض التفاصيل <i class="fa-solid fa-chevron-left"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="nont-found-div">لا يوجد اعمال حتى الان</div>
          </template>
          <template v-else>
            <div class="row">
              <div class="col-lg-6 col-md-6 mb-4">
                <div class="best-box">
                  <div class="flex-no-align">
                    <Skeleton width="10rem" height="7rem"></Skeleton>
                    <div class="left-best">
                      <div class="flex-bet-main mb-5">
                        <div class="right-sm-best">
                          <Skeleton width="8rem" height="2rem"></Skeleton>
                        </div>
                        <div class="flex-gap-sm">
                          <Skeleton
                            shape="circle"
                            size="2rem"
                            class="mr-2"
                          ></Skeleton>
                          <Skeleton
                            shape="circle"
                            size="2rem"
                            class="mr-2"
                          ></Skeleton>
                        </div>
                      </div>
                      <div class="flex-bet-main">
                        <div class="price-num gray-col">
                          <Skeleton width="8rem" height="2rem"></Skeleton>
                        </div>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 mb-4">
                <div class="best-box">
                  <div class="flex-no-align">
                    <Skeleton width="10rem" height="7rem"></Skeleton>
                    <div class="left-best">
                      <div class="flex-bet-main mb-5">
                        <div class="right-sm-best">
                          <Skeleton width="8rem" height="2rem"></Skeleton>
                        </div>
                        <div class="flex-gap-sm">
                          <Skeleton
                            shape="circle"
                            size="2rem"
                            class="mr-2"
                          ></Skeleton>
                          <Skeleton
                            shape="circle"
                            size="2rem"
                            class="mr-2"
                          ></Skeleton>
                        </div>
                      </div>
                      <div class="flex-bet-main">
                        <div class="price-num gray-col">
                          <Skeleton width="8rem" height="2rem"></Skeleton>
                        </div>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <div class="flex-group-me">
            <router-link to="/addnewService" class="main-btn up xl"
              >اضافة عمل جديد</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--task details modal-->
  <div
    class="modal fade"
    id="taskDetailspro"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content" v-if="!loader">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-4 font-bold">تفاصيل العمل</h5>
        <h6 class="font-bold mb-3">{{ title }}</h6>
        <div class="gray-col mb-3">
          {{ subTiltle.name }} - {{ subTiltlecomp.name }}
        </div>
        <div class="task-link gray-col mb-3">
          رابط العمل : <a :href="link" target="_blank">{{ link }}</a>
        </div>
        <div class="flex-bet-task mb-3">
          <div class="name-all-fle">
            <img :src="imgTime" alt="" />
            <div class="name-flex font18">
              <span class="gray-col font-default">مدة العمل : </span>
              {{ time }}
            </div>
          </div>
          <div class="name-all-fle">
            <img :src="priceImg" alt="" />
            <div class="name-flex font18">
              <span class="gray-col font-default">سعر العمل : </span>
              {{ price }} ريال
            </div>
          </div>
        </div>
        <p class="main-p font14 mb-3">
          {{ desc }}
        </p>
        <div class="slider-task-main mb-4 mt-3">
          <div class="img-details">
            <div class="task-comp" v-for="slider in sliders" :key="slider">
              <Image
                class="company-img"
                :src="slider.link"
                preview
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="defrent-loader" v-else>
        <div class="spinner-small-white"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import Skeleton from "primevue/skeleton";
import Image from "primevue/image";
import axios from "axios";
export default {
  data() {
    return {
      selectedSevice: null,
      services: [],
      selectedSubsevice: null,
      Subsevices: [],
      selectedExp: null,
      exps: [],
      bestImg: require("../../assets/imgs/user.jpg"),
      timeImg: require("../../assets/imgs/Group 96504.png"),
      priceImg: require("../../assets/imgs/instead.png"),
      imgTime: require("../../assets/imgs/Group 96504.png"),
      imgPrice: require("../../assets/imgs/instead.png"),
      works: [],
      // modal content
      title: "",
      subTiltle: "",
      subTiltlecomp: "",
      link: "",
      time: "",
      price: "",
      desc: "",
      priceinp: "",
      durationMain: "",
      serArray: [],
      sliders: [],
      loader: false,
      loading: false,
      disabled: false,
      disabledspe: false,
      cv: "",
    };
  },
  components: { Dropdown, Image, Skeleton },
  methods: {
    // start cv code
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
    async getCvs() {
      this.loading = true;
      await axios
        .get("/provider/services", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.serArray = response.data.data;
          console.log(response.data.data);
        });
      this.loading = false;
    },
    async getCvinfo() {
      await axios
        .get("/provider/cv", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.cv = response.data.data.cv
          this.selectedExp = response.data.data.experience
        });
    },
    async addNewService() {
      this.disabled = true;
      const fd = new FormData(this.$refs.newService);
      if (this.selectedSevice) {
        fd.append("category_id", this.selectedSevice.id);
      }
      if (this.selectedSubsevice) {
        fd.append("service_id", this.selectedSubsevice.id);
      }

      await axios
        .post("/provider/services/store", fd, {
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
            this.getCvs();
            this.selectedSubsevice = null;
            this.selectedSevice = null;
            this.priceinp = "";
            this.durationMain = "";
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
    async deleteCv(id, index) {
      const fd = new FormData();
      fd.append("provider_service_id", id);
      await axios
        .post("/provider/services/delete", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.serArray.splice(index, 1);
            this.$toast.add({
              severity: "success",
              detail: `تم حذف الخدمة بنجاح`,
              life: 3000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
    },
    // start works code
    async getWorks() {
      this.loading = true;
      await axios
        .get("/provider/works", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.works = response.data.data;
        });
      this.loading = false;
    },
    async getModalWork(id) {
      this.loader = true;

      await axios
        .get("/provider/works", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].id == id) {
              this.title = response.data.data[i].name;
              this.subTiltle = response.data.data[i].category;
              this.subTiltlecomp = response.data.data[i].service;
              this.link = response.data.data[i].link;
              this.time = response.data.data[i].duration;
              this.price = response.data.data[i].price;
              this.desc = response.data.data[i].description;
              this.sliders = response.data.data[i].attachments;
            }
          }
          this.loader = false;
        });
    },
    async deleteWork(id, index) {
      this.disabled = true;
      const fd = new FormData();
      fd.append("work_id", id);
      await axios
        .post("/provider/works/destroy", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            this.works.splice(index, 1);
            this.$toast.add({
              severity: "success",
              detail: `تم حذف العمل بنجاح`,
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
      // this.getWorks();
    },
    // get exp
    async getExperiences() {
      await axios
        .get("/provider/experiences", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.exps = response.data.data;
        });
    },
    async addCV() {
      this.disabledspe = true;
      const fd = new FormData(this.$refs.experience);
      if (this.selectedExp) {
        fd.append("experience_id", this.selectedExp.id);
      }
      await axios
        .post("/provider/cv/update", fd, {
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
          this.disabledspe = false;
        });
    },
  },
  mounted() {
    this.getWorks();
    this.getServices();
    this.getCvs();
    this.getExperiences();
    this.getCvinfo();
  },
};
</script>

<style></style>

<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        الصفحة الرئيسية - الاعمال والسيرة الذاتية -
        <span class="color-main">تعديل العمل</span>
      </div>
      <div class="row">
        <div class="col-md-9 mb-4">
          <form action="" @submit.prevent="addNewWork" ref="newWork">
            <div class="cv-main-main">
              <div class="flex-bet-b-btm mb-2">
                <h5 class="font-bold">تعديل العمل</h5>
              </div>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">اسم العمل</h6>
                    <input
                      type="text"
                      class="main-input no-right"
                      placeholder="فضلا ادخال اسم العمل"
                      name="name"
                      v-model="name"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4 edit-sele">
                    <h6 class="mb-2 font14">القسم الرئيسي</h6>
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
                  <div class="main-input-cont mb-4 edit-sele">
                    <h6 class="mb-2 font14">القسم الفرعي</h6>
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
                    <h6 class="mb-2 font14">مدة العمل بالايام</h6>
                    <input
                      type="number"
                      class="main-input no-right"
                      placeholder="برجاء ادخال مدة العمل بالايام"
                      name="duration"
                      v-model="duration"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">سعر العمل</h6>
                    <input
                      type="number"
                      class="main-input no-right"
                      placeholder="برجاء سعر العمل"
                      name="price"
                      v-model="price"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">رابط العمل</h6>
                    <input
                      type="text"
                      class="main-input no-right"
                      placeholder="برجاء رابط العمل"
                      name="link"
                      v-model="link"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">عن العمل</h6>
                    <textarea
                      class="main-textarea"
                      id=""
                      rows="5"
                      placeholder=" فضلا ادخل نبذة عن العمل"
                      name="description"
                      v-model="description"
                    ></textarea>
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">ارفاق صور</h6>
                    <input
                      type="file"
                      id="uploadimgreal"
                      hidden
                      multiple
                      accept="image/*"
                      @change="uploadImageReal"
                    />
                    <label for="uploadimgreal" class="upload-imgs-label">
                      <font-awesome-icon
                        class="icon-upload"
                        :icon="['fas', 'cloud-arrow-up']"
                      />
                      <div class="up-text gray-color">ارفاق صور</div>
                    </label>
                    <div class="upload-area-img mt-2">
                      <div class="upload-area-flex">
                        <div
                          v-for="(showImg, i) in productImagesShow"
                          :key="showImg"
                          class="relative-parent"
                        >
                          <div
                            class="abs-mark-main"
                            @click="removeImageShow(showImg.name, i)"
                          >
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                          </div>
                          <img class="preview" :src="showImg.link" />
                        </div>
                      </div>
                      <div
                        class="relative-parent"
                        v-for="(image, key) in productImagesReal"
                        :key="image.name"
                      >
                        <div
                          class="abs-mark-main"
                          @click="removeImageReal(key)"
                        >
                          <font-awesome-icon :icon="['fas', 'xmark']" />
                        </div>
                        <div>
                          <img class="preview" :class="`imagereal${key}`" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-group-me mt-4 mb-5">
              <button type="submit" class="main-btn up xl" :disabled="disabled">
                <div v-if="!disabled">تعديل العمل</div>
                <div class="loading" role="status" v-if="disabled">
                  جاري التعديل
                  <div class="spinner-small-white" v-if="disabled"></div>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!--success add modal-->
  <div
    class="modal fade"
    id="add-new-work"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn spe-edit-ser-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="successImg2" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5">تم تعديل العمل بنجاح</div>
      </div>
    </div>
  </div>
  <input
    type="text"
    hidden
    data-bs-target="#add-new-work"
    data-bs-toggle="modal"
    class="addWork"
  />
</template>

<script>
import Dropdown from "primevue/dropdown";
import axios from "axios";

export default {
  data() {
    return {
      productImagesReal: [],
      productImagesShow: [],
      selectedSevice: { id: 3, name: "كتب" },
      services: [],
      selectedSubsevice: null,
      Subsevices: [],
      bestImg: require("../../assets/imgs/user.jpg"),
      successImg2: require("../../assets/imgs/succ.png"),
      disabled: false,
      catId: null,
      name: "",
      duration: "",
      price: "",
      link: "",
      description: "",
      servicePlace: "",
      subServicePlace: "",
    };
  },
  components: { Dropdown },
  methods: {
    async showWork() {
      const fd = new FormData();
      fd.append("work_id", this.$route.params.id);

      await axios
        .post("/provider/works/show", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {

          this.name = response.data.data.name;
          this.duration = response.data.data.duration;
          this.link = response.data.data.link;
          this.price = response.data.data.price;
          this.description = response.data.data.description;
          this.productImagesShow = response.data.data.attachments;
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
          this.subServicePlace = "اختر الخدمة الفرعية";
        });
    },
    async removeImageShow(imgName, index) {
      this.productImagesShow.splice(index, 1);
      const fd = new FormData();
      fd.append("work_id", this.$route.params.id);
      fd.append("image", imgName);
      await axios
        .post("/provider/works/images/delete", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            return false
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 3000,
            });
          }
        });
    },

    async addNewWork() {
      this.disabled = true;
      const fd = new FormData(this.$refs.newWork);
      if (this.selectedSevice) {
        fd.append("category_id", this.selectedSevice.id);
      }
      if (this.selectedSubsevice) {
        fd.append("service_id", this.selectedSubsevice.id);
      }

      for (let i = 0; i < this.productImagesReal.length; i++) {
        fd.append(`images[${i}]`, this.productImagesReal[i]);
      }
      fd.append("work_id", this.$route.params.id);

      await axios
        .post("/provider/works/update", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".addWork").click();
            this.$router.push("/worksView");
            setTimeout(function () {
              document.querySelector(".click-after").click();
              document.querySelector(".spe-edit-ser-close").click();
            },1500);
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
    // upload Image
    uploadImageReal(e) {
      let selectedFiles2 = e.target.files;
      for (let i = 0; i < selectedFiles2.length; i++) {
        this.productImagesReal.push(selectedFiles2[i]);
      }
      this.applyImageReal();
    },

    // remove Image
    removeImageReal(index) {
      this.productImagesReal.splice(index, 1);
    },

    // apply Image
    applyImageReal() {
      for (let i = 0; i < this.productImagesReal.length; i++) {
        let reader2 = new FileReader();
        reader2.onload = () => {
          document.querySelector(`.imagereal${i}`).src = reader2.result;
        };
        reader2.readAsDataURL(this.productImagesReal[i]);
      }
    },
  },
  mounted() {
    this.getServices();
    this.showWork();
  },
};
</script>

<style></style>

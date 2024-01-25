<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} - {{ $t("shared.productstext") }} -
        <span class="color-main">{{ $t("shared.addNewPro") }}</span>
      </div>
      <div class="row">
        <div class="col-md-9 mb-4">
          <form action="" @submit.prevent="addnewProduct" ref="newproduct">
            <div class="cv-main-main">
              <div class="flex-bet-b-btm mb-2">
                <h5 class="font-bold"> {{ $t("shared.addNewPro") }} :</h5>
              </div>
              <div class="row mt-4">
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.prodname") }}</h6>
                    <input
                      type="text"
                      class="main-input no-right"
                      :placeholder="$t('shared.prodnameplace')"
                      name="name"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.mainSec") }}</h6>
                    <Dropdown
                      v-model="selectedSevice"
                      :options="services"
                      optionLabel="name"
                      :placeholder="$t('shared.mainsecplace')"
                      class="main-select"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['far', 'clipboard']" />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.featuresall") }}</h6>
                    <MultiSelect
                      v-model="selectedDepart"
                      display="chip"
                      :options="departs"
                      optionLabel="name"
                      :placeholder="$t('shared.featuresallplace')"
                      :maxSelectedLabels="20"
                      class="w-full md:w-20rem"
                    />
                    <div class="abs-icon-right">
                      <font-awesome-icon :icon="['far', 'clipboard']" />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.productPrice") }}</h6>
                    <input
                      type="number"
                      class="main-input no-right"
                      :placeholder="$t('shared.productPriceplace')"
                      name="price"
                    />
                    <div class="abs-icon-left">SR</div>
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.saleperc") }}</h6>
                    <input
                      type="number"
                      class="main-input no-right"
                      :placeholder="$t('shared.salepercplace')"
                      name="discount_percentage"
                    />
                  </div>
                </div>
                <div class="col-md-6 col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.priceafter") }}</h6>
                    <input
                      type="number"
                      class="main-input no-right"
                      :placeholder="$t('shared.priceafterplace')"
                      name="price_after_discount"
                    />
                    <div class="abs-icon-left">SR</div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.endsale") }}</h6>
                    <Calendar
                      v-model="date"
                      
                      :placeholder="$t('shared.endsaleplace')"
                      dateFormat="dd-mm-yy"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.productPhase") }}</h6>
                    <textarea
                      name="description"
                      class="main-textarea"
                      id=""
                      rows="5"              
                      :placeholder="$t('shared.productPhaseplace')"
                    ></textarea>
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.applyphoto") }}</h6>
                    <input
                      type="file"
                      id="uploadimgreal"
                      accept="image/*"
                      hidden
                      multiple
                      @change="uploadImageReal"
                    />
                    <label for="uploadimgreal" class="upload-imgs-label">
                      <font-awesome-icon
                        class="icon-upload"
                        :icon="['fas', 'cloud-arrow-up']"
                      />
                      <div class="up-text gray-color">{{ $t("shared.apply") }}</div>
                    </label>
                    <div class="flex-main-show">
                      <div class="upload-area-img mt-2">
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
                          <!-- {{ image.type }} -->
                          <div v-if="image.type.split('/')[0] == 'image'">
                            <img class="preview" :class="`imagereal${key}`" />
                          </div>
                          <div class="pdf-cont" v-else>
                            <div class="flex-group-me">
                              <img :src="pdfImg" class="sm-pdf" alt="" />
                            </div>
                            <img
                              class="preview"
                              :class="`imagereal${key}`"
                              hidden
                            />
                            <div class="pdf-text">{{ image.name }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="main-input-cont mb-4">
                    <h6 class="mb-2 font14">{{ $t("shared.applydown") }}</h6>
                    <input
                      type="file"
                      id="uploadpdfreal"
                      hidden
                      multiple
                      @change="uploadImageRealDownload($event)"
                    />
                    <label for="uploadpdfreal" class="upload-imgs-label">
                      <font-awesome-icon
                        class="icon-upload"
                        :icon="['fas', 'cloud-arrow-up']"
                      />
                      <div class="up-text gray-color">{{ $t("shared.apply") }}</div>
                    </label>
                    <div class="flex-main-show">
                      <div class="upload-area-img mt-2">
                        <div
                          class="relative-parent"
                          v-for="(image, key) in productImagesRealdown"
                          :key="image.name"
                        >
                          <div
                            class="abs-mark-main"
                            @click="removeImageRealdown(key)"
                          >
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                          </div>
                          <div v-if="image.type.split('/')[0] == 'image'">
                            <img
                              class="preview"
                              :class="`imagerealdown${key}`"
                            />
                          </div>
                          <div class="pdf-cont" v-else>
                            <div class="flex-group-me">
                              <img :src="pdfImg" class="sm-pdf" alt="" />
                            </div>
                            <img
                              class="preview"
                              :class="`imagerealdown${key}`"
                              hidden
                            />
                            <div class="pdf-text">{{ image.name }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-group-me mt-4 mb-5">
              <button type="submit" class="main-btn up xl" :disabled="disabled">
                <div v-if="!disabled">{{ $t("shared.addproduct") }}</div>
                <div class="loading" role="status" v-if="disabled">
                  {{ $t("shared.addingproduct") }}
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
    id="add-new-product"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn speproduct"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="flex-group-me mt-5 mb-4">
          <img :src="successImg2" class="sucess-img-order" alt="" />
        </div>
        <div class="done-text mb-5"> {{ $t("shared.waitadminaccept") }}</div>
      </div>
    </div>
  </div>
  <input
    type="text"
    hidden
    data-bs-target="#add-new-product"
    data-bs-toggle="modal"
    class="addProduct"
  />
</template>

<script>
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";
import axios from "axios";
import Calendar from "primevue/calendar";

export default {
  data() {
    return {
      productImagesReal: [],
      productImagesRealdown: [],
      selectedSevice: null,
      services: [],
      selectedDepart: null,
      departs: [],
      bestImg: require("../../assets/imgs/user.jpg"),
      successImg2: require("../../assets/imgs/succ.png"),
      pdfImg: require("../../assets/imgs/pdf.png"),
      disabled: false,
      date: null,
    };
  },
  components: { Dropdown, MultiSelect, Calendar },
  methods: {

    // api
    async getProducts() {
      await axios.get("user/categories/store").then((response) => {
        this.services = response.data.data;
    
      });
    },
    async getfeatures() {
      await axios.get("/features").then((response) => {
        this.departs = response.data.data;
      
      });
    },

    async addnewProduct() {

      this.disabled = true;
      const fd = new FormData(this.$refs.newproduct);
      if (this.selectedSevice) {
        fd.append("category_id", this.selectedSevice.id);
      }

      if (this.selectedDepart) {
        for (let i = 0; i < this.selectedDepart.length; i++) {
          fd.append(`features[${i}]`, this.selectedDepart[i].id);
        }
      }

      if (this.date) {
        fd.append("discount_expire", this.date.toLocaleString().slice(0, 10));
      }

      for (let i = 0; i < this.productImagesReal.length; i++) {
        fd.append(`preview_files[${i}]`, this.productImagesReal[i]);
      }
      for (let i = 0; i < this.productImagesRealdown.length; i++) {
        fd.append(`download_files[${i}]`, this.productImagesRealdown[i]);
      }

      await axios
        .post("/provider/products/store", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key == "success") {
            document.querySelector(".addProduct").click();
            this.$router.push("/providerProducts");
            setTimeout(function () {
              document.querySelector(".close-model-btn.speproduct").click();
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
    // for abload download
    // upload Image
    uploadImageRealDownload(e) {
      let selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.productImagesRealdown.push(selectedFiles[i]);
      }
      this.applyImageRealdown();
    },

    // remove Image
    removeImageRealdown(index) {
      this.productImagesRealdown.splice(index, 1);
    },

    // apply Image
    applyImageRealdown() {
      for (let i = 0; i < this.productImagesRealdown.length; i++) {
        let reader = new FileReader();
        reader.onload = () => {
          document.querySelector(`.imagerealdown${i}`).src = reader.result;
        };
        reader.readAsDataURL(this.productImagesRealdown[i]);
      }
    },
  },
  mounted() {
    this.getProducts();
    this.getfeatures();
  },
};
</script>

<style></style>

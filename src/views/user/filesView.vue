<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("nav.files") }}</span>
      </div>
      <h5 class="mb-4 font-bold">{{ $t("nav.files") }}</h5>
      <template v-if="!loading">
        <div v-if="files.length > 0" class="row mb-4">
          <div
            class="col-lg-6 col-md-6 mb-4"
            v-for="file in files"
            :key="file.id"
          >
            <div class="best-box">
              <div class="flex-no-align">
                <template v-if="file.preview_files_attachments != null">
                  <img
                    :src="file.preview_files_attachments[0].link"
                    class="best-img"
                    alt="img"
                  />
                </template>
                <template v-else>
                  <div class="img-logo-wall">{{ $t("shared.noImgs") }}</div>
                </template>
                <div class="left-best">
                  <div class="flex-bet-main mb-3">
                    <div class="right-sm-best">
                      <div class="tlte-text">{{ file.name }}</div>
                    </div>
                    <div @click="downloadFiles(file.id)" class="down-file">
                      <font-awesome-icon :icon="['fas', 'download']" />
                    </div>
                  </div>
                  <div class="gray-col mb-5">
                    {{ $t("shared.designer") }} : {{ file.provider.name }}
                  </div>
                  <div class="flex-bet-main">
                    <div class="price-num font19">
                      <span v-if="file.price_after_discount">
                        {{ file.price_after_discount }} ريال
                      </span>
                      <span
                        :class="{ mainsale: file.price_after_discount }"
                        v-if="file.has_discount"
                        class="gray-col left-de"
                        >{{ file.price }} ريال</span
                      >
                    </div>
                    <router-link
                      :to="{
                        name: 'providerProductDetails',
                        params: { id: file.id },
                      }"
                      class="link-best-de"
                      >{{ $t("shared.detailsshow") }}
                      <i class="fa-solid fa-chevron-left"></i
                    ></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="nont-found-div">{{ $t("shared.nofiles") }}</div>
      </template>
      <template v-else>
        <div class="row main-site-loder">
          <div class="col-lg-6 col-md-6 mb-4">
            <div class="loader-card">
              <Skeleton class="no-shrink" size="6.7rem"></Skeleton>
              <div class="left-loader-card w-100">
                <div class="top-flex-loeder mb-3">
                  <Skeleton width="10rem" class="mb-2"></Skeleton>
                  <Skeleton shape="circle" size="2rem"></Skeleton>
                </div>
                <Skeleton width="70%" height="20px"></Skeleton>
                <div class="d-flex justify-content-between mt-3">
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                  <Skeleton width="6rem" height="1rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!--download modal-->
  <div
    class="modal fade"
    id="downloadModal"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <button
          type="button"
          class="close-model-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h5 class="text-center mt-4 mb-4 font-bold">{{ $t("shared.downFiles") }}</h5>
        <div class="filesViewDoenload mb-4" v-if="downloadedFiles.length">
          <div
            class="card-loop-files"
            v-for="download in downloadedFiles"
            :key="download"
          >
            <div class="file-pdf w-100">
              <div
                class="show-if-img mb-3"
                v-if="
                  download.name.includes('jpg') ||
                  download.name.includes('png') ||
                  download.name.includes('webp') ||
                  download.name.includes('jpeg')
                "
              >
                <Image
                  :src="download.link"
                  class="download-img-main-spe"
                  preview
                  alt="Image"
                />
              </div>
              <div class="show-if-file mb-3" v-else>
                <div class="flex-group-me mb-2">
                  <img :src="pdf" class="pdf-img" alt="" />
                </div>
                <div class="file-name-down clamp-me">{{ download.name }}</div>
              </div>
            </div>
            <div class="flex-group-me w-100">
              <a
                :href="download.link"
                download
                class="main-btn up download-btn"
                >{{ $t("shared.downFilesname") }}</a
              >
            </div>
          </div>
        </div>
        <div v-else class="nont-found-div">{{ $t("shared.nofiles") }}</div>

        <div class="flex-group-me mb-4 gap-sm yes-wrap">
          <button class="main-btn up gray-bg" data-bs-dismiss="modal">
            {{ $t("shared.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <input
    type="text"
    hidden
    data-bs-target="#downloadModal"
    class="openDownload"
    data-bs-toggle="modal"
  />
</template>

<script>
import axios from "axios";
import Skeleton from "primevue/skeleton";
import Image from "primevue/image";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/user.jpg"),
      files: [],
      loading: false,
      downloadedFiles: [],
      pdf: require("../../assets/imgs/pdf.png"),
    };
  },
  components: { Skeleton, Image },
  methods: {
    async getFiles() {
      this.loading = true;
      await axios
        .get(`/user/downloads`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.files = response.data.data;
        }).catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },
    async downloadFiles(product_id) {
      const fd = new FormData();
      fd.append("product_id", product_id);
      await axios
        .post(`/user/products/download-files`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          if (response.data.key === "success") {
            if (response.data.data.download_files_attachments) {
              this.downloadedFiles =
                response.data.data.download_files_attachments;
            }
            document.querySelector(".openDownload").click();
            this.$toast.add({
              severity: "success",
              detail: `${response.data.msg}`,
              life: 2000,
            });
          } else {
            this.$toast.add({
              severity: "error",
              detail: `${response.data.msg}`,
              life: 2000,
            });
          }
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getFiles();
  },
};
</script>

<style></style>

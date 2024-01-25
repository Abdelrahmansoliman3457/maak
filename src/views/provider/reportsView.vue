<template>
  <div class="reports-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        الصفحة الرئيسية -
        <span class="color-main">تقارير طلبات التحمبل</span>
      </div>
      <h5 class="mb-4 font-bold">التقارير</h5>
      <template v-if="!loading">
        <div v-if="files.length > 0" class="row mb-4">
          <div
            class="col-lg-6 mb-4"
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
                  <div class="img-logo-wall">لا تتوفر صور</div>
                </template>
                <div class="left-best">
                  <div class="flex-bet-main mb-5">
                    <div class="right-sm-best">
                      <div class="tlte-text">{{ file.name }}</div>
                      <div class="rate-default-sm">
                        <star-rating
                          :show-rating="false"
                          :rtl="true"
                          :rating="file.rate"
                          :star-size="20"
                          :read-only="true"
                          :rounded-corners="true"
                          :increment="0.5"
                          active-color="#ffc107"
                        ></star-rating>
                      </div>
                    </div>
                    <div class="down-file-flex">
                      <font-awesome-icon :icon="['fas', 'download']" />
                      <div class="down-nums">{{ file.download_count }}</div>
                    </div>
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
                      >عرض التفاصيل <i class="fa-solid fa-chevron-left"></i
                    ></router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="nont-found-div">لا يوجد طلبات تحميل حتى الان</div>
      </template>
      <template v-else>
        <div class="row main-site-loder">
          <div class="col-lg-6  mb-4">
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
</template>

<script>
import StarRating from "vue-star-rating";
import axios from "axios";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/wallet.png"),
      files: [],
      loading: false,
    };
  },
  components: { StarRating, Skeleton },
  methods: {
    async getReports() {
      this.loading = true;
      await axios
        .get(`/provider/downloads`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.files = response.data.data;
        });
      this.loading = false;
    },
  },
  mounted() {
    this.getReports();
  },
};
</script>

<style></style>

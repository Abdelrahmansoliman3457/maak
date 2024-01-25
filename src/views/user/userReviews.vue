<template>
  <div class="login-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("footer.reviews") }}</span>
      </div>
      <template v-if="!loading">
        <div class="bg-reviews mb-5" v-if="reviews.length">
          <div class="row">
            <template v-if="endpoint == 'user'">
              <div
                class="col-md-6 col-12 no-pad-m"
                v-for="review in reviews"
                :key="review.id"
              >
                <div class="pad-rev">
                  <div class="card-rev">
                    <div class="noti-sm-box">
                      <div class="flex-sm-gap no-align">
                        <img
                          :src="review.provider.image"
                          class="user-m-img"
                          alt="img"
                        />
                        <div class="info-u-user">
                          <div class="mb-2">{{ review.provider.name }}</div>
                          <div class="rate-default-sm mb-2">
                            <star-rating
                              :show-rating="false"
                              :rtl="true"
                              :rating="review.value"
                              :star-size="20"
                              :read-only="true"
                              :rounded-corners="true"
                              :increment="0.5"
                              active-color="#ffc107"
                            ></star-rating>
                          </div>
                          <p v-if="review.comment != 'undefined'">{{ review.comment }}</p>
                        </div>
                      </div>
                      <div class="time-main gray-col font14">
                        {{ review.created_at }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-if="endpoint == 'provider'">
              
              <div
                class="col-md-6 col-12 no-pad-m"
                v-for="review in reviews"
                :key="review.id"
              >
                <div class="pad-rev">
                  <div class="card-rev">
                    <div class="noti-sm-box">
                      <div class="flex-sm-gap no-align">
                        <img :src="proImg" class="user-m-img" alt="img" />
                        <div class="info-u-user">
                          <div class="mb-2">{{ review.user.name }}</div>
                          <div class="rate-default-sm mb-2">
                            <star-rating
                              :show-rating="false"
                              :rtl="true"
                              :rating="review.value"
                              :star-size="20"
                              :read-only="true"
                              :rounded-corners="true"
                              :increment="0.5"
                              active-color="#ffc107"
                            ></star-rating>
                          </div>
                          <p v-if="review.comment != 'undefined'">{{ review.comment }}</p>
                        </div>
                      </div>
                      <div class="time-main gray-col font14">
                        {{ review.created_at }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-else class="nont-found-div">{{ $t("shared.noRates") }}</div>
      </template>
      <template v-else>
        <div class="bg-reviews">
          <div class="row">
            <div class="col-md-6 col-12 mb-3">
              <div class="noti-sm-box">
                <div class="flex-sm-gap">
                  <Skeleton
                    width="4rem"
                    height="4rem"
                    shape="circle"
                  ></Skeleton>
                  <div>
                    <Skeleton
                      width="4rem"
                      class="mb-1"
                      height="1rem"
                    ></Skeleton>
                    <Skeleton width="5rem" height="1rem"></Skeleton>
                  </div>
                </div>
                <Skeleton width="5rem" height="1rem"></Skeleton>
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
      loginImg: require("../../assets/imgs/6310507 1.png"),
      proImg: require("../../assets/imgs/solia.jpg"),
      reviews: [],
      loading: false,
      endpoint: "",
    };
  },
  components: {
    StarRating,
    Skeleton,
  },
  methods: {
    async getReviews() {
      this.loading = true;
      await axios
        .get(`/${this.endpoint}/my-rates`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.reviews = response.data.data;
        });
      this.loading = false;
    },
  },

  mounted() {
    if (localStorage.getItem("visitor") == "user") {
      this.endpoint = "user";
    } else if (localStorage.getItem("visitor") == "provider") {
      this.endpoint = "provider";
    }
    this.getReviews();
  },
};
</script>

<style></style>

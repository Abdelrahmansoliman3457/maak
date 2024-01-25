<template>
  <div class="noti-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        {{ $t("nav.Home") }} -
        <span class="color-main">{{ $t("footer.noti") }}</span>
      </div>
      <template v-if="user">
        <template v-if="!loading">
          <div class="all-notifications" v-if="notifications.length">
            <div
              v-for="(notification, i) in notifications"
              :key="notification.id"
              class="relative-parent"
            >
              <div
                class="remove-noti red-col"
                @click="removeNotification(notification.id, i)"
              >
                <i class="fa-solid fa-trash-can"></i>
              </div>
              <router-link
                :to="
                  '/userOrderDetails/' + notification.data.request_service_id
                "
                v-if="notification.data.type == 'request_service'"
                class="notification-box mb-4 d-block"
              >
                <div class="flex-sm-gap-noti">
                  <img :src="loginImg" class="img-noti" alt="img" />
                  <p class="gray-col max-90 mb-0">
                    {{ notification.body }}
                  </p>
                </div>
                <div class="flex-end-main gray-col font14">
                  <i class="fa-regular fa-clock"></i>
                  {{ notification.created_at }}
                </div>
              </router-link>
              <router-link
                :to="'/orderSteps/' + notification.data.request_service_id"
                v-else-if="notification.data.type == 'offer_price_added'"
                class="notification-box mb-4 d-block"
              >
                <div class="flex-sm-gap-noti">
                  <img :src="loginImg" class="img-noti" alt="img" />
                  <p class="gray-col max-90 mb-0">
                    {{ notification.body }}
                  </p>
                </div>
                <div class="flex-end-main gray-col font14">
                  <i class="fa-regular fa-clock"></i>
                  {{ notification.created_at }}
                </div>
              </router-link>
              <div
                v-else
                class="notification-box mb-4 d-block"
              >
                <div class="flex-sm-gap-noti">
                  <img :src="loginImg" class="img-noti" alt="img" />
                  <p class="gray-col max-90 mb-0">
                    {{ notification.body }}
                  </p>
                </div>
                <div class="flex-end-main gray-col font14">
                  <i class="fa-regular fa-clock"></i>
                  {{ notification.created_at }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="nont-found-div">{{ $t("shared.noNotis") }}</div>
        </template>
        <div class="main-site-loader" v-else>
          <div class="notification-box mb-4">
            <div class="flex-sm-gap-noti">
              <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
              <div class="align-self-center" style="flex: 1">
                <Skeleton width="90%" class="mb-2"></Skeleton>
                <Skeleton width="75%"></Skeleton>
              </div>
            </div>
            <div class="flex-end-main gray-col font14">
              <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
            <div class="remove-noti red-col">
              <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
          </div>
        </div>
        <div class="paginate-cont mb-4"  v-if="notifications.length">
          <Paginator
            :rows="per_pageuser"
            @page="onPaginateuser"
            :totalRecords="totalRecordsuser"
          ></Paginator>
        </div>
      </template>
      <template v-if="provider">
        <template v-if="!loading">
          <div class="all-notifications" v-if="notificationsProvider.length">
            <div
              v-for="(notification, i) in notificationsProvider"
              :key="notification.id"
              class="relative-parent"
            >
              <div
                class="remove-noti red-col"
                @click="removeNotificationPro(notification.id, i)"
              >
                <i class="fa-solid fa-trash-can"></i>
              </div>
              <router-link
                :to="
                  '/providerOrderDetails/' +
                  notification.data.request_service_id
                "
                v-if="notification.data.type == 'request_service'"
                class="notification-box mb-4 d-block"
              >
                <div class="flex-sm-gap-noti">
                  <img :src="loginImg" class="img-noti" alt="img" />
                  <p class="gray-col max-90 mb-0">
                    {{ notification.body }}
                  </p>
                </div>
                <div class="flex-end-main gray-col font14">
                  <i class="fa-regular fa-clock"></i>
                  {{ notification.created_at }}
                </div>
              </router-link>
              <router-link
                :to="'/orderSteps/' + notification.data.request_service_id"
                v-else-if="notification.data.type == 'offer_price_added'"
                class="notification-box mb-4 d-block"
              >
                {{ notification.data.type }}
                <div class="flex-sm-gap-noti">
                  <img :src="loginImg" class="img-noti" alt="img" />
                  <p class="gray-col max-90 mb-0">
                    {{ notification.body }}
                  </p>
                </div>
                <div class="flex-end-main gray-col font14">
                  <i class="fa-regular fa-clock"></i>
                  {{ notification.created_at }}
                </div>
              </router-link>
              <div
                v-else
                class="notification-box mb-4 d-block"
              >
                {{ notification.type }}
                <div class="flex-sm-gap-noti">
                  <img :src="loginImg" class="img-noti" alt="img" />
                  <p class="gray-col max-90 mb-0">
                    {{ notification.body }}
                  </p>
                </div>
                <div class="flex-end-main gray-col font14">
                  <i class="fa-regular fa-clock"></i>
                  {{ notification.created_at }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="nont-found-div">{{ $t("shared.noNotis") }}</div>
        </template>
        <div class="main-site-loader" v-else>
          <div class="notification-box mb-4">
            <div class="flex-sm-gap-noti">
              <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
              <div class="align-self-center" style="flex: 1">
                <Skeleton width="90%" class="mb-2"></Skeleton>
                <Skeleton width="75%"></Skeleton>
              </div>
            </div>
            <div class="flex-end-main gray-col font14">
              <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
            <div class="remove-noti red-col">
              <Skeleton width="4rem" height="2rem"></Skeleton>
            </div>
          </div>
        </div>
        <div class="paginate-cont mb-4" v-if="notificationsProvider.length">
          <Paginator
            :rows="per_page"
            @page="onPaginate"
            :totalRecords="totalRecords"
          ></Paginator>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Skeleton from "primevue/skeleton";
import Paginator from "primevue/paginator";
import axios from "axios";
export default {
  data() {
    return {
      loginImg: require("../../assets/imgs/Group 101230.png"),
      notifications: [],
      notificationsProvider: [],
      loading: false,
      provider: false,
      user: false,
      currentPage: 1,
      totalRecords: null,
      per_page: null,
      currentPageuser: 1,
      totalRecordsuser: null,
      per_pageuser: null,
    };
  },
  created() {},
  components: { Skeleton, Paginator },
  methods: {
    onPaginateuser(e) {
      this.currentPageuser = e.page + 1;
      this.getNotifications();
    },
    onPaginate(e) {
      this.currentPage = e.page + 1;
      this.getProviderNotifications();
    },

    async getNotifications() {
      this.loading = true;
      await axios
        .get(`/user/notifications?page=${this.currentPageuser}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.notifications = response.data.data.data;
          this.totalRecordsuser = response.data.data.pagination.total_items;
          this.per_pageuser = response.data.data.pagination.per_page;
        }).catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },
    async getProviderNotifications() {
      this.loading = true;
      await axios
        .get(`/provider/notifications?page=${this.currentPage}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.notificationsProvider = response.data.data.data;
          this.totalRecords = response.data.data.pagination.total_items;
          this.per_page = response.data.data.pagination.per_page;
        }).catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },
    async removeNotification(id, index) {
      const fd = new FormData();
      fd.append("notification_id", id);
      await axios
        .post(`/provider/notification/delete`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key === "success") {
            this.notifications.splice(index, 1);
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
        }).catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },
    async removeNotificationPro(id, index) {
      const fd = new FormData();
      fd.append("notification_id", id);
      await axios
        .post(`/provider/notification/delete`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.key === "success") {
            this.notificationsProvider.splice(index, 1);
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
        }).catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },
  },
  mounted() {
    if (localStorage.getItem("visitor") == "user") {
      this.getNotifications();
      this.user = true;
      this.provider = false;
    } else if (localStorage.getItem("visitor") == "provider") {
      this.user = false;
      this.provider = true;
      this.getProviderNotifications();
      
    }
  },
};
</script>

<style></style>

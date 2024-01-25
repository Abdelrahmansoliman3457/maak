<template>
  <div class="files-section">
    <div class="container">
      <div class="top-links mt-4 mb-4 font14">
        الصفحة الرئيسية -
        <span class="color-main">المعاملات المالية</span>
      </div>
      <h5 class="mb-4 font-bold">المعاملات المالية</h5>
      <div class="row mb-5">
        <div class="col-lg-8 mb-4">
          <div class="shadow-table over-table">
            <table class="table text-center" style="width: 100%">
              <thead class="table-head">
                <tr>
                  <th class="font15">رقم الطلب</th>
                  <th class="font15">تاريخ الطلب</th>
                  <th class="font15">عمولة الموقع</th>
                  <th class="font15">القيمة المضافة</th>
                  <th class="font15">سعر العمل</th>
                  <th class="font15">طريقة الدفع</th>
                </tr>
              </thead>
              <template v-if="!loading">
                <tbody data-class-name="table-body" v-if="fainancials.length">
                  <tr v-for="row in fainancials" :key="row.id">
                    <td class="font15 color-main2">{{ row.number }}</td>
                    <td class="font15 gray-col">{{ row.created_at }}</td>

                    <td class="font15">
                      <span class="fontBold gray-col">{{ row.app_rate }}</span>
                    </td>
                    <td class="font15">
                      <span class="fontBold gray-col">{{ row.tax_value }}</span>
                    </td>

                    <td class="font15">
                      <span class="gray-col">{{ row.final_total }} ر.س</span>
                    </td>
                    <td class="font15">
                      <span class="gray-col">{{ row.payment_method }}</span>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr class="nont-found-div">
                    <td colspan="6">لا يوجد طلبات حتى الان</td>
                  </tr>
                </tbody>
              </template>
              <template v-else>
                <tbody>
                  <tr>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                    <td>
                      <Skeleton width="100%" height="2rem"></Skeleton>
                    </td>
                  </tr>
                </tbody>
              </template>
            </table>
          </div>
          <div class="flex-group-me mt-3" v-if="fainancials.length && showSattBtn">
            <button type="button" @click="settlement" class="main-btn up xl">
              طلب تسوية
            </button>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="cv-main-main mb-3 mt-2">
            <div class="flex-bet-b-btm mb-2">
              <div class="cv-type">
                <h5 class="font-bold">القيم الاجمالية:</h5>
              </div>
            </div>
            <div class="flex-bet-cart-m mt-4 mb-3 font14 gray-col">
              <div>اجمالي الطلبات</div>
              <div>{{ total_transactions }} طلب</div>
            </div>
            <div class="flex-bet-cart-m mt-4 mb-3 color-main">
              <div>اجمالي المستحق</div>
              <div>{{ total_due }} ر.س</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Skeleton from "primevue/skeleton";
export default {
  data() {
    return {
      bestImg: require("../../assets/imgs/wallet.png"),
      fainancials: [],
      total_transactions: "",
      total_due: "",
      loading: false,
      showSattBtn: false,
    };
  },
  components: { Skeleton },
  methods: {
    async getFainancial() {
      this.loading = true;
      await axios
        .get(`/provider/financial/transactions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.fainancials = response.data.data.transactions;
          this.total_transactions = response.data.data.total_transactions;
          this.total_due = response.data.data.total_due;
          // console.log(response.data.data);
        });
      this.loading = false;
    },
    // settlement request
    async settlement() {
      const fd = new FormData();
      fd.append("amount", Number(this.total_due));
      await axios
        .post("/provider/request/settlement", fd, {
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
        });
    },
    // settlement key
    async getSettlementKey() {
      await axios.get("/settings").then((response) => {
        // console.log(response.data.data.open_settlement);
        this.showSattBtn = response.data.data.open_settlement
      });
    },
  },
  mounted() {
    this.getFainancial();
    this.getSettlementKey();
  },
};
</script>

<style></style>

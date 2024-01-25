<template>
  <!-- Start advertisements Section -->
  <section class="page_404">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-offset-1 text-center">
            <div class="flex-group-me mb-5">
              <img :src="notFound" class="notfoundimg" alt="" />
            </div>

            <div class="contant_box_404 mb-5">
              <h5 class="h2 mb-4">يبدو أن الصفحة التي تريدها غير موجودة</h5>
            </div>
            <div class="flex-group-me">
              <router-link to="/" class="main-btn up lg"
                >العودة للرئيسية</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End advertisements Section -->
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "notFoundView",
  data() {
    return {
      notFound: require("../../assets/imgs/notFoundImg-removebg-preview.png"),
    };
  },
  methods: {},

  components: {},
});
</script>
<style scoped>
/*======================
      404 page
  =======================*/

.page_404 {
  padding: 40px 0;
  padding-bottom: 80px;
  background: #fff;
  font-family: "myfont", sans-serif !important;
}
</style>

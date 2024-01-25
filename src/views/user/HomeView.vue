<template>
  <homeBigSlider />
  <newOredersProv v-if="provider" />
  <allOrdersProv v-if="provider" />
  <departsView v-if="!provider" />
  <aboutView v-if="!provider" />

  <sellsBestView v-if="!provider" />
  <platformView />
  <companiesView />
</template>

<script>
import homeBigSlider from "../../components/home/homeBigSlider.vue";
import aboutView from "../../components/home/aboutView.vue";
import departsView from "../../components/home/departsView.vue";
import sellsBestView from "@/components/home/sellsBestView.vue";
import platformView from "@/components/home/platformView.vue";
import companiesView from "@/components/home/companiesView.vue";
import newOredersProv from "@/components/home/newOredersProv.vue";
import allOrdersProv from "@/components/home/allOrdersProv.vue";

export default {
  data() {
    return {
      provider: false,
    };
  },

  methods: {
    
  },

  mounted() {
    if (localStorage.getItem("visitor") === "provider") {
      this.provider = true;
    }
  },
  components: {
    homeBigSlider,
    newOredersProv,
    allOrdersProv,
    aboutView,
    departsView,
    sellsBestView,
    platformView,
    companiesView,
  },
};
</script>

<style></style>

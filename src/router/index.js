import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/user/HomeView.vue";
import userLogin from "../views/user/userLogin.vue";
import userRegester from "../views/user/userRegester.vue";
import userConfirm from "../views/user/userConfirm.vue";
import notificationsView from "../views/user/notificationsView.vue";
import providersView from "../views/user/providersView.vue";
import providerProfile from "../views/user/providerProfile.vue";
import orderSteps from "../views/user/orderSteps.vue";
import userProducts from "../views/user/userProducts.vue";
import userOrder from "../views/user/userOrder.vue";
import filesView from "../views/user/filesView.vue";
import walletView from "../views/user/walletView.vue";
import whousView from "../views/user/whousView.vue";
import conditionView from "../views/user/conditionView.vue";
import cartView from "../views/user/cartView.vue";
import favView from "../views/user/favView.vue";
import complainsView from "../views/user/complainsView.vue";
import userReviews from "../views/user/userReviews.vue";
import userProfile from "../views/user/userProfile.vue";
import userOrderDetails from "../views/user/userOrderDetails.vue";
import allchatsView from "../views/user/allchatsView.vue";
import chatView from "../views/user/chatView.vue";
import contactView from "../views/user/contactView.vue";
// provider routes
import providerLogin from "../views/provider/providerLogin.vue";
import providerRegester from "../views/provider/providerRegester.vue";
import providerConfirm from "../views/provider/providerConfirm.vue";
import ForgetView from "../views/provider/ForgetView.vue";
import resetPassword from "../views/provider/resetPassword.vue";
import confirmPass from "../views/provider/confirmPass.vue";
import reportsView from "../views/provider/reportsView.vue";
import providerOrderDetails from "../views/provider/providerOrderDetails.vue";
import providerOrder from "../views/provider/providerOrder.vue";
import worksView from "../views/provider/worksView.vue";
import editService from "../views/provider/editService.vue";
import addnewService from "../views/provider/addnewService.vue";
import editnewServices from "../views/provider/editnewServices.vue";
import providerProducts from "../views/provider/providerProducts.vue";
import providerProductDetails from "../views/provider/providerProductDetails.vue";
import addnewProduct from "../views/provider/addnewProduct.vue";
import fainancialView from "../views/provider/fainancialView.vue";
import providerEditProfile from "../views/provider/providerEditProfile.vue";
import bankView from "../views/provider/bankView.vue";
import editProviderProduct from "../views/provider/editProviderProduct.vue";
import notFoundView from "../views/user/notFoundView.vue";
import i18n from "@/i18n";
const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: { title: "nav.Home" },
  },
  {
    path: "/userLogin",
    name: "userLogin",
    component: userLogin,
  },
  {
    path: "/userRegester",
    name: "userRegester",
    component: userRegester,
  },
  {
    path: "/userConfirm",
    name: "userConfirm",
    component: userConfirm,
  },
  {
    path: "/notificationsView",
    name: "notificationsView",
    component: notificationsView,
    meta: { authIsRequired: true },
  },
  {
    path: "/providersView/:id/:category/:text",
    name: "providersView",
    component: providersView,
  },
  {
    path: "/providerProfile/:id",
    name: "providerProfile",
    component: providerProfile,
  },
  {
    path: "/orderSteps/:id",
    name: "orderSteps",
    component: orderSteps,
    meta: { authIsRequired: true },
  },
  {
    path: "/userProducts/:id",
    name: "userProducts",
    component: userProducts,
  },
  {
    path: "/userOrder",
    name: "userOrder",
    component: userOrder,
    meta: { authIsRequired: true },
  },
  {
    path: "/filesView",
    name: "filesView",
    component: filesView,
    meta: { authIsRequired: true },
  },
  {
    path: "/walletView",
    name: "walletView",
    component: walletView,
    meta: { authIsRequired: true },
  },
  {
    path: "/whousView",
    name: "whousView",
    component: whousView,
    meta: { title: "nav.whous" },
  },
  {
    path: "/conditionView",
    name: "conditionView",
    component: conditionView,
  },
  {
    path: "/cartView",
    name: "cartView",
    component: cartView,
    meta: { authIsRequired: true },
  },
  {
    path: "/favView",
    name: "favView",
    component: favView,
    meta: { authIsRequired: true },
  },
  {
    path: "/complainsView",
    name: "complainsView",
    component: complainsView,
  },
  {
    path: "/userReviews",
    name: "userReviews",
    component: userReviews,
    meta: { authIsRequired: true },
  },
  {
    path: "/userProfile",
    name: "userProfile",
    component: userProfile,
    meta: { authIsRequired: true },
  },
  {
    path: "/userOrderDetails/:id",
    name: "userOrderDetails",
    component: userOrderDetails,
    meta: { authIsRequired: true },
  },
  {
    path: "/allchatsView",
    name: "allchatsView",
    component: allchatsView,
    meta: { authIsRequired: true },
  },
  {
    path: "/chatView/:id",
    name: "chatView",
    component: chatView,
    meta: { authIsRequired: true },
  },

  // provider routes
  {
    path: "/providerLogin",
    name: "providerLogin",
    component: providerLogin,
  },
  {
    path: "/providerRegester",
    name: "providerRegester",
    component: providerRegester,
  },
  {
    path: "/providerConfirm",
    name: "providerConfirm",
    component: providerConfirm,
  },
  {
    path: "/ForgetView",
    name: "ForgetView",
    component: ForgetView,
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: resetPassword,
  },
  {
    path: "/confirmPass",
    name: "confirmPass",
    component: confirmPass,
  },
  {
    path: "/reportsView",
    name: "reportsView",
    component: reportsView,
  },

  {
    path: "/providerOrderDetails/:id",
    name: "providerOrderDetails",
    component: providerOrderDetails,
    meta: { authIsRequired: true },
  },
  {
    path: "/providerOrder",
    name: "providerOrder",
    component: providerOrder,
    meta: { authIsRequired: true },
  },
  {
    path: "/worksView",
    name: "worksView",
    component: worksView,
    meta: { authIsRequired: true },
  },
  {
    path: "/editService/:id",
    name: "editService",
    component: editService,
    meta: { authIsRequired: true },
  },
  {
    path: "/addnewService",
    name: "addnewService",
    component: addnewService,
    meta: { authIsRequired: true },
  },
  {
    path: "/editnewServices/:id",
    name: "editnewServices",
    component: editnewServices,
    meta: { authIsRequired: true },
  },
  {
    path: "/providerProducts",
    name: "providerProducts",
    component: providerProducts,
    meta: { authIsRequired: true },
  },
  {
    path: "/providerProductDetails/:id",
    name: "providerProductDetails",
    component: providerProductDetails,
  },
  {
    path: "/addnewProduct",
    name: "addnewProduct",
    component: addnewProduct,
    meta: { authIsRequired: true },
  },
  {
    path: "/fainancialView",
    name: "fainancialView",
    component: fainancialView,
  },
  {
    path: "/providerEditProfile",
    name: "providerEditProfile",
    component: providerEditProfile,
    meta: { authIsRequired: true },
    
  },
  {
    path: "/bankView",
    name: "bankView",
    component: bankView,
    meta: { authIsRequired: true },
  },
  {
    path: "/editProviderProduct/:id",
    name: "editProviderProduct",
    component: editProviderProduct,
    meta: { authIsRequired: true },
  },
  {
    path: "/contactView",
    name: "contactView",
    component: contactView,
  },
  {
    path: '/:catchAll(.*)*',
    name: "notFoundView",
    component: notFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((auth) => auth.meta.authIsRequired)) {
    if (!localStorage.getItem("token")) {
      next(from);
      document.querySelector(".needLogin").click();
      setTimeout(function () {
        document.querySelector(".close-model-btn").click();
      }, 2000);
    } else {
      next();
    }
  } else {
    next();
  }
});

const defaultTitle = i18n.global.t(`shared.platform`);
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = i18n.global.t(`${to.meta.title}`);
  } else {
    document.title = defaultTitle;
  }
});

export default router;

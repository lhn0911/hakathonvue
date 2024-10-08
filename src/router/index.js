import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import ManagerUser from "../views/ManagerUser.vue";
import ManagerProduct from "../views/ManagerProduct.vue";

const routes = [
  {
    path: "/admin",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/manager-user",
    name: "ManagerUser",
    component: ManagerUser,
  },
  {
    path: "/admin/manager-product",
    name: "ManagerProduct",
    component: ManagerProduct,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

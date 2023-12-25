// Composables
import { createRouter, createWebHistory } from "vue-router";
import { state } from "@/store/user";

const routes = [
  {
    path: "/login",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/teacher",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Teacher",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Teacher.vue"),
      },
    ],
  },
  {
    path: "/student",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Student",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Student.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Admin",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Admin.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from) => {
//   const user = state.user;
//   const isLoginPage = to.name === "Login";

//   if (!user && !isLoginPage) {
//     return {
//       name: "Login",
//     };
//   }

//   console.log({ user });

//   if (user && user.role === "teacher" && to.name === "Teacher") return true;
//   if (user && user.role === "student" && to.name === "Student") return true;
//   if (user && user.role === "admin" && to.name === "Admin") return true;

//   return false;
// });

export default router;

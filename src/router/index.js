import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/Login.vue";
import SignupView from "../views/auth/Signup.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import PlaylistDetail from "../views/playlists/PlaylistDetail.vue";
import UserPlaylist from "../views/playlists/UserPlaylist.vue";
import { projectAuth } from "@/firebase/config";
//auth guard

const requiredAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "LoginView" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: requiredAuth,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "SignupView",
    component: SignupView,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requiredAuth,
  },
  {
    path: "/playlists/:id",
    name: "PlaylistDetail",
    component: PlaylistDetail,
    beforeEnter: requiredAuth,
    props: true,
  },
  {
    path: "/playlists/user",
    name: "UserPlaylist",
    component: UserPlaylist,
    beforeEnter: requiredAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

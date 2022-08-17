<template>
  <div class="navbar">
    <nav>
      <img src="../assets/logo.png" />
      <h1>
        <router-link :to="{ name: 'home' }">Shine Playlist</router-link>
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }"
            >Create Playlist</router-link
          >
          <router-link :to="{ name: 'UserPlaylist' }">My Playlist</router-link>
          <span>Hey there.{{ user.displayName }}</span>
          <button @click.prevent="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'LoginView' }" class="btn"
            >Login</router-link
          >
          <router-link :to="{ name: 'SignupView' }" class="btn"
            >Signup</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
export default {
  name: "NavbarView",
  setup() {
    const { logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();
    const handleClick = async () => {
      await logout();
      console.log("user is logout.");
      router.push({ name: "LoginView" });
    };

    return { handleClick, user };
  },
};
</script>

<style>
nav img {
  max-height: 80px;
  border-radius: 50%;
}
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin: 0 16px;
  font-size: 14px;
  margin-bottom: 10px;
}
span {
  margin-left: 16px;
  padding: 0px 16px;
  font-size: 16px;
  display: inline-block;
  border-left: 1px solid #eee;
}
</style>
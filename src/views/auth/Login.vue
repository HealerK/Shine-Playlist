<template>
  <form @submit.prevent="handleSubmit">
    <h2>Login</h2>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const { login, error, isPending } = useLogin();

    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log("Login is successfully");
        router.push({ name: "UserPlaylist" });
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style>
</style>
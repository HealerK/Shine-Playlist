<template>
  <form @submit.prevent="handleSubmit">
    <h2>Signup</h2>
    <input type="text" placeholder="Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Signup</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";
export default {
  name: "SignupView",
  setup() {
    const { error, signup, isPending } = useSignup();
    const router = useRouter();

    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        console.log("sign up is success.");
        router.push({ name: "UserPlaylist" });
      }
    };

    return { displayName, email, password, error, handleSubmit, isPending };
  },
};
</script>

<style>
</style>
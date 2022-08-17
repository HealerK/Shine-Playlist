<template>
  <NavbarView />
  <div class="content">
    <router-view />
  </div>
</template>

<script>
import NavbarView from "./components/Navbar.vue";

export default {
  components: { NavbarView },
};
</script>

<style>
.content {
  margin: 0px auto  ;
  max-width: 1200px  ;
  padding: 0 20px  ;
}
</style>

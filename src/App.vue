<template>
  <v-app id="app">
    <router-view />
  </v-app>
  <Snackbar />
</template>

<script>
import Snackbar from "@/components/Snackbar";
export default {
  components: {
    Snackbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

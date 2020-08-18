<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container fluid id="app-container">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { AuthActions } from "@/types/auth";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  @Action(AuthActions.SetAxiosHeader) private setAxiosHeader!: Function;
  @Action(AuthActions.VerifyToken) private verifyToken!: Function;

  beforeMount() {
    this.setAxiosHeader();
    this.verifyToken();
  }
}
</script>

<style>
#app {
  font-family: "Prompt", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

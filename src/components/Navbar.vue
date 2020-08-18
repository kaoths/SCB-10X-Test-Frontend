<template>
  <v-app-bar color="primary" dark height="60px" app>
    <v-toolbar-title>PartyHaan</v-toolbar-title>
    <v-btn text class="ml-3" @click="$router.push('/')">Home</v-btn>
    <v-spacer />
    <v-btn v-if="!isLogin" to="/login" outlined>Login / Sign Up</v-btn>
    <v-btn v-if="isLogin" icon to="/profile/me">
      <v-icon large>mdi-account-circle</v-icon>
    </v-btn>
    <v-btn v-if="isLogin" @click="logout" outlined>Log Out</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { AuthActions, AuthGetters } from "@/types/auth";

@Component
export default class Navbar extends Vue {
  @Getter(AuthGetters.IsLogin) private isLogin!: () => boolean;
  @Action(AuthActions.Logout) private logout!: () => void;
}
</script>

<style scoped></style>

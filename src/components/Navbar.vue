<template>
  <v-app-bar color="primary" dark height="60px" app>
    <v-toolbar-title class="clickable" @click="$router.push('/')"
      >SCB-10X-SE-Assignment</v-toolbar-title
    >
    <v-spacer />
    <v-btn v-if="!isLogin" @click="$router.push('/login')" text
      >เข้าสู่ระบบ</v-btn
    >
    <v-menu v-else offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            ข้อมูลส่วนตัว
            <v-icon class="ml-1 black--text">mdi-account-details</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>
            ออกจากระบบ
            <v-icon class="ml-1 black--text">mdi-logout</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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

  private menus = [{ title: "ข้อมูลส่วนตัว" }, { title: "ออกจากระบบ" }];
}
</script>

<style scoped>
.clickable:hover {
  cursor: pointer;
}
</style>

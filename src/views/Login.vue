<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="8">
        <v-form @submit.prevent="submit">
          <v-card-text class="px-6">
            <v-text-field
              v-model="username"
              type="text"
              label="Username"
              prepend-icon="mdi-account"
              required
            />
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              prepend-icon="mdi-lock"
              required
            />
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <v-row justify="center" class="w-100">
              <v-btn color="primary" type="submit" :loading="false">
                Login
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-form>
        <!--            <v-btn color="primary" to="/sign-up" text>Sign up</v-btn>-->
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { AuthActions } from "@/types/auth";
@Component
export default class Login extends Vue {
  @Action(AuthActions.Login) private login!: Function;

  private username = "";
  private password = "";

  submit() {
    this.login({
      username: this.username,
      password: this.password
    });
  }
}
</script>

<style scoped></style>

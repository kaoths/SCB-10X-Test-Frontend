<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h3 class="mb-3">เข้าสู่ระบบ</h3>
      <v-card elevation="8">
        <v-form @submit.prevent="submit">
          <v-card-text class="px-6">
            <v-text-field
              v-model="username"
              type="text"
              label="ชื่อผู้ใช้งาน *"
              prepend-icon="mdi-account"
              required
            />
            <v-text-field
              v-model="password"
              type="password"
              label="รหัสผ่าน *"
              prepend-icon="mdi-lock"
              required
            />
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <v-row justify="center" class="w-100">
              <v-btn
                class="px-2"
                color="primary lighten-1"
                type="submit"
                :disabled="!submitable"
              >
                <v-icon class="mr-1">mdi-login</v-icon>
                เข้าสู่ระบบ
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>

      <v-btn
        class="mt-5 px-2"
        color="success"
        @click="$router.push('/register')"
      >
        <v-icon class="mr-1">mdi-account-plus</v-icon>
        สร้างบัญชีผู้ใช้
      </v-btn>
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

  get submitable() {
    return this.username && this.password;
  }
}
</script>

<style scoped></style>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h3 class="mb-3">สร้างบัญชีผู้ใช้</h3>
      <v-card elevation="8">
        <v-form @submit.prevent="submit">
          <v-card-text class="px-6">
            <v-text-field
              v-model="username"
              type="text"
              label="ชื่อผู้ใช้งาน *"
              prepend-icon="mdi-account"
            />
            <v-text-field
              v-model="email"
              type="text"
              label="อีเมล *"
              prepend-icon="mdi-email"
            />
            <v-text-field
              v-model="password"
              type="password"
              label="รหัสผ่าน *"
              prepend-icon="mdi-lock"
            />
            <v-checkbox v-model="consent" label="ยอมรับเงื่อนไขการใช้งาน" />
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <v-row justify="center" class="w-100">
              <v-btn color="primary" type="submit" :disabled="!submitable">
                สร้างบัญชีผู้ใช้
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import { AuthActions } from "@/types/auth";
@Component
export default class Register extends Vue {
  @Action(AuthActions.Register) private register!: Function;

  private consent = false;
  private email = "";
  private username = "";
  private password = "";

  submit() {
    this.register({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  get submitable() {
    return this.username && this.email && this.password && this.consent;
  }
}
</script>

<style scoped></style>

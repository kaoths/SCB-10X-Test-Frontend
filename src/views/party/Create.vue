<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h3 class="mb-3">สร้างปาร์ตี้</h3>
      <v-card elevation="8">
        <v-form @submit.prevent="submit">
          <v-card-text class="px-6">
            <v-text-field v-model="title" type="text" label="ชื่อปาร์ตี้ *" />
            <v-text-field v-model="total" type="text" label="จำนวน *" />
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <v-row justify="center" class="w-100">
              <v-btn color="success" type="submit" :disabled="!submitable">
                สร้างปาร์ตี้
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
import { PartyActions } from "@/types/party";
@Component
export default class CreateParty extends Vue {
  @Action(PartyActions.CreateParty) private createParty!: Function;

  private title = "";
  private total: number | null = null;

  submit() {
    this.createParty({
      title: this.title,
      total: this.total
    });
  }

  get submitable() {
    return this.title.length > 0 && this.total !== null && this.total > 0;
  }
}
</script>

<style scoped></style>

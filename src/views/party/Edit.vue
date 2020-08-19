<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h3 class="mb-3">แก้ไขปาร์ตี้</h3>
      <v-card elevation="8">
        <v-form @submit.prevent="submit">
          <v-card-text class="px-6">
            <v-text-field
              v-model="title"
              type="text"
              label="ชื่อปาร์ตี้ *"
            />
            <v-text-field
              v-model="total"
              type="text"
              label="จำนวน *"
            />
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <v-row justify="space-around" class="w-100">
              <v-btn color="primary" type="submit" :disabled="!submitable">
                แก้ไข
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-btn class="mt-5" color="error darken-1" type="submit">
        ยกเลิกปาร์ตี้นี้
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { AuthActions } from "@/types/auth";
import { Party, PartyActions } from "@/types/party";
@Component
export default class EditParty extends Vue {
  @State(state => state.party.party) private editParty!: Party;
  @Action(PartyActions.FetchOne) private fetchPartyById!: Function;

  private partyId = this.$route.params.id;
  private title = "";
  private total: number | null = null;

  mounted() {
    this.fetchPartyById(this.partyId);
    this.title = this.editParty.title;
    this.total = this.editParty.total;
  }

  submit() {
    this.createParty(
        {
          title: this.title,
          total: this.total
        }
    )
  }

  get submitable() {
    return this.title.length > 0 && this.total !== null && this.total > 0;
  }
}
</script>

<style scoped></style>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h3 class="mb-3">แก้ไขปาร์ตี้</h3>
      <v-card elevation="8">
        <v-form @submit.prevent="submitEdit">
          <v-card-text class="px-6">
            <v-text-field v-model="title" type="text" label="ชื่อปาร์ตี้ *" />
            <v-text-field v-model="total" type="text" label="จำนวน *" />
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <v-row justify="space-around" class="w-100">
              <v-btn
                color="success lighten-1"
                type="submit"
                :disabled="!submitable"
              >
                <v-icon class="mr-1">mdi-check</v-icon>
                ยืนยันการแก้ไข
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mt-5" color="error darken-1" v-bind="attrs" v-on="on">
            <v-icon class="mr-1">mdi-trash-can-outline</v-icon>
            ยกเลิกปาร์ตี้นี้
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">ยืนยันการยกเลิกปาร์ตี้</v-card-title>
          <v-card-text>การยกเลิกไม่สามารถแก้ไขได้</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary lighten-2" @click="dialog = false"
              >กลับ</v-btn
            >
            <v-btn color="error darken-1" @click="confirmDelete">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { Party, PartyActions } from "@/types/party";
import { default as VueAxios } from "vue";

@Component
export default class EditParty extends Vue {
  @Action(PartyActions.FetchOne) private fetchPartyById!: Function;
  @Action(PartyActions.EditParty) private editParty!: Function;
  @Action(PartyActions.DeleteParty) private deleteParty!: Function;

  private party!: Party;
  private partyId = this.$route.params.id;
  private title = "";
  private total: number | null = null;
  private dialog = false;

  beforeMount() {
    this.initialFetch();
  }

  submitEdit() {
    this.editParty({
      partyId: this.partyId,
      title: this.title,
      total: this.total
    });
  }

  confirmDelete() {
    this.deleteParty(this.partyId);
  }

  get memberCount() {
    return this.party.members.length;
  }

  get submitable() {
    return (
      this.title.length > 0 &&
      this.total !== null &&
      this.total > this.memberCount
    );
  }

  async initialFetch() {
    const response = await VueAxios.axios.get<Party>(`/party/${this.partyId}`);
    this.party = response.data;
    this.title = this.party.title;
    this.total = this.party.total;
  }
}
</script>

<style scoped></style>

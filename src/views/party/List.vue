<template>
  <div>
    <v-row no-gutters class="mt-3" justify="space-between" align="start">
      <v-col cols="6  " md="2">
        <v-select
          dense
          :items="filterOptions"
          v-model="filter"
          label="ตัวกรอง"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="auto">
        <v-btn
          class="px-2"
          color="success"
          @click="$router.push('/party/create')"
        >
          สร้างปาร์ตี้
          <v-icon class="ml-1">mdi-new-box</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="partyList.length === 0">
      <div>- ไม่พบข้อมูล -</div>
    </v-row>
    <v-row v-else>
      <v-col cols="6" md="3" lg="2" v-for="party in partyList" :key="party._id">
        <v-card class="d-flex flex-column justify-space-between" height="100%">
          <div>
            <v-img height="100%" :src="bgImg"></v-img>
          </div>
          <div>
            <v-card-text :style="{ color: 'black' }">
              <div>
                {{ party.title }}
              </div>
            </v-card-text>
          </div>

          <div>
            <v-divider class="mx-4 mt-2"></v-divider>
            <v-row justify="space-around" align="center" no-gutters>
              <div>{{ party.members.length }} / {{ party.total }} คน</div>

              <v-card-actions>
                <v-btn
                  v-if="party.isOwner"
                  if="!party.joined"
                  color="orange lighten-1"
                  class="white--text"
                  @click="$router.push(`/party/${party._id}/edit`)"
                >
                  <v-icon class="mr-1" small>mdi-wrench</v-icon>
                  แก้ไข
                </v-btn>
                <v-btn
                  v-else-if="!party.joined"
                  color="green lighten-2"
                  class="white--text"
                  @click="joinParty(party)"
                  :disabled="party.members.length === party.total"
                >
                  <div v-if="party.members.length === party.total">
                    <v-icon small>mdi-close-circle-outline</v-icon>
                    เต็ม
                  </div>
                  <div v-else>
                    <v-icon small>mdi-plus-circle-outline</v-icon>
                    เข้าร่วม
                  </div>
                </v-btn>
                <v-btn
                  v-else
                  color="red lighten-2"
                  class="white--text"
                  @click="leaveParty(party)"
                >
                  <v-icon class="mr-1" small>mdi-minus-circle-outline</v-icon>
                  ออก
                </v-btn>
              </v-card-actions>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { Party, PartyActions, PartyGetters } from "@/types/party";

@Component
export default class PartyList extends Vue {
  @Getter(PartyGetters.GetAllParties) private allParties!: Party[];
  @Getter(PartyGetters.GetJoinedParties) private joinedParties!: Party[];
  @Getter(PartyGetters.GetNotJoinedParties) private notJoinedParties!: Party[];
  @Getter(PartyGetters.GetOwnedParties) private ownedParties!: Party[];
  @Action(PartyActions.FetchAll) private fetchAllParties!: Function;
  @Action(PartyActions.DeleteParty) private deleteParty!: Function;
  @Action(PartyActions.JoinParty) private joinParty!: Function;
  @Action(PartyActions.LeaveParty) private leaveParty!: Function;

  private bgImg = require("../../assets/image.png");
  private filter = "all";
  private filterOptions = [
    { text: "ทั้งหมด", value: "all" },
    { text: "ที่เข้าร่วม", value: "joined" },
    { text: "ที่ยังไม่เข้าร่วม", value: "notJoined" },
    { text: "ที่เป็นเจ้าของ", value: "owned" }
  ];

  mounted() {
    this.fetchAllParties();
  }

  get partyList() {
    switch (this.filter) {
      case "all":
        return this.allParties;
      case "joined":
        return this.joinedParties;
      case "notJoined":
        return this.notJoinedParties;
      case "owned":
        return this.ownedParties;
      default:
        return [];
    }
  }
}
</script>

<style scoped>
v-btn {
  color: white;
}
</style>

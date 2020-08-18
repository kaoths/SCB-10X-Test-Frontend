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
        <v-btn color="green lighten-1">สร้างปาร์ตี้</v-btn>
      </v-col>
    </v-row>
    <v-row>
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
                <v-btn v-if="!party.joined" color="green lighten-2" @click="joinParty(party)">
                  เข้าร่วม
                </v-btn>
                <v-btn v-else color="red lighten-2" @click="leaveParty(party)">
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
  @Action(PartyActions.FetchAll) private fetchAllParties!: Function;
  @Action(PartyActions.JoinParty) private joinParty!: Function;
  @Action(PartyActions.LeaveParty) private leaveParty!: Function;

  private bgImg = require("../../assets/image.png");
  private filter = "all";
  private filterOptions = [
    { text: "ทั้งหมด", value: "all" },
    { text: "ที่เข้าร่วม", value: "joined" },
    { text: "ที่ยังไม่เข้าร่วม", value: "notJoined" }
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
      default:
        return [];
    }
  }
}
</script>

<style scoped></style>

<template>
  <div>
    <v-row>
      <v-col
        cols="6"
        md="3"
        lg="2"
        v-for="party in parties"
        :key="party._id"
      >
        <v-card class="d-flex flex-column justify-space-between" height="100%">
          <v-img max-height="200" :src="bgImg"></v-img>
          <div>
            <div>
              <v-card-text :style="{ color: 'black'}">
                <div>
                  {{party.title}}
                </div>
              </v-card-text>
            </div>

            <div class="">
              <v-divider class="mx-4 mt-2"></v-divider>
              <v-row justify="space-around" align="center" no-gutters>
                <div>{{party.members.length}} / {{party.total}} คน</div>

                <v-card-actions>
                  <v-btn color="green lighten-2" @click="joinParty(party)">
                    เข้าร่วม
                  </v-btn>
                </v-card-actions>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { Party, PartyActions } from "@/types/party";

@Component
export default class PartyList extends Vue {
  @State(state => state.party.parties) private parties!: Party[];
  @Action(PartyActions.FetchAll) private fetchAllParties!: Function;
  private bgImg = require("../../assets/image.png");

  mounted() {
    this.fetchAllParties();
  }

  joinParty(party: Party) {
    console.log("Joining", party._id);
  }
}
</script>

<style scoped></style>

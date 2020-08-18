import Vue from "vue";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { Party, PartyActions, PartyMutations, PartyState } from "@/types/party";

const state: PartyState = {
  parties: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: ""
};

const getters: GetterTree<PartyState, PartyState> = {};

const mutations: MutationTree<PartyState> = {
  [PartyMutations.Loading]: state => {
    state.isLoading = true;
    state.isSuccess = false;
    state.isError = false;
  },
  [PartyMutations.Success]: state => {
    state.isLoading = false;
    state.isSuccess = true;
    state.isError = false;
  },
  [PartyMutations.Error]: (state, errorMessage) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.errorMessage = errorMessage;
  },
  [PartyMutations.SetParties]: (state, payload: Party[]) => {
    state.parties = payload;
  }
};

const actions: ActionTree<PartyState, PartyState> = {
  [PartyActions.FetchAll]: async ({ commit }) => {
    commit(PartyMutations.Loading);
    try {
      const response = await Vue.axios.get<Party[]>("/party");
      commit(PartyMutations.SetParties, response.data);
      commit(PartyMutations.Success);
    } catch (e) {
      commit(PartyMutations.Error, e.response.data.message);
      console.error(e);
    }
  }
};

const party: Module<PartyState, PartyState> = {
  state,
  getters,
  mutations,
  actions
};

export default party;

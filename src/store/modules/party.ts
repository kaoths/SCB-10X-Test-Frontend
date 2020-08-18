import Vue from "vue";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import {
  Party,
  PartyActions, PartyGetters,
  PartyMutations,
  PartyState,
} from "@/types/party";
import user from "@/store/modules/user";

const state: PartyState = {
  parties: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: ""
};

const getters: GetterTree<PartyState, any> = {
  [PartyGetters.GetAllParties]: state => state.parties,
  [PartyGetters.GetJoinedParties]: state => state.parties.filter(party => party.joined),
  [PartyGetters.GetNotJoinedParties]: state => state.parties.filter(party => !party.joined)
};

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
  [PartyMutations.SetAllParties]: (state, payload: Party[]) => {
    state.parties = payload;
  },
};

const actions: ActionTree<PartyState, any> = {
  [PartyActions.FetchAll]: async ({ commit , rootState }) => {
    commit(PartyMutations.Loading);
    try {
      const response = await Vue.axios.get<Party[]>("/party");
      const userId = rootState.auth.user._id;
      const payload = response.data.map(party => {
        return {
          ...party,
          joined: party.members.includes(userId)
        }
      });
      commit(PartyMutations.SetAllParties, payload);
      commit(PartyMutations.Success);
    } catch (e) {
      commit(PartyMutations.Error, e.response.data.message);
      console.error(e);
    }
  },
  [PartyActions.JoinParty]: async ({ commit, dispatch }, party: Party) => {
    try {
      const response = await Vue.axios.post<Party>(`/party/${party._id}/join`)
      dispatch(PartyActions.FetchAll);
    } catch (e) {
      commit(PartyMutations.Error, e.response.data.message);
      console.error(e);
    }
  },
  [PartyActions.LeaveParty]: async ({ commit, dispatch }, party: Party) => {
    try {
      const response = await Vue.axios.post<Party>(`/party/${party._id}/leave`)
      dispatch(PartyActions.FetchAll);
    } catch (e) {
      commit(PartyMutations.Error, e.response.data.message);
      console.error(e);
    }
  },
};

const party: Module<PartyState, any> = {
  state,
  getters,
  mutations,
  actions
};

export default party;

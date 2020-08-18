import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { UserActions, UserState } from "@/types/user";

const state: UserState = {
  username: ""
};

const getters: GetterTree<UserState, UserState> = {};

const mutations: MutationTree<UserState> = {};

const actions: ActionTree<UserState, UserState> = {};

const user: Module<UserState, UserState> = {
  state,
  getters,
  mutations,
  actions
};

export default user;

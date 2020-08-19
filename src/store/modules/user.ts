import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { UserActions, UserState } from "@/types/user";

const state: UserState = {
  username: ""
};

const getters: GetterTree<UserState, any> = {};

const mutations: MutationTree<UserState> = {};

const actions: ActionTree<UserState, any> = {};

const user: Module<UserState, any> = {
  state,
  getters,
  mutations,
  actions
};

export default user;

import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { UserActions, UserState } from "@/types/user";
import { RootState } from "@/types/root";

const state: UserState = {
  username: ""
};

const getters: GetterTree<UserState, RootState> = {};

const mutations: MutationTree<UserState> = {};

const actions: ActionTree<UserState, RootState> = {};

const user: Module<UserState, RootState> = {
  state,
  getters,
  mutations,
  actions
};

export default user;

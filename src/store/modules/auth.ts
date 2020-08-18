import Vue from "vue";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "@/types/root";
import {
  AuthActions,
  AuthGetters,
  AuthMutations,
  AuthState,
  LoginCredentials
} from "@/types/auth";
import { User } from '@/types/user';
import router from '@/router';

const state: AuthState = {
  token: null,
  user: null
};

const getters: GetterTree<AuthState, RootState> = {
  [AuthGetters.IsLogin]: state => !!state.token
};

const mutations: MutationTree<AuthState> = {
  [AuthMutations.SetToken]: (state: AuthState, token: string | null) => {
    state.token = token;
  }
};

const actions: ActionTree<AuthState, RootState> = {
  [AuthActions.Login]: async (
    { commit, dispatch },
    credentials: LoginCredentials
  ) => {
    try {
      const response = await Vue.axios.post<string>("/auth/login", credentials);
      dispatch(AuthActions.SetToken, response.data);
      dispatch(AuthActions.SetAxiosHeader);
      dispatch(AuthActions.Redirect);
    } catch (e) {
      console.error(e);
    }
  },
  [AuthActions.Logout]: async ({ commit, dispatch }) => {
    commit(AuthMutations.SetToken, null);
    commit(AuthMutations.SetUser, null);
    router.push("/login")
  },
  [AuthActions.SetToken]: async ({commit}, token: string | null) => {
    commit(AuthMutations.SetToken, token);
  },
  [AuthActions.SetAxiosHeader]: async ({ state }) => {
    if (state.token) {
      Vue.axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${state.token}`;
    }
  },
  [AuthActions.ClearHeaderToken]: async () => {
    Vue.axios.defaults.headers.common["Authorization"] = null;
  },
  [AuthActions.Redirect]: async ({commit}) => {
    const response = await Vue.axios.get<User>("user/self");
    commit(AuthMutations.SetUser, response.data);
    router.push("/");
  }
};

const auth: Module<AuthState, RootState> = {
  state,
  getters,
  mutations,
  actions
};

export default auth;
